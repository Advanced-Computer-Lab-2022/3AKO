const express = require('express')

const {addIndividualTrainee} = require('../controllers/individualTraineeController')

const {editPassword,editEmail} = require('../controllers/userController')

const {addComplaint} = require('../controllers/complaintController')

const {loadSubtitle,loadExamAnswers,rateCourse} = require('../controllers/courseController')

const {rateInstructor} = require('../controllers/instructorController')

const router = express.Router()

router.post('/addIndividualTrainee', addIndividualTrainee)

router.patch('/editPassword/:id',editPassword)

router.post('/addComplaint/:id',addComplaint)

router.patch('/editEmail/:id',editEmail)

router.get('/loadSubtitle/:id',loadSubtitle)

router.get('/loadExamAnswers/:id',loadExamAnswers)

router.patch('/rateCourse/:id',rateCourse)

router.patch('/rateInstructor/:id',rateInstructor)


module.exports = router