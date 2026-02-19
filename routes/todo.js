const express = require('express')
const router = express.Router()
const toDosControlller = require('../controllers/todos')
const { ensureAuth } = require('../middleware/auth')


router.get('/', ensureAuth, toDosControlller.getToDo)
router.post('/createTodos', ensureAuth, toDosControlller.createTask)

module.exports = router