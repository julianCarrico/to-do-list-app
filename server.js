//Declare variables
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const TodoTask = require('./models/todotask')
require('dotenv').config()
const PORT = 8000

//set middleware
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

mongoose.connect(process.env.DB,
    { useNewUrlParser: true },
    () => { console.log('connected to db') })

app.get('/', async (req, res) => {
    try {
        TodoTask.find({}, (err, tasks) => {
            res.render('index.ejs', { todoTask: tasks })
        })
    } catch (err) {
        if (err) return res.status(500).send(err)
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}.`)
})