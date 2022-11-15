
const adminModel = require('../models/adminModel')

const instructorModel = require('../models/instructorModel')

const addAdmin = async (req, res) => {
    const {username, password} = req.body

    try {
        const admin = await adminModel.create({username, password}) 
        res.status(200).json(admin)
    }catch(error){
        res.status(400).json({error : error.message})
    }
}



module.exports = {
    addAdmin
}