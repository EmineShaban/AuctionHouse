const router = require('express').Router()
const bookingServices = require('../services/bookingServices')
const { isAuth } = require('../middlewares/authMiddleware')
const userService = require('../services/userService')

router.get('/', async (req, res) => {
    const hotelOffer = await bookingServices.getAll().lean()
    hotelOffer.sort((a, b) => b.freeRooms - a.freeRooms)
    res.render('home', { hotelOffer })
})

router.get('/profile', isAuth, async (req, res) => {
    const user = await userService.getOne(req.user?._id).lean()
    const booked = await bookingServices.getAll(user.bookedHotels).lean()
    const publicationTitles = booked.map(x => x.hotel).join(', ')
    console.log(publicationTitles)
    res.render('home/profile', { ...user, publicationTitles })
})

module.exports = router