const express = require('express')

const {requestCourse} = require('../controllers/corporateTraineeController')

const {requireCorporateTrainee} = require('../middleware/requireAuth')


const router = express.Router()
router.use(requireCorporateTrainee)
router.patch('/requestCourse',requestCourse )

module.exports = router