const express = require('express')

const { editPassword, editEmail, login, logout, sendEmail, verifyPassword, restoreData, changeCountry } = require('../controllers/userController')
const { getMyComplaints, addFollowUp } = require('../controllers/complaintController')

const { requireUser } = require('../middleware/requireAuth')


const router = express.Router()

router.post('/login', login)

router.patch('/editEmail', requireUser, editEmail)

router.patch('/editPassword', requireUser, editPassword)

router.post('/logout', requireUser, logout)

router.post('/sendEmail', sendEmail)

router.post('/verifyPassword', verifyPassword)

router.get('/restoreData', requireUser, restoreData)

router.patch('/changeCountry', requireUser, changeCountry)

router.get('/getComplaints', requireUser, getMyComplaints)
router.post('/addFollowUp', requireUser, addFollowUp)

module.exports = router