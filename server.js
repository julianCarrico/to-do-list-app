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

//Get/Read method
app.get("/", async (req, res) => {
    try {
        TodoTask.find({}, (err, tasks) => {
            res.render("index.ejs", { todoTasks: tasks })
        })
    } catch (err) {
        if (err) return res.status(500).send(err)
    }
})

//Post/Create method
app.post('/', async (req, res) => {
    const todoTask = new TodoTask({
        title: req.body.title,
        content: req.body.content
    })
    try {
        await todoTask.save()
        console.log(todoTask)
        res.redirect('/')
    } catch {
        if (err) return res.status(500).send(err)
        res.redirect('/')
    }
})

//Post/Update method
app
    .route('/edit/:id')
    .get((req, res) => {
        const id = req.params.id
        TodoTask.find({}, (err, tasks) => {
            res.render('edit.ejs', { todoTasks: tasks, idTask: id })
        })
    })
    .post((req, res) => {
        const id = req.params.id
        TodoTask.findByIdAndUpdate(
            id,
            {
                title: req.body.title,
                content: req.body.content
            },
            err => {
                if (err) return res.status(500).send(err)
                res.redirect('/')
            }
        )
    })

//Delete Method
app
    .route('/remove/:id')
    .get((req, res) => {
        const id = req.params.id
        TodoTask.findByIdAndRemove(id, err => {
            if (err) return res.status(500).send(err)
            res.redirect('/')
        })
    })

//Server
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}.`)
})