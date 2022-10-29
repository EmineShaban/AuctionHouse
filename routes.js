const router = require('express').Router()

const homeController = require('./controllers/homeController')
const authController = require('./controllers/authController')
const bookingController = require('./controllers/bookingController')


router.use(homeController)
router.use('/auth', authController)
router.use('/booking', bookingController)


module.exports = router