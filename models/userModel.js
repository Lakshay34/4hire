const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
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

    role: {
        type: String,
        enum: ['user','admin'],
        default: 'user',
    },

    rating: {
        type: Number,

    }

})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()

    this.password = await bcrypt.hash(this.password, 12)

    this.passwordConfirm = undefined 
    next()
})

const User = mongoose.model('User', userSchema)
module.exports = User