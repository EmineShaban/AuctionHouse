const Booking = require('../models/Booking')


exports.create = (BookingData) => Booking.create(BookingData)
exports.getAll = () => Booking.find()
exports.getOne = (BookingID) => Booking.findById(BookingID)
// exports.getOneDetailed = (BookingID) => Booking.findById(BookingID)
exports.delete = (BookingID) => Booking.deleteOne({ _id: BookingID })
exports.update = (BookingID, BookingData) => Booking.updateOne({ _id: BookingID }, { $set: BookingData }, { runValidators: true })
// exports.updateOne = (BookingID, seatsNew) => Booking.updateOne({ _id: BookingID }, { $set: { "seats" : seatsNew } }, { runValidators: true })
// exports.addBuddies = (BookingID, userId) => Booking.updateOne({ _id: BookingID }, { $push: { "Buddies" : userId } }, { runValidators: true })
// // exports.addBuddies = (BookingID, userId) => Booking.updateOne({_id: BookingID}, {$push: {Buddies: userId}})

// exports.getBookingByID = (userId) => Booking.find({BookingsHistory: userId})
exports.updateRooms = (BookingID, BookingData) => Booking.updateOne({ _id: BookingID }, { $set: BookingData }, { runValidators: true })
