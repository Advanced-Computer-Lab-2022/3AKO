const express = require('express')

const {createCourse,searchForCourses} = require('../controllers/courseController')

const router = express.Router()


router.get('/search', searchForCourses)

module.exports = router