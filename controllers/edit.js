const TodoTask = require('../models/Todotask')

module.exports = {
    getEdit: (req, res) => {
        const id = req.params.id;
        TodoTask.find({ userId: req.user.id }, (err, tasks) => {
            res.render("edit.ejs", { todoTasks: tasks, idTask: id, user: req.user });
        });
    },
    deleteTask: (req, res) => {
        const id = req.params.id;
        TodoTask.findByIdAndRemove(id, err => {
            if (err) return res.send(500, err);
            res.redirect("/todos");
        });
    },
    updateTask: (req, res) => {
        const id = req.params.id;
        TodoTask.findByIdAndUpdate(
            id,
            {
                title: req.body.title,
                content: req.body.content,
                userId: req.user.id
            },
            err => {
                if (err) return res.status(500).send(err);
                res.redirect("/todos");
            });
    }
}