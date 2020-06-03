const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const {isEmail} = require('validator');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        minlength: 1,
        unique: true,
        trim: true,
        validate: [isEmail, 'Email address is invalid']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, "Password must be at least 6 characters long"],
    },
    fname: {
      type: String,
      required: true,
      minlength: 1
    },
    lname: {
      type: String,
      required: true,
      minlength: 1
    }
});

UserSchema.pre('save', function(next) {
    var user = this;

    if(user.isModified('password')) {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
          user.password = hash;
          next();
        });
      });
    } else {
      next();
    }
  });

var User = mongoose.model('User', UserSchema);
module.exports = {User};
