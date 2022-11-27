const express = require('express')

const {addIndividualTrainee} = require('../controllers/individualTraineeController')

const router = express.Router()

router.post('/addIndividualTrainee', addIndividualTrainee)

module.exports = router