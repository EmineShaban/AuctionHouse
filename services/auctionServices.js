const Auction = require('../models/Auction')


exports.create = (AuctionData) => Auction.create(AuctionData)
exports.getAll = () => Auction.find()
exports.getOne = (AuctionID) => Auction.findById(AuctionID)
// exports.getOneDetailed = (AuctionID) => Auction.findById(AuctionID)
exports.delete = (AuctionID) => Auction.deleteOne({ _id: AuctionID })
exports.update = (AuctionID, AuctionData) => Auction.updateOne({ _id: AuctionID }, { $set: AuctionData }, { runValidators: true })
// exports.updateOne = (AuctionID, seatsNew) => Auction.updateOne({ _id: AuctionID }, { $set: { "seats" : seatsNew } }, { runValidators: true })
exports.addBidder = (AuctionID, userId) => Auction.updateOne({ _id: AuctionID }, { $set: { "bidder" : userId } }, { runValidators: true })
// // exports.addBuddies = (AuctionID, userId) => Auction.updateOne({_id: AuctionID}, {$push: {Buddies: userId}})

// exports.getAuctionByID = (userId) => Auction.find({AuctionsHistory: userId})
exports.updatePrice = (AuctionID, AuctionData) => Auction.updateOne({ _id: AuctionID }, { $set: AuctionData }, { runValidators: true })
