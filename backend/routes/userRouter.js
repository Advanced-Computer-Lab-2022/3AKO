const express = require('express')

const {editPassword,editEmail} = require('../controllers/userController')

const router = express.Router()

router.patch('/editEmail/:id',editEmail)

router.patch('/editPassword/:id',editPassword)


module.exports = router