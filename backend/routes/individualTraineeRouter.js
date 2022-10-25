const express = require('express')

const individualTraineeModel = require('../models/individualTraineeModel')

const router = express.Router()

router.post('/', async (req, res) => {
    const {username, password, firstName, lastName, email, gender, country} = req.body

    try {
        const individualTrainee = await individualTraineeModel.create({username, password, firstName, lastName, email, gender, country}) 
        res.status(200).json(individualTrainee)
    }catch(err){
        res.status(400).json({error : err.message})
    }
    // res.send('admin added')
})

module.exports = router