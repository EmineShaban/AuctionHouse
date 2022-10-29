let express = require('express')
let hbs = require('express-handlebars')
const cookieParser = require('cookie-parser')

let { PORT } = require('./config/env')
const routes = require('./routes')
const { dbinit } = require('./config/db')
const { auth } = require('./middlewares/authMiddleware')
const {errorHandler} = require('./middlewares/errorHandlerMiddleware')



const app = express()

app.engine('hbs', hbs.engine({
    extname: 'hbs'
}))

app.set('view engine', 'hbs')
app.use(express.urlencoded({extended : false}))
app.use(express.static('public'))
app.use(cookieParser())
app.use(auth)
app.use(routes)
app.use(errorHandler)



dbinit()
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))