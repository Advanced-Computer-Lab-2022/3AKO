const { default: mongoose } = require('mongoose')
const {traineeModel} = require('../models/traineeModel')
const { Error } = require('mongoose');

const {corporateTrainee} = require('../models/corporateTraineeModel')
const userModel = require("../models/userModel");

const addCorporateTrainee = async (req, res) => {
    const {username, password} = req.body
    try {
        const check = await userModel.findOne({username},'_id').lean()
        if(check){ throw new Error('This username already exists')}
        const user = await userModel.create({username,password,type:'trainee'})
        const CorporateTrainee = await traineeModel.create({_id:user._id,type:'corporate trainee'}) 
        const CorporateTraineeInfo = await corporateTrainee.create({_id:user._id})
        res.status(200).json(CorporateTrainee)
    }catch(error){
        res.status(400).json({error : error.message})
    }
}


const getOne = async (req,res) => {
    try{
        const id = req.params.id
        const CorporateTrainee = await traineeModel.findOne({_id:id})
        res.status(200).json(CorporateTrainee)
    }catch(err){
        res.status(400).json({error : err.message})
    }
}

const requestCourse= async(req, res) => {
    try{
        const corporateTraineeId= req._id
        const{courseId} = req.body
        const newCourseList = await corporateTrainee.updateOne({_id:corporateTraineeId},{$addToSet:{courseRequests:{courseId:courseId}}})
        res.status(200).json({courseId})
    }catch(err){
        res.status(400).json({error : err.message})
    }
}


module.exports = {addCorporateTrainee, getOne, requestCourse}