const express = require('express')

const { default: mongoose } = require('mongoose')

const {corporateTrainee,course} = require('../models/corporateTraineeModel')

const {addCoporateTrainee, getAll, getOne, addCourse} = require('../controllers/corporateTraineeController')

const router = express.Router()

router.post('/addTrainee', addCoporateTrainee)

router.get('/getAll', getAll)

router.get('/getOne/:id', getOne)

router.patch('/addCourse/:id', addCourse)

module.exports = router