
const adminModel = require('../models/adminModel')

const addAdmin = async (req, res) => {
    const {username, password} = req.body

    try {
        const admin = await adminModel.create({username, password}) 
        res.status(200).json(admin)
    }catch(err){
        res.status(400).json({error : err.message})
    }
}

const addInstructor = async (req, res) => {
    const {username, password} = req.body

    try {
        const instructor = await adminModel.create({username, password}) 
        res.status(200).json(instructor)
    }catch(err){
        res.status(400).json({error : err.message})
    }
}

module.exports = {
    addAdmin,
    addInstructor
}