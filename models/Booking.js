const mongoose = require('mongoose')
const validator = require('validator')
const URL_PATTERN = /^https?:\/\/.+$/i
const bookingSchema = new mongoose.Schema({
    //     Name - string (required), unique
    // City - string (required),
    // Image Url - string (required),
    // Free Rooms – number (required), must be between 1 and 100,
    // Users Booked a room - a collection of Users
    // Owner – string (required)
    hotel: {
        type: String,
        required: true,
        unique: true,
        minlength: [4, 'Hotel name must be at leats 4 characters long!']
    },
    city: {
        type: String,
        required: true,
        minlength: [3, 'City must be at leats 3 characters long!']

    },
    imgUrl: {
        type: String,
        required: true,
        validate: {

            validator: (value) => URL_PATTERN.test(value),
            message: "Image URL is not valid!"
        }
    },
    freeRooms: {
        type: Number,
        required: true,
        min: 1,
        max: 100,
    },
    userBookedRoom: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        default: []
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        required: true,
    }

})

const Booking = mongoose.model('Booking', bookingSchema)
module.exports = Booking
