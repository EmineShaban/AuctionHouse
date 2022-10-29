const { SECRET } = require('../config/env')
const { COOKIE_SESSION_NAME } = require('../constants')
const jwt = require('jsonwebtoken')

exports.auth =  (req, res, next) => {
    const token = req.cookies[COOKIE_SESSION_NAME]
    if (token) {
        jwt.verify(token, SECRET, ((err, decodedToken) => {
            if (err) {
                
                res.clearCookie(COOKIE_SESSION_NAME)
                // return next(err)
                res.redirect('/login')
            }

            req.user = decodedToken
            res.locals.user = decodedToken
            next()
        }))

    } else {
        next()
    }
}

exports.isAuth = (req, res, next) => {
    if(!req.user) {
        return res.redirect('/auth/login')
    }
next()
}

exports.isGueat = (req, res, next) => {
    if(req.user) {
        return res.redirect('/auth/login')
    }
next()
}