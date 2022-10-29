const mongoose = require('mongoose')
const validator = require('validator')
const URL_PATTERN = /^https?:\/\/.+$/i
const auctionSchema = new mongoose.Schema({
    // Title – string (required)
    // Description – string
    // Category – string (required)
    // Image URL – string
    // Price – number (required)
    // Author –reference to the User model (required)
    // Bidder – reference to the User model
    title: {
        type: String,
        required: true,
        // unique: true,
        // minlength: [4, 'Hotel name must be at leats 4 characters long!']
    },
    description: {
        type: String,
        // required: true,
        // minlength: [3, 'City must be at leats 3 characters long!']

    },
    category: {
        type: String,
        required: true,
        // unique: true,
        // minlength: [4, 'Hotel name must be at leats 4 characters long!']
    },
    imageUrl: {
        type: String,
        // required: true,
        validate: {

            validator: (value) => URL_PATTERN.test(value),
            message: "Image URL is not valid!"
        }
    },
    price: {
        type: Number,
        required: true,
        // min: 1,
        // max: 100,
    },
    bidder: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        default: []
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    }

})

const Auction = mongoose.model('Auction', auctionSchema)
module.exports = Auction
