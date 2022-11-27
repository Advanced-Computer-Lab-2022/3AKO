const express = require('express')

const {addAdmin} = require('../controllers/adminController')
const {addInstructor} = require('../controllers/instructorController')
const {addCorporateTrainee} = require('../controllers/corporateTraineeController')
const { addCourseToTrainee } = require('../controllers/traineeController')
const router = express.Router()

router.post('/addAdmin', addAdmin)
router.post('/addInstructor', addInstructor)
router.post('/addCorporateTrainee', addCorporateTrainee)
router.patch('addCourseToCorporate/:id',addCourseToTrainee)
//router.patch('/editEmail/:id',editEmail)


module.exports = router