const express = require('express')

const {addIndividualTrainee} = require('../controllers/individualTraineeController')

const {requireIndividualTrainee} = require('../middleware/requireAuth')

const router = express.Router()

//router.use(requireIndividualTrainee)

router.post('/addIndividualTrainee', addIndividualTrainee)

module.exports = router