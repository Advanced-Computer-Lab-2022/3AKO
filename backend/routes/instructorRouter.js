const {createCourse} = require("../controllers/courseController")
const {getInstructor} = require("../controllers/instructorController")

const express = require("express")
const router = express.Router()


router.post("/:id/createCourse",createCourse)
router.get("/getInstructor/:id",getInstructor)


module.exports = router