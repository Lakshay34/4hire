const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Enter name'],
    },

    email: {
        type: String,
        required: [true, 'Enter email'],
        unique: true,
        validate: [validator.isEmail, 'Enter valid email'],
    }, 

    password: {
        type: String,
        required: [true, 'Enter a password'],
        minlength: 8,
        select: false,
    },

    skills: {
        type: String,

    },

    rating: {
        type: Number,

    }

})

const User = mongoose.model('User', userSchema)
module.exports = User