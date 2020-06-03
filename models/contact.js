const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    _userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    fname: {
      type: String,
      required: [true, 'Contact name is required'],
      minlength: [1, 'First name cannot be empty'],
      trim: true
    },
    lname: {
      type: String,
      required: false,
      trim: true
    },
    phone_number: {
      type: String,
      required: false,
      minlength: [10, 'Phone number must be at least 10 characters long'],
      trim: true
    },
    email: {
        type: String,
        required: false,
        trim: true,
        minlength: 1
    }
});

var Contact = mongoose.model('Contact', ContactSchema);
module.exports = {Contact};
