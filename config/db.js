const mongoose = require('mongoose')

const { DB_QUERYSTRING } = require('./env')

exports.dbinit = () =>{

    
    mongoose.connection.on('open', () => console.log('Db is connected!'))
    return  mongoose.connect(DB_QUERYSTRING)
}