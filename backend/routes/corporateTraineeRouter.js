const express = require('express')

const {getOne, requestCourse, addLessonRecord, addExerciseRecord, addCorporateInfo} = require('../controllers/corporateTraineeController')

const {addComplaint} = require('../controllers/complaintController')

const {editPassword,editEmail} = require('../controllers/userController')

const {loadSubtitle,loadExamAnswers,rateCourse} = require('../controllers/courseController')

const {rateInstructor} = require('../controllers/instructorController')

const router = express.Router()


router.get('/getOne/:id', getOne)

router.patch('/requestCourse/:id',requestCourse )

router.patch('/addLessonRecord/:id', addLessonRecord)

router.patch('/addExerciseRecord/:id',addExerciseRecord)

router.patch('/editPassword/:id',editPassword)

router.post('/addComplaint/:id',addComplaint)

router.patch('/editEmail/:id',editEmail)

router.patch('/addCorporateInfo/:id',addCorporateInfo)

router.patch('/rateInstructor/:id',rateInstructor)

router.patch('/rateCourse/:id',rateCourse)

router.get('/loadSubtitle/:id',loadSubtitle)

router.get('/loadExamAnswers/:id',loadExamAnswers)


module.exports = router