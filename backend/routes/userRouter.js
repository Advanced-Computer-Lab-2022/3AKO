const express = require('express')

const {editPassword,editEmail,login,logout} = require('../controllers/userController')

const {requireUser} = require('../middleware/requireAuth')


const router = express.Router()

router.post('/login',login)

router.patch('/editEmail',requireUser,editEmail)

router.patch('/editPassword',requireUser,editPassword)

router.post('/logout',requireUser,logout)

module.exports = router