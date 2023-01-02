const { getMyInfo, editBiography, editInstructorInfo, setContractState, getContractState, getProfileInfo, getMyEarnings } = require("../controllers/instructorController")
const { editPassword, editEmail } = require('../controllers/userController')
const { createCourse, viewMyCourses, filterOnSubject, viewMySubjects, addLesson, addSubVid, addPreviewLink, addExercise, addQuestion, addPromotion, addSubtitleToCourse, instructorLoadSubtitle, removePromotion, loadExercise, publishCourse, closeCourse, deleteCourse } = require("../controllers/courseController")
const { addComplaint } = require('../controllers/complaintController')
const express = require("express")
const { requireInstructor, requireCourseAuthor } = require('../middleware/requireAuth')


const router = express.Router()
//router.use(requireInstructor)
router.get('/getProfileInfo/:id', getProfileInfo)
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
router.patch('/addExercise', requireCourseAuthor, addExercise)
router.post('/loadExercise', requireInstructor, loadExercise)
router.patch('/addQuestion', requireCourseAuthor, addQuestion)
router.patch('/editEmail', requireInstructor, editEmail)
router.patch('/editBiography', requireInstructor, editBiography)
router.patch('/addPromotion', requireCourseAuthor, addPromotion)
router.patch('/removePromotion', removePromotion)
router.patch('/editPassword', requireInstructor, editPassword)
router.post('/addComplaint', requireInstructor, addComplaint)

router.patch('/addSubtitleToCourse', requireCourseAuthor, addSubtitleToCourse)
router.post('/loadSubtitle', instructorLoadSubtitle)

router.post('/publishCourse', requireCourseAuthor, publishCourse);
router.post('/closeCourse', requireCourseAuthor, closeCourse);
router.get('/getEarnings', requireInstructor, getMyEarnings);
router.post('/deleteCourse', requireCourseAuthor, deleteCourse);



module.exports = router