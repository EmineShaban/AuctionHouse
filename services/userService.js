const User = require('../models/User')
// const Trip = require('../models/Trip')

exports.getOne = (userId) => User.findById(userId)
// exports.addTrip = (userId, tripID) => User.updateOne({_id: userId}, {$push: {offeredHotels: tripID}})
exports.addHotel = (userId, hotelID) => User.updateOne({_id: userId}, {$push: {bookedHotels: hotelID}})
