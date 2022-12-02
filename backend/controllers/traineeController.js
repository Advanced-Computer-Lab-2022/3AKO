const { default: mongoose } = require('mongoose')

const {traineeModel,courseRecordModel} = require('../models/traineeModel')
const {courseModel} = require('../models/courseModel')

const userModel = require("../models/userModel");

const addCourseToTrainee = async (req,res) => {//works with corporate but how with indiviual
    try{
        const {id}=req.params
        const{courseId} = req.body
        const newCourseRecord = await new courseRecordModel({courseId:courseId})
        const newCourseList = await traineeModel.findOneAndUpdate({_id:id},{$addToSet:{courseList:newCourseRecord}},{new:true,upsert:true})
        res.status(200).json(newCourseList)
    }catch(err){
        res.status(400).json({error : err.message})
    }
}

const addLessonRecord = async(req, res) => {
    try{
        const traineeId=await req._id
        const{courseId,lessonId} = req.body
        const newCourseList = await traineeModel.updateOne({_id:traineeId, 'courseList.courseId':courseId},{$push:{'courseList.$.lessonsList':{lessonId,note:""}}})
        res.status(200).json({newCourseList})
    }catch(err){
        res.status(400).json({error : err.message})
    }
} 
const addExerciseRecord = async(req, res) => {
    try{
        const traineeId=await req._id
        const{courseId,exerciseId,grade,answers} = req.body
        const newCourseList = await traineeModel.updateOne({_id:traineeId, 'courseList.courseId':courseId},{$push:{'courseList.$.exercisesList':{exercisesId:exerciseId,grade:grade,answers}}})
        res.status(200).json({newCourseList})
    }catch(err){
        res.status(400).json({error : err.message})
    }
}
const addTraineeInfo = async (req, res) => { // adds info for first time trainee
    try{
        const id = req._id;
        const {name , gender} = req.body
        const updatedTrainee = await traineeModel.findOneAndUpdate({_id:id},{name,gender},{new:true,upsert:true})
        res.status(200).json(updatedTrainee)
    }
    catch(err){
        res.status(400).json({error:err.message})

    }
}
const myCourses = async (req, res) => { 
    try{
        const id = req._id
        const myCourseData = await traineeModel.findOne({_id:id},'courseList.courseId courseList.progress -_id').lean()
        const myCourseIds = myCourseData.courseList.map(li => li.courseId)
        console.log(myCourseIds);
        const findHelper = async (courseId) =>{
            console.log("id "+courseId);
            const title = await courseModel.findOne({_id:courseId},'title -_id').lean()
            console.log(title);
            return title
        }
        const coursesTitles =await Promise.all( myCourseIds.map(courseId => findHelper(courseId)))
        const coursesInfo = []
        for(i=0;i<myCourseIds.length;i++){
            console.log(myCourseData.courseList[i]);
            coursesInfo[i]={...coursesTitles[i],...myCourseData.courseList[i]}
        }
        res.status(200).json(coursesInfo)
        //res.status(200).json({...(myCourseData)})

    }
    catch(err){
        res.status(400).json({error:err.message})
    }
}

module.exports = {  addCourseToTrainee,  addLessonRecord, addExerciseRecord, addTraineeInfo,myCourses}