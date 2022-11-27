
const individualTraineeModel = require('../models/individualTraineeModel')
const userModel = require("../models/userModel");
const {trainee} = require('../models/traineeModel')


const addIndividualTrainee = async (req, res) => {
    const {username, password, name, email, gender, country} = req.body

    try {
        const user = await userModel.create({username,password,email,type:'trainee',country})
        const individualTrainee = await trainee.create({_id:user._id ,name, gender,type:'individual trainee'}) 
        const individualTraineeInfo = await individualTraineeModel.create({_id:user._id})
        res.status(200).json(individualTrainee)
    }catch(err){
        res.status(400).json({error : err.message})
    }
}
module.exports = {addIndividualTrainee}