const express = require('express')

const {addAdmin} = require('../controllers/adminController')
const {addInstructor} = require('../controllers/instructorController')
const router = express.Router()

router.post('/addAdmin', addAdmin)
router.post('/addInstructor', addInstructor)

module.exports = router