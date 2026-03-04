const TodoTask = require('../models/Todotask')

module.exports = {
    getEdit: async (req, res) => {
        try {
            const id = req.params.id;
            // Mongoose 9: await the find call instead of using a callback
            const tasks = await TodoTask.find({ userId: req.user.id });

            res.render("edit.ejs", {
                todoTasks: tasks,
                idTask: id,
                user: req.user
            });
        } catch (err) {
            console.error("Error fetching tasks for edit:", err);
            res.redirect("/todos"); // or your preferred error route
        }
    },
    deleteTask: async (req, res) => {
        try {
            const id = req.params.id;
            // Mongoose 9: findByIdAndRemove is replaced by findByIdAndDelete
            await TodoTask.findByIdAndDelete(id);
            res.redirect("/todos");
        } catch (err) {
            console.error("Delete Error:", err);
            res.status(500).send(err);
        }
    },

    updateTask: async (req, res) => {
        try {
            const id = req.params.id;
            // Mongoose 9: await the update call (no callbacks)
            await TodoTask.findByIdAndUpdate(
                id,
                {
                    title: req.body.title,
                    content: req.body.content,
                    userId: req.user.id
                }
            );
            res.redirect("/todos");
        } catch (err) {
            console.error("Update Error:", err);
            res.status(500).send(err);
        }
    }
}