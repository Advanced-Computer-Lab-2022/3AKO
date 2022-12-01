const express = require('express')

const { addCourseToTrainee, addLessonRecord, addExerciseRecord, addTraineeInfo, myCourses } = require('../controllers/traineeController')

const { addComplaint } = require('../controllers/complaintController')

const { loadSubtitle, loadExamAnswers, rateCourse, getSubtitles } = require('../controllers/courseController')

const { rateInstructor } = require('../controllers/instructorController')

const {temp} = require('../controllers/userController')

const {requireTrainee,requireOwnership} = require('../middleware/requireAuth')

const router = express.Router()

//router.use(requireTrainee)

router.patch('/addCourseToTrainee', addCourseToTrainee) //how dose this work with payment ?

router.patch('/addLessonRecord',requireOwnership, addLessonRecord)

router.patch('/addExerciseRecord',requireOwnership, addExerciseRecord)

router.post('/addComplaint',requireTrainee, addComplaint)

router.patch('/addTraineeInfo',requireTrainee, addTraineeInfo)

router.patch('/rateInstructor',requireOwnership, rateInstructor)

router.patch('/rateCourse',requireOwnership, rateCourse)

router.get('/loadSubtitle',requireOwnership, loadSubtitle)

router.get('/loadExamAnswers',requireOwnership, loadExamAnswers)

router.get('/myCourses',requireOwnership, myCourses)

router.get("/getSubtitles",requireOwnership, getSubtitles)

router.get('/temp',temp)

module.exports = router