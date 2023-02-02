const express = require('express')

const { addCourseToTrainee, addLessonRecord, addExerciseRecord, addTraineeInfo, myCourses, getMyInfo, editTraineeInfo, getMyAnswers, addNote, lessonsList, viewInstructor, downloadNotes, downloadCertificate, reviewedCourse, reviewedInstructor } = require('../controllers/traineeController')

const { addComplaint } = require('../controllers/complaintController')

const { loadSubtitle, loadExamAnswers, rateCourse, getSubtitles, getCourseImage } = require('../controllers/courseController')

const { rateInstructor } = require('../controllers/instructorController')

const { temp, editPassword } = require('../controllers/userController')

const { requireTrainee, requireOwnership } = require('../middleware/requireAuth')

const router = express.Router()

//router.use(requireTrainee)

router.patch('/addCourseToTrainee/:id', addCourseToTrainee) //how dose this work with payment ?

router.patch('/addLessonRecord', requireOwnership, addLessonRecord)

router.patch('/addExerciseRecord', requireOwnership, addExerciseRecord)

router.post('/addComplaint', requireTrainee, addComplaint)

router.patch('/addTraineeInfo', requireTrainee, addTraineeInfo)

router.patch('/rateInstructor', requireTrainee, rateInstructor)

router.patch('/rateCourse', requireOwnership, rateCourse)

router.get('/loadSubtitle/:courseId/:subtitleId', requireOwnership, loadSubtitle)

router.post('/loadExamAnswers', loadExamAnswers)

router.get('/myCourses', requireTrainee, myCourses)

router.get("/getSubtitles/:courseId", requireOwnership, getSubtitles)

router.get('/temp', temp)

router.get('/getMyInfo', requireTrainee, getMyInfo)

router.patch('/editMyInfo', requireTrainee, editTraineeInfo)

router.patch('/editPassword', requireTrainee, editPassword)

router.post("/getMyAnswers/", requireTrainee, getMyAnswers)

router.patch('/addNote', requireOwnership, addNote)

router.get('/getLessonsList/:courseId', requireOwnership, lessonsList)

router.post("/viewInstructor/", requireTrainee, viewInstructor)

router.get('/downloadNotes/:courseId', requireOwnership, downloadNotes)

router.get('/downloadCertificate/:courseId', requireOwnership, downloadCertificate)

router.get('/reviewedCourse/:courseId', requireOwnership, reviewedCourse)

router.get('/reviewedInstructor/:instructorId', requireTrainee, reviewedInstructor)

router.post('/getCourseImage/', getCourseImage)

module.exports = router