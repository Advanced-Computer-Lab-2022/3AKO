const express = require('express')

const {getAllCourses,searchForCourses,getCourseInfo,searchByText} = require('../controllers/courseController')

const router = express.Router()


router.get('/search/:searchKey', searchForCourses)
router.get('/courses', getAllCourses)
router.get('/getCourseInfo/:courseId', getCourseInfo)
router.get('/searchByText/:text', searchByText)

module.exports = router