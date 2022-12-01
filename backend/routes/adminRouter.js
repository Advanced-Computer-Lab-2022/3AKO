const express = require('express')

const {addAdmin} = require('../controllers/adminController')
const {addInstructor} = require('../controllers/instructorController')
const {addCorporateTrainee} = require('../controllers/corporateTraineeController')
const { addCourseToTrainee } = require('../controllers/traineeController')
const {requireAdmin} = require('../middleware/requireAuth')

const router = express.Router()
router.use(requireAdmin)
router.post('/addAdmin', addAdmin)
router.post('/addInstructor', addInstructor)
router.post('/addCorporateTrainee', addCorporateTrainee)
router.patch('addCourseToCorporate',addCourseToTrainee)
//router.patch('/editEmail/:id',editEmail)


module.exports = router