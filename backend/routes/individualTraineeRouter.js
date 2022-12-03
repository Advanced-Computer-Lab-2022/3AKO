const express = require('express')

const {addIndividualTrainee} = require('../controllers/individualTraineeController')

const {requireIndividualTrainee} = require('../middleware/requireAuth')

const router = express.Router()

//router.use(requireIndividualTrainee)

router.post('/signup', addIndividualTrainee)

module.exports = router