const mongoose = require('mongoose')

const userModel = require("../models/userModel");
const {traineeModel} = require('../models/traineeModel')
const instructorModel = require("../models/instructorModel");
const adminModel = require('../models/adminModel')

const jwt = require('jsonwebtoken')

const createToken= (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn :'1d'})
}

const types = ['admin','individual trainee', 'corporate trainee','instrcutor']
const editPassword = async (req, res) => {
    try{
        const id = req._id;
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
        const id = req._id;
        const {email}= req.body
        const updatedUser = await userModel.findOneAndUpdate({_id:id},{email},{new:true,upsert:true})
        res.status(200).json(updatedUser)
    }
    catch(err){
        res.status(400).json({error:err.message})
    }
}

const login = async (req, res) => {
    try{
        const {username,password} = req.query
        if(!username || !password){
            res.status(400).json({error:"Must fill username and password"})
        }
        const user = await userModel.findOne({username}).lean()
        if(!user){
            res.status(401).json({error:"wrong username"})
        }
        
        if(user.password === password){
            const token = createToken(user._id)
            if(user.type === 'trainee'){
                res.cookie('jwt', token, { httpOnly: true, maxAge: 86400 * 1000 });
                const trainee = await traineeModel.findOne({_id:user._id}).lean()
                res.status(200).json(trainee)
            }
             else if(user.type === 'instructor'){
                res.cookie('jwt', token, { httpOnly: true, maxAge: 86400 * 1000 });
                const instrucrtor = await instructorModel.findOne({_id:user._id}).lean()
                res.status(200).json(instrucrtor)
            }
            else if(user.type === 'admin'){
                res.cookie('jwt', token, { httpOnly: true, maxAge: 86400 * 1000 });
                const admin = await adminModel.findOne({_id:user._id}).lean()
                res.status(200).json(admin)
            }
            else{
                res.status(401).json({error:"Bad user"})
            }
        }
        else{
            console.log(user)
            console.log(user.password);
            res.status(401).json({error:"wrong password"})
        }

    }
    catch(err){
        //res.status(400).json({error:err.message})
    }
}
const temp = (req, res) => {
    try{
        console.log(req._id);
        res.status(200).json({_id:req._id})
    }
    catch(err){
        res.status(400).json({error:err.message})
    }
}
const logout = (req,res) =>{
    try{
        res.cookie('jwt', '', { httpOnly: true, maxAge: 86400 });

        res.status(200).json({message:"loged out successfully"})
    }
    catch(err){
        res.status(400).json({error:err.message})
    }
}
module.exports = {editPassword,editEmail,login,temp,logout};
