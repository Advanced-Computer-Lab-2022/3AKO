const express = require('express')

const {addAdmin} = require('../controllers/adminController')
const {addInstructor} = require('../controllers/instructorController')
const {addCoporateTrainee} = require('../controllers/corporateTraineeController')
const router = express.Router()

router.post('/addAdmin', addAdmin)
router.post('/addInstructor', addInstructor)
router.post('/addCorporateTrainee', addCoporateTrainee)

module.exports = router