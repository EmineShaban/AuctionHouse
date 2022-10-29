const bookingServices = require('../services/bookingServices')


exports.preloadTrip = async (req, res, next) => {
    const hotel = await bookingServices.getOne(req.params.hotelID).lean()

    req.hotel = hotel

    next()
}

exports.isTripAuthor = async (req, res, next) => {
    const hotel = await bookingServices.getOne(req.params.hotelID).lean()
    // console.log(req.user._id)
    // console.log(hotel)
    if (hotel?.owner != req.user._id) {
        return next({ message: 'You are not authorized', status: 401 })
    }
    next()
}