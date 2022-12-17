const { getMyInfo, editBiography, editInstructorInfo, setContractState, getContractState } = require("../controllers/instructorController")
const { editPassword, editEmail } = require('../controllers/userController')
const { createCourse, viewMyCourses, filterOnSubject, viewMySubjects, addLesson, addSubVid, addPreviewLink, addExcercise, addQuestion, addPromotion, addSubtitleToCourse, removePromotion } = require("../controllers/courseController")
const { addComplaint } = require('../controllers/complaintController')
const express = require("express")
const { requireInstructor, requireCourseAuthor } = require('../middleware/requireAuth')


const router = express.Router()
//router.use(requireInstructor)

router.post("/createCourse", requireInstructor, createCourse)
router.get("/getInstructor", requireInstructor, getMyInfo)
router.get("/viewMyCourses", requireInstructor, viewMyCourses)
router.get("/viewMySubjects", requireInstructor, viewMySubjects)
router.get("/filterOnSubject", requireInstructor, filterOnSubject)
router.get("/getContractState", requireInstructor, getContractState)

router.patch('/setContractState', requireInstructor, setContractState)
router.patch('/editMyInfo', requireInstructor, editInstructorInfo)
router.patch('/addLesson', requireCourseAuthor, addLesson)
router.patch('/addSubtitleVideoLink', requireCourseAuthor, addSubVid)
router.patch('/addPreviewLink', requireCourseAuthor, addPreviewLink)
router.patch('/addExcercise', requireCourseAuthor, addExcercise)
router.patch('/addQuestion', requireCourseAuthor, addQuestion)
router.patch('/editEmail', requireInstructor, editEmail)
router.patch('/editBiography', requireInstructor, editBiography)
router.patch('/addPromotion', requireCourseAuthor, addPromotion)
router.patch('/removePromotion', requireCourseAuthor, removePromotion)
router.patch('/editPassword', requireInstructor, editPassword)
router.post('/addComplaint', requireInstructor, addComplaint)

router.patch('/addSubtitleToCourse', requireCourseAuthor, addSubtitleToCourse)

module.exports = router