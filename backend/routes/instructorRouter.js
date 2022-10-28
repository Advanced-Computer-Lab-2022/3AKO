const {createCourse} = require("../controllers/courseController")
const {getInstructor,viewMyCourses,filterOnSubject} = require("../controllers/instructorController")

const express = require("express")
const router = express.Router()


router.post("/:id/createCourse",createCourse)
router.get("/getInstructor/:id",getInstructor)
router.get("/viewMyCourses/:id",viewMyCourses)
router.get("/filterOnSubject/:id",filterOnSubject)


module.exports = router