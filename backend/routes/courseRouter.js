const express = require('express')

const {getAllCourses,searchForCourses} = require('../controllers/courseController')

const router = express.Router()


router.get('/search/:searchKey', searchForCourses)
router.get('/courses', getAllCourses)


module.exports = router