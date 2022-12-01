const mongoose = require('mongoose')

const userModel = require("../models/userModel");

const types = ['admin','individual trainee', 'corporate trainee','instrcutor']
const editPassword = async (req, res) => {
    try{
        const id = req.params.id;
        const {oldPassword,newPassword}= req.body
        const passwordObj = await userModel.findOne({_id:id},'password -_id').lean()
        const password= JSON.parse(JSON.stringify(passwordObj)).password
        console.log(password===oldPassword);
        if(oldPassword===password){
            const updatedTrainee = await userModel.findOneAndUpdate({_id:id},{password:newPassword},{new:true,upsert:true})
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
const editEmail = async (req, res) => {
    try{
        const id = req.params.id;
        const {email}= req.body
        const updatedInstructor = await userModel.findOneAndUpdate({_id:id},{email},{new:true,upsert:true})
        res.status(200).json(updatedInstructor)
    }
    catch(err){
        res.status(400).json({error:err.message})
    }
}
const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userModel.findById(
      { _id: id }
    );
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {editPassword,editEmail,getUser};
