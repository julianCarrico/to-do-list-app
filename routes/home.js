//Handles initial GET request for the homepage 
//Handles POST method request for adding a new task

const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home')
const authContorller = require('../controllers/auth')
const { ensureAuth } = require('../middleware/auth')

//add specific routes for specific tasks
router.get('/', homeController.getIndex)
router.get('/login', authContorller.getLogin)
router.post('/login', authContorller.postLogin)
router.get('/logout', authContorller.logout)
router.get('/signup', authContorller.getSignup)
router.post('/signup', authContorller.postSignup)


module.exports = router