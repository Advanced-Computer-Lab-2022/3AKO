const express = require('express')

const {requestCourse} = require('../controllers/corporateTraineeController')

const router = express.Router()

router.patch('/requestCourse/:id',requestCourse )

module.exports = router