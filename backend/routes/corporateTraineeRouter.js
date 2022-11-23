const express = require('express')

const { default: mongoose } = require('mongoose')

const {corporateTrainee,course} = require('../models/corporateTraineeModel')

const {addCoporateTrainee, getAll, getOne, addCourse, requestCourse, addLesson, addExercise,editPassword} = require('../controllers/corporateTraineeController')

const router = express.Router()

router.get('/getAll', getAll)

router.get('/getOne/:id', getOne)

router.patch('/addCourse/:id', addCourse)

router.patch('/requestCourse/:id',requestCourse )

router.patch('/addLesson/:id', addLesson)

router.patch('/addExercise/:id',addExercise)

router.patch('/editPassword/:id',editPassword)

module.exports = router