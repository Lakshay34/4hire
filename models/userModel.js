const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
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
    passwordConfirm: {
        type: String,
        required: [true, "Please confirm your password"],
        validate: {
          validator: function (el) {
            return el === this.password;
          },
          message: "Password not same",
        },
    },

    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,

    skills: {
        type: Array,
    },

    rating: {
        type: Number,
        minimum: 0,
        maximum: 5,
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
    },

    active: {
        type: Boolean,
        default: true,
        select: false
      },
      role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
      }
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()

    this.password = await bcrypt.hash(this.password, 12)
    this.passwordConfirm = undefined;
    next();
})

userSchema.pre('save', function(next) {
    if (!this.isModified('password') || this.isNew) return next();
  
    this.passwordChangedAt = Date.now() - 1000;
    next();
  });

userSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
  ) {
    return await bcrypt.compare(candidatePassword, userPassword);
  };

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(
        this.passwordChangedAt.getTime() / 1000,
        10
        );

        return JWTTimestamp < changedTimestamp;
    }

    // False means NOT changed
    return false;
};
  
userSchema.methods.createPasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    console.log({ resetToken }, this.passwordResetToken);

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    return resetToken;
};

const User = mongoose.model('User', userSchema)
module.exports = User