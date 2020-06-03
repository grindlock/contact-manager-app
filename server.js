require('./config/config');

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const cors = require('cors');
const validator = require('validator');

const mongoose = require('./db/mongoose');
const {User} = require('./models/user');
const {Contact} = require('./models/contact');

const app = express();
const port = process.env.PORT;

app.set('secure proxy', 1);
app.use(session({
    secret:'secret',
    cookie: {maxAge: 360000, secure: false, httpOnly: false},
    resave: false,
    saveUninitialized: true
}));

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.status(200).send('contact manager app');
});

var isLoggedIn = (req, res, next) => {

    console.log(req.session.user);
    if(req.session.user)
        return next();


    console.log('checking');
    //unauthorized
    res.status(401).send('Please, log in.');
};

app.get('/home', isLoggedIn, (req, res) => {
//	setHeader(res);
    console.log(req.session.user);
    res.status(200).send('Home page for user');
});

app.post('/signup', (req, res) => {

 // setHeader(res);

  if(req.session.user) {
      console.log('redirecting', req.session.user);
      return;
    }

    console.log('signing up');

    //if Mongo database is not started
    if(mongoose.connection.readyState !== 1) {
        res.status(500).send(`We're sorry. We are having trouble connecting. Try again later`);
        return;
    }

    console.log('body', req.body);
    let user = new User({
        email: req.body.email,
        password: req.body.password,
        fname: req.body.fname,
        lname: req.body.lname,
        phone: req.body.phone
    });

    user.save().then((u) => {
        req.session.user = {id:u._id}
                    req.session.save((err) => {
                        if(err) {
                            console.log('error', err);
                        } else {
                            return res.status(200).send(req.session.user);
                        }
                    });
    }).catch((e) => {
        let  error = e.toJSON();

        if(error['code'] === 11000) {
            res.status(400).send('Email already exists');
        } else if(error.errors.hasOwnProperty('email')) {
            let message = error.errors.email['message'];
            res.status(400).send(message);
        } else if(error.errors.hasOwnProperty('password')) {
            let message = error.errors.password['message'];
            res.status(400).send(message);
        } else {
            res.status(400).send(`${user} Error occurred ${e}`);
        }
    });
});

app.post('/login', (req, res) => {
//	setHeader(res);
	
    if(req.session.user) {
        console.log('redirecting', req.session.user);
        return res.status(200).send();
    }

    console.log('body login', req.body);

    if(!req.body.email || !validator.isEmail(req.body.email)) {
        console.log('one');
        res.status(400).send('Email is not valid');
    }

    if(!req.body.password) {
        console.log('two');
        res.status(400).send('Password is required');
    }

    var email = req.body.email;
    var password = req.body.password;

    User.findOne({email}).then((user) => {
        if(!user) {
            console.log('three');
            res.status(401).send(`There is no user associated to this email: ${email}`);
        } else {
            console.log('comparing password');
            bcrypt.compare(password, user.password, (err, result) => {
                if(result) {
                    req.session.user = {id:user._id}
                    req.session.save((err) => {
                        if(err) {
                            console.log('error', err);
                        } else {
                            return res.status(200).send({"id":req.session.user, "fname":user.fname});
                        }
                    });
                    console.log('user logged in', req.session.user);
                    // res.status(200).send(req.session.user);
                } else {
                    console.log('incorrect password');
                    res.status(401).send('Incorrect password');
                }
            });
        }
    });
});

app.get('/logout', (req, res) => {
//	setHeader(res);
	
    if(req.session.user) {
        console.log('logging out');
        req.session.destroy((err) => {
            if(err) {
                console.log('error logging out');
                res.status(400).send();
            } else {
                console.log('logged out good');
                res.status(200).send('logged out good');
            }
        });
    } else {
        console.log('session id', req.session.user);
        res.status(200).send('No user was logged in');
    }
});

app.post('/addContact', isLoggedIn, (req, res) => {
//	setHeader(res);
    console.log('adding....', req.body);

    //if Mongo database is not started
    if(mongoose.connection.readyState !== 1) {
        res.status(500).send(`We're sorry. We are having trouble connecting. Try again later`);
        return;
    }

    var contact = new Contact({
        _userId: req.session.user.id,
        fname: req.body.fname,
        lname: req.body.lname,
        phone_number: req.body.phone_number,
        email: req.body.email
    });

    console.log('adding contact from:', req.session.user);
    console.log('contact: ', contact);

    contact.save().then((c) => {
        let name = contact.fname + ' '+ contact.lname;
        name = name.trim();
        console.log('adding');
        Contact.find({
            _userId: req.session.user.id
        }).then((contacts) => {
            res.status(200).send(contacts);
        });
    }).catch((e) => {
        let  error = e.toJSON();

        console.log(error);
        if(error['code'] === 11000) {
            res.status(400).send('Duplicate email. This contact may be already in your contact list');
        } else if(error.errors.hasOwnProperty('fname')) {
            let message = error.errors.fname['message'];
            res.status(400).send(message);
        } else if(error.errors.hasOwnProperty('phone_number')) {
            let message = error.errors.phone_number['message'];
            res.status(400).send(message);
        } else {
            res.status(400).send(`Unable to save contact`);
        }
    });
});

app.get('/searchContacts', isLoggedIn, (req, res) => {
//	setHeader(res);
    console.log('searching');

    //if Mongo database is not started
    if(mongoose.connection.readyState !== 1) {
        res.status(500).send(`We're sorry. We are having trouble connecting. Try again later`);
        return;
    }

    Contact.find({
        _userId: req.session.user.id
    }).then((contacts) => {
        res.status(200).send(contacts);
    }, (e) => {
        res.status(400).send(e);
    });

});

// app.delete('/delete/:contactid', isLoggedIn, (req, res) => {
//     var contactid = req.params.contactid;

//     // var contactid = req.body;

//     console.log('deleting', contactid);

//     Contact.findOneAndRemove({_id: contactid, _userId: req.session.user.id}).then((contact) => {
//         if (!contact) {
//             return res.status(404).send();
//         }

//         let name = contact.fname + ' ' + contact.lname;
//         console.log(contact);
//         res.send(`${name} was deleted`);
//     }).catch((e) => {
//         res.status(400).send();
//     });
// });

app.post('/delete', isLoggedIn, (req, res) => {
    // var contactid = req.params.contactid;
//	setHeader(res);
    var contactid = req.body;

    console.log('deleting', contactid);

    Contact.findOneAndRemove({_id: contactid, _userId: req.session.user.id}).then((contact) => {
        if (!contact) {
            return res.status(404).send();
        }

        let name = contact.fname + ' ' + contact.lname;
        console.log(contact);
        Contact.find({
            _userId: req.session.user.id
        }).then((contacts) => {
            res.status(200).send(contacts);
        });
    }).catch((e) => {
        res.status(400).send();
    });
});

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});
