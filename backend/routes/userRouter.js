const express = require('express')

const {editPassword,editEmail,login} = require('../controllers/userController')

const {requireUser} = require('../middleware/requireAuth')


const router = express.Router()

router.get('/login',login)

router.patch('/editEmail',requireUser,editEmail)

router.patch('/editPassword',requireUser,editPassword)


module.exports = router