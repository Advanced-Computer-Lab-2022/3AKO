
const adminModel = require('../models/adminModel')
const userModel = require("../models/userModel");
const agreementModel = require('../models/agreementModel')
const { Error } = require('mongoose');
const { corporateRequests } = require('../models/CorporateRequestsModel');
const { corporateTrainee } = require('../models/corporateTraineeModel');
const { courseRecordModel, traineeModel } = require('../models/traineeModel');
const { courseModel } = require('../models/courseModel');

const addAdmin = async (req, res) => {
    const {username, password} = req.body
    try {
        const check = await userModel.findOne({username},'_id').lean()
        if(check){ throw new Error('This username already exists')}
        const user = await userModel.create({username,password,type:'admin'})
        const admin = await adminModel.create({_id:user._id})
        res.status(200).json(admin)
    }catch(error){
        res.status(400).json({error : error.message})
    }
}


const addAgreementRecord = async (req, res) => {
    try{
        const {traineeAgreement , instructorAgreement, instructorCut} = req.body
        const count =  await agreementModel.countDocuments()
        if(count === 0){
            await agreementModel.create({traineeAgreement , instructorAgreement, instructorCut})
            res.status(200).json({message:"successful"})
        }
        else{
            res.status(401).json({error:"the agreement is already created"})
        }
    }catch(error){
        res.status(400).json({error : error.message})
    }
}
const changeAgreements = async (req,res) => {
    try{
        const {traineeAgreement , instructorAgreement, instructorCut} = req.body
        await agreementModel.updateOne({},{traineeAgreement , instructorAgreement, instructorCut})
        res.status(200).json({message:"successful"})
    }catch(error){
        res.status(400).json({error : error.message})
    }
}
const getCourseRequests = async (req, res) => {
    try{
        const data = await corporateRequests.find({status:{$ne:'pending'}})
        res.status(200).json(data)
    }catch(error){
        res.status(400).json({error : error.message})
    }
}
const answerRequest = async (req, res) => {
    try{
        const {requestId, response} = req.body
        const request = await corporateRequests.findOne({_id:requestId})
        if(!request) return res.status(400).json({error : "invalid request id"})
        if(response === 'accept'){
            await corporateRequests.updateOne({_id:requestId},{status:'accepted'},{new:true,upsert:true})
            await courseModel.updateOne({_id:courseId},{$inc : {numOfPurchases:1}})
            const newCourseRecord = await new courseRecordModel({courseId:courseId})
            await traineeModel.updateOne({_id:id},{$addToSet:{courseList:newCourseRecord}},{new:true,upsert:true})
            res.status(200).json({message: 'successful'})
        }
        else if(response === 'reject'){
            await corporateRequests.updateOne({_id:requestId},{status:'rejected'},{new:true,upsert:true})
            res.status(200).json({message: 'successful'})
        }
        else{
            req.status(401).json({error: 'No such request'})
        }
    }catch(error){
        res.status(400).json({error : error.message})
    }
}
module.exports = {addAdmin,addAgreementRecord,changeAgreements,getCourseRequests}