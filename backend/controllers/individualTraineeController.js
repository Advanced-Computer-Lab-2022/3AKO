
const individualTraineeModel = require('../models/individualTraineeModel')



const addIndividualTrainee = async (req, res) => {
    const {username, password, name, email, gender, country, coursesList} = req.body

    try {
        const individualTrainee = await individualTraineeModel.create({username, password, name, email, gender, country, coursesList}) 
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
const editPassword = async (req, res) => {
    try{
        const id = req.params.id;
        const {oldPassword,newPassword}= req.body
        const passwordObj = await individualTraineeModel.findOne({_id:id},'password -_id').lean()
        const password= JSON.parse(JSON.stringify(passwordObj)).password
        console.log(password===oldPassword);
        if(oldPassword===password){
            const updatedTrainee = await individualTraineeModel.findOneAndUpdate({_id:id},{password:newPassword},{new:true,upsert:true})
            res.status(200).json(updatedTrainee)
        }
        else{
            res.status(400).json({error:"Wrong Password"})
        }
    }
    catch(err){
        res.status(400).json({error:err.message})
    }
}



module.exports = {addIndividualTrainee,editPassword}