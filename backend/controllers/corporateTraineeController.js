const { default: mongoose } = require('mongoose')

const {corporateTrainee,courseRecordModel} = require('../models/corporateTraineeModel')
const userModel = require("../models/userModel");

const addCorporateTrainee = async (req, res) => {
    const {username, password} = req.body

    try {
        const user = await userModel.create({username,password,type:'corporate trainee'})
        const CorporateTrainee = await corporateTrainee.create({_id:user._id}) 
        res.status(200).json(CorporateTrainee)
    }catch(error){
        res.status(400).json({error : error.message})
    }
}


const getOne = async (req,res) => {
    try{
        const id = req.params.id
        const CorporateTrainee = await corporateTrainee.findOne({_id:id})
        res.status(200).json(CorporateTrainee)
    }catch(err){
        res.status(400).json({error : err.message})
    }
}

const addCourseToCorporate = async (req,res) => {
    try{
        const corporateTraineeId=await req.params.id
        const{courseId} = req.body
        const newCourseRecord = await new courseRecordModel({courseId:courseId})
        const newCourseList = await corporateTrainee.updateOne({_id:corporateTraineeId},{$addToSet:{courseList:newCourseRecord}})
        res.status(200).json(newCourse)
    }catch(err){
        res.status(400).json({error : err.message})
    }
}

const requestCourse= async(req, res) => {
    try{
        const corporateTraineeId=await req.params.id
        const{courseId} = req.body
        const newCourseList = await corporateTrainee.updateOne({_id:corporateTraineeId},{$addToSet:{courseRequests:{courseId:courseId}}})
        res.status(200).json({courseId})
    }catch(err){
        res.status(400).json({error : err.message})
    }
}

const addLessonRecord = async(req, res) => {
    try{
        const corporateTraineeId=await req.params.id
        const{courseId,lessonId} = req.body
        const newCourseList = await corporateTrainee.updateOne({_id:corporateTraineeId, 'courseList.courseId':courseId},{$push:{'courseList.$.lessonsList':{lessonId,note:""}}})
        res.status(200).json({newCourseList})
    }catch(err){
        res.status(400).json({error : err.message})
    }
} 
const addExerciseRecord = async(req, res) => {
    try{
        const corporateTraineeId=await req.params.id
        const{courseId,exerciseId,grade,answers} = req.body
        const newCourseList = await corporateTrainee.updateOne({_id:corporateTraineeId, 'courseList.courseId':courseId},{$push:{'courseList.$.exercisesList':{exercisesId:exerciseId,grade:grade,answers}}})
        res.status(200).json({newCourseList})
    }catch(err){
        res.status(400).json({error : err.message})
    }
}
const addCorporateInfo = async (req, res) => { // adds info for first time instructors
    try{
        const id = req.params.id;
        const {name , gender} = req.body
        const updatedInstructor = await corporateTrainee.findOneAndUpdate({_id:id},{name,gender},{new:true,upsert:true})
        res.status(200).json(updatedInstructor)
    }
    catch(err){
        res.status(400).json({error:err.message})

    }
}

module.exports = {addCorporateTrainee, getOne, addCourseToCorporate, requestCourse, addLessonRecord, addExerciseRecord, addCorporateInfo}