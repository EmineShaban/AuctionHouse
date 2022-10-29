const { getErrorMessage } = require('../utils/errorHelper')


// exports.errorHandler = (err, req, res, next) =>{
// const status = err.status || 404

// res.status(status).render('404', {error: getErrorMessage(err)})



// }

// const getErrorMessage = (err) => {
//     return err.getErrorMessage
// }

exports.errorHandler = (err, req, res, next) => {
    const status = err.status || 404
    res.status(status).render('404', { error: getErrorMessage(err) })

}