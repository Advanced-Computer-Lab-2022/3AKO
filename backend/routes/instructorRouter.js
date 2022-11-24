const {createCourse} = require("../controllers/courseController")
const {getInstructor,viewMyCourses,filterOnSubject,addCourse,viewMySubjects,addLesson,addSubVid,addPreviewLink,addExcercise,addQuestion,editInfo,addPromotion,editPassword} = require("../controllers/instructorController")

const express = require("express")
const router = express.Router()


router.post("/:id/createCourse",createCourse)
router.get("/getInstructor/:id",getInstructor)
router.get("/viewMyCourses/:id",viewMyCourses)
router.get("/viewMySubjects/:id",viewMySubjects)
router.get("/filterOnSubject/:id",filterOnSubject)
router.post('/addCourse/:id', addCourse)

router.patch('/addLesson/:id',addLesson)
router.patch('/addSubtitleVideoLink/:id',addSubVid)
router.patch('/addPreviewLink/:id',addPreviewLink)
router.patch('/addExcercise/:id',addExcercise)
router.patch('/addQuestion/:id',addQuestion)
router.patch('/editInfo/:id',editInfo)
router.patch('/addPromotion/:id',addPromotion)
router.patch('/editPassword/:id',editPassword)
module.exports = router