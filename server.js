//Declare variables
const express = require('express')
const app = express()
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo').default
const flash = require('express-flash')
const logger = require('morgan')
const connectDB = require('./config/database')
const homeRoutes = require('./routes/home')
const editRoutes = require('./routes/edit')
const todoRoutes = require('./routes/todo')

require('dotenv').config({ path: './config/.env' })

//passport config
require('./config/passport')

connectDB()

//set middleware
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(logger('dev'))

//Sessions
app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: process.env.DB }),
    })
)

//Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

//Set Routes
app.use('/', homeRoutes)
app.use('/edit', editRoutes)
app.use('/todos', todoRoutes)

//Server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT}.`)
})