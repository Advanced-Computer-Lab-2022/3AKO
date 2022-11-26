const express = require('express')

const {addAdmin} = require('../controllers/adminController')
const {addInstructor} = require('../controllers/instructorController')
const {addCorporateTrainee,addCourseToCorporate} = require('../controllers/corporateTraineeController')
const {editPassword,editEmail} = require('../controllers/userController')
const router = express.Router()

router.post('/addAdmin', addAdmin)
router.post('/addInstructor', addInstructor)
router.post('/addCorporateTrainee', addCorporateTrainee)
router.patch('/editPassword/:id',editPassword)
router.patch('addCourseToCorporate/:id',addCourseToCorporate)
//router.patch('/editEmail/:id',editEmail)


module.exports = router