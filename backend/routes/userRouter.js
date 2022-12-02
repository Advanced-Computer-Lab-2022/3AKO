const express = require('express')

const {
  editPassword,
  editEmail,
  getUser,
} = require("../controllers/userController");



const router = express.Router()

router.patch('/editEmail/:id',editEmail)

router.patch('/editPassword/:id',editPassword)
router.get("/getUser/:id", getUser);





module.exports = router