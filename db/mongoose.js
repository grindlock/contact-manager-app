const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/ContactManagerDB")
//do nothing if connection fails. connection.on('error') will print to the console that connection failed
    .catch((e) => {}); 

mongoose.connection.on('connected', () => {
    console.log(`connected to database: ${process.env.MONGODB_URI}`);
});

mongoose.connection.on('error', (err) => {
    console.log('failed to connect', process.env.MONGODB_URI);
});

module.exports = mongoose;