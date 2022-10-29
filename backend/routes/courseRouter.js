const express = require('express')

const {getAllCourses,searchForCourses,getCourseInfo} = require('../controllers/courseController')

const router = express.Router()


router.get('/search', searchForCourses)
router.get('/courses', getAllCourses)
router.get('/getCourseInfo/:courseId', getCourseInfo)

module.exports = router