const router = require('express').Router()
const { isAuth, isGueat } = require('../middlewares/authMiddleware')
const { getErrorMessage } = require('../utils/errorHelper')
const auctionServices = require('../services/auctionServices')
const userService = require('../services/userService')
const { preloadTrip, isTripAuthor } = require('../middlewares/tripMiddleware')

router.get('/browse', async (req, res) => {
    const predmetOffer = await auctionServices.getAll().lean()

    res.render('auction/browse', { predmetOffer })
})
router.get('/create', isAuth, (req, res) => {
    res.render('auction/create')
})


router.post('/create', isAuth, async (req, res) => {
    // console.log(req.body)
    // if(req.body.predmet.length <4 ){
    //     return res.render('auth/register', { error: "predmet name must be at leats 4 characters long!" })
    // }
    // if(req.body.city.length <3 ){
    //     return res.render('auth/register', { error: "predmet name must be at leats 3 characters long!" })
    // }
    try {
        const predmet = await auctionServices.create({ ...req.body, owner: req.user })
        // await userService.addTrip(req.user._id, predmet._id)
        // console.log(req.body)
        res.redirect('/')
    } catch (error) {
        // const predmet = await auctionServices.create({ ...req.body, owner: req.user })
        // let predmetl = req.body
        return res.render('auction/create', { error: getErrorMessage(error), predmet: req.body })
    }
})

router.get(
    '/:predmetID/details',
    async (req, res) => {
        try {
            const predmet = await auctionServices.getOne(req.params.predmetID).lean()
            const author = await userService.getOne(predmet.owner).lean()
            const isAuthor = predmet.owner == req.user?._id
            const isAlreadyJoin = predmet.bidder?.find(element => element == req.user?._id) == req.user?._id
            // let idOfBuyer = predmet.bidder.pop()
            const userBuy = await userService.getOne(predmet.bidder).lean()
            let count = predmet.bidder.length >0
console.log(count)
            res.render('auction/details', { ...predmet, author, isAuthor, isAlreadyJoin, userBuy, count })
        } catch (error) {
            return res.render(`auction/details`, { error: getErrorMessage(error) })
        }
    })


router.get(
    '/:predmetID/delete',
    isAuth,
    // isTripAuthor,
    async (req, res) => {
        await auctionServices.delete(req.params.predmetID)
        res.redirect('/auction/browse')
    })

router.get(
    '/:predmetID/edit',
    isAuth,
    // isTripAuthor,
    async (req, res) => {
        try {
            const predmet = await auctionServices.getOne(req.params.predmetID).lean()
            let count = predmet.bidder.length >0 

            res.render('auction/edit', { ...predmet, count})
        } catch (error) {
            return res.render(`auction/details`, { error: getErrorMessage(error) })
        }
    })


router.post(
    '/:predmetID/edit',
    isAuth,
    // isTripAuthor,
    async (req, res) => {
        try {
            // let count = predmet.bidder.length >0 
            await auctionServices.update(req.params.predmetID, req.body)

            res.redirect(`/auction/${req.params.predmetID}/details`)
        } catch (error) {
            res.render('auction/edit', { ...req.body, error: getErrorMessage(error) })
        }
    })

router.post(
    '/:predmetID/details',
    isAuth,
    preloadTrip,
    async (req, res) => {
        try {
            // await userService.addpredmet(req.user._id, req.predmet._id)
            // req.predmet.freeRooms -= 1
            if (req.predmet.price >= req.body.price) {
                return res.render('home', { error: "the amount is less or equal to the current price" })
            }
            // console.log(req.predmet.price)
            await auctionServices.update(req.params.predmetID, req.body)
            await auctionServices.addBidder(req.params.predmetID, req.user._id)

            // await auctionServices.updatePrice(req.params.predmetID, req.predmet)
            res.redirect(`/auction/${req.params.predmetID}/details`)
            // console.log(req.body.price)
        } catch (error) {
            res.render(`auction/details`, { ...req.body, error: getErrorMessage(error) })
        }
    })


router.get('*', (req, res) => {
    res.render('404')
})

module.exports = router