
const individualTraineeModel = require('../models/individualTraineeModel')



const addIndividualTrainee = async (req, res) => {
    const {username, password, firstName, lastName, email, gender, country, coursesList} = req.body

    try {
        const individualTrainee = await individualTraineeModel.create({username, password, firstName, lastName, email, gender, country, coursesList}) 
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