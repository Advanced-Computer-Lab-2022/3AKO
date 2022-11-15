const {createCourse} = require("../controllers/courseController")
const {getInstructor,viewMyCourses,filterOnSubject,addCourse,viewMySubjects} = require("../controllers/instructorController")

const express = require("express")
const router = express.Router()


router.post("/:id/createCourse",createCourse)
router.get("/getInstructor/:id",getInstructor)
router.get("/viewMyCourses/:id",viewMyCourses)
router.get("/viewMySubjects/:id",viewMySubjects)
router.get("/filterOnSubject/:id",filterOnSubject)
router.post('/addCourse/:id', addCourse)


module.exports = router