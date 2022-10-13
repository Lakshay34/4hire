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
        type: Array,
    },

    rating: {
        type: Number,
        minimum: 0,
        maximum: 5,
        default: "0"
    },

    description: {
        type: String
    },

    address: {
        type: String
    },

    cv: {
        type: String
    },

    JoinDate: {
        type: String
    },

    report: {
        type: Number,
        minimum: 0,
        maximum: 3,
        default: "0",
    }
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()

    this.password = await bcrypt.hash(this.password, 12)
})

userSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
  ) {
    return await bcrypt.compare(candidatePassword, userPassword);
  };

const User = mongoose.model('User', userSchema)
module.exports = User