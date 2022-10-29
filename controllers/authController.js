const router = require('express').Router()
const { isAuth, isGueat } = require('../middlewares/authMiddleware')
const { getErrorMessage } = require('../utils/errorHelper')
const authServices = require('../services/authServices')
const { COOKIE_SESSION_NAME } = require('../constants')
const validator = require('validator')
router.get('/login', isGueat, (req, res) => {
    res.render('auth/login');
})

router.post('/login', isGueat, async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await authServices.login(username, password)
        const token = await authServices.createToken(user)
        res.cookie(COOKIE_SESSION_NAME, token, { httpOnly: true })
        res.redirect('/')
    } catch (error) {
        return res.render('auth/login', { error: getErrorMessage(error) })
    }
});

router.get('/register', isGueat, (req, res) => {
    res.render('auth/register')
})

router.post('/register', isGueat, async (req, res) => {
    if(validator.isEmail(req.body.email) == false){
        return res.render('auth/register', { error: "Invalid email!" })
    }
    if(req.body.password.length <5 ){
        return res.render('auth/register', { error: "Password must be at leats 5 characters long!" })
    }
    const { password, rePassword, ...userData } = req.body
   

    if (password !== rePassword) {
        return res.render('auth/register', { error: "Password missmatch!" })
    }
    try {
        const createdUser = await authServices.create({ password, ...userData })
        const token = await authServices.createToken(createdUser)
        res.cookie(COOKIE_SESSION_NAME, token, { httpOnly: true })
        res.redirect('/')
    } catch (error) {
        return res.render('auth/register', { error: getErrorMessage(error) })
    }

})
router.get('/logout', isAuth, (req, res) => {
    res.clearCookie(COOKIE_SESSION_NAME)
    res.redirect('/')
})

module.exports = router