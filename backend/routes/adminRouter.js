const express = require('express')

const adminModel = require('../models/adminModel')

const router = express.Router()

router.post('/', async (req, res) => {
    const {username, password} = req.body

    try {
        const admin = await adminModel.create({username, password}) 
        res.status(200).json(admin)
    }catch(err){
        res.status(400).json({error : err.message})
    }
    // res.send('admin added')
})

module.exports = router