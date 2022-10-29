const auctionServices = require('../services/auctionServices')


exports.preloadTrip = async (req, res, next) => {
    const predmet = await auctionServices.getOne(req.params.predmetID).lean()

    req.predmet = predmet

    next()
}

exports.isTripAuthor = async (req, res, next) => {
    const predmet = await auctionServices.getOne(req.params.predmetID).lean()
    // console.log(req.user._id)
    // console.log(predmet)
    if (predmet?.owner != req.user._id) {
        return next({ message: 'You are not authorized', status: 401 })
    }
    next()
}