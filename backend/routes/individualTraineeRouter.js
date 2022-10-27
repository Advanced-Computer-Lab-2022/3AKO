const express = require('express')

const {addIndividualTrainee} = require('../controllers/individualTraineeController')

const router = express.Router()

router.post('/', addIndividualTrainee)

module.exports = router