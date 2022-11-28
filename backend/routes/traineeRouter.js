const express = require('express')

const { addCourseToTrainee, addLessonRecord, addExerciseRecord, addTraineeInfo, myCourses } = require('../controllers/traineeController')

const { addComplaint } = require('../controllers/complaintController')

const { loadSubtitle, loadExamAnswers, rateCourse, getSubtitles } = require('../controllers/courseController')

const { rateInstructor } = require('../controllers/instructorController')

const router = express.Router()

router.patch('/addCourseToTrainee/:id', addCourseToTrainee)

router.patch('/addLessonRecord/:id', addLessonRecord)

router.patch('/addExerciseRecord/:id', addExerciseRecord)

router.post('/addComplaint/:id', addComplaint)

router.patch('/addTraineeInfo/:id', addTraineeInfo)

router.patch('/rateInstructor/:id', rateInstructor)

router.patch('/rateCourse/:id', rateCourse)

router.get('/loadSubtitle/:id', loadSubtitle)

router.get('/loadExamAnswers/:id', loadExamAnswers)

router.get('/myCourses/:id', myCourses)

router.get("/getSubtitles/:courseId", getSubtitles)

module.exports = router