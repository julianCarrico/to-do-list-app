const TodoTask = require('../models/Todotask')

module.exports = {
    getToDo: async (req, res) => {
        try {
            const tasks = await
                TodoTask.find({ userId: req.user.id })
            res.render('todos.ejs', {
                todoTasks: tasks,
                user: req.user
            })
        } catch (err) {
            if (err) return res.status(500).send(err)
        }
    },
    createTask: async (req, res) => {
        const todoTask = new TodoTask({
            title: req.body.title,
            content: req.body.content,
            userId: req.user.id
        })
        try {
            await todoTask.save({ userId: req.user.id })
            console.log(todoTask)
            res.redirect('/todos')
        } catch {
            if (err) return res.status(500).send(err)
            res.redirect('/todos')
        }
    }
}