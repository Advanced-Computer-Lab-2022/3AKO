
const individualTraineeModel = require('../models/individualTraineeModel')
const userModel = require("../models/userModel");


const addIndividualTrainee = async (req, res) => {
    const {username, password, name, email, gender, country} = req.body

    try {
        const user = await userModel.create({username,password,email,type:'individual trainee',country})
        const individualTrainee = await individualTraineeModel.create({_id:user._id ,name, gender}) 
        res.status(200).json(individualTrainee)
    }catch(err){
        res.status(400).json({error : err.message})
    }
}

const getAll = async (req,res) => {
    try{
       
        const individualTrainees = await individualTraineeModel.find({})
        res.status(200).json(individualTrainees)
    }catch(err){
        res.status(400).json({error : err.message})
    }
}

const getOne = async (req,res) => {
    try{
        const id = req.params.id
        const individualTrainee = await individualTraineeModel.findOne({_id:id})
        res.status(200).json(individualTrainee)
    }catch(err){
        res.status(400).json({error : err.message})
    }
}

module.exports = {addIndividualTrainee}