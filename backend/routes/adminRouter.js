const express = require('express')

const {addAdmin} = require('../controllers/adminController')

const adminModel = require('../models/adminModel')

const router = express.Router()

router.post('/', addAdmin)

module.exports = router