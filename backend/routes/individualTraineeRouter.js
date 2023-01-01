const express = require('express')

const {addIndividualTrainee,checkout,getMyData,createPayment,payWithCard,payWithWallet,checkBeforeProceed,test,requestRefund} = require('../controllers/individualTraineeController')

const {requireIndividualTrainee} = require('../middleware/requireAuth')

const router = express.Router()

router.post('/signup', addIndividualTrainee)

router.use(requireIndividualTrainee)

router.get('/getMyData',getMyData)

router.post('/checkout',checkout)

router.post('/createPayment',createPayment)
router.post('/payWithCard',payWithCard)
router.post('/payWithWallet',payWithWallet)
router.post('/checkBeforeProceed',checkBeforeProceed)

router.post('/test',test)
router.post('/requestRefund',requestRefund)

module.exports = router