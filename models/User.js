const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { SALT_ROUNDS } = require('../config/env')
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        match: [/^[a-zA-Z0-9]+$/i, 'Username may contain only english letter and numbers']
    },
    password: {
        type: String,
        required: true,
    },
    bookedHotels: {
        type: String,
    },
    offeredHotels: {
        type: String,
    }
})

userSchema.pre('save', function (next) {
    bcrypt.hash(this.password, SALT_ROUNDS)
        .then(hashedPassword => {

            this.password = hashedPassword
            next()
        })
})

const User = mongoose.model('User', userSchema)

module.exports = User
