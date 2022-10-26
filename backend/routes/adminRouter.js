const express = require('express')

const {addAdmin, addInstructor} = require('../controllers/adminController')

const router = express.Router()

router.post('/addAdmin', addAdmin)
router.post('/addInstructor', addInstructor)

module.exports = router