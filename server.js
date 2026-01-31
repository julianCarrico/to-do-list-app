//Declare variables
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const connectDB = require('./config/database')
const homeRoutes = require('./routes/home')
const editRoutes = require('./routes/edit')
require('dotenv').config({ path: './config/.env' })

connectDB()

//set middleware
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

//Set Routes
app.use('/', homeRoutes)
app.use('/edit', editRoutes)

//Server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT}.`)
})