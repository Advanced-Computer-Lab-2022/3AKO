const express = require('express')

const {addIndividualTrainee,editPassword} = require('../controllers/individualTraineeController')

const router = express.Router()

router.post('/add', addIndividualTrainee)

router.patch('/editPassword/:id',editPassword)

module.exports = router