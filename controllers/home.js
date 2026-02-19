const TodoTask = require('../models/Todotask')

module.exports = {
    getIndex: (req, res) => {
        res.render('index.ejs')
    }
}