const { default: mongoose } = require('mongoose')

const {corporateTrainee,course} = require('../models/corporateTraineeModel')

const addCoporateTrainee = async (req, res) => {
    const {username, password} = req.body

    try {
        const CorporateTrainee = await corporateTrainee.create({username, password}) 
        res.status(200).json(CorporateTrainee)
    }catch(err){
        res.status(400).json({error : err.message})
    }
}

const getAll = async (req,res) => {
    try{
       
        const CorporateTrainees = await corporateTrainee.find({})
        res.status(200).json(CorporateTrainees)
    }catch(err){
        res.status(400).json({error : err.message})
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

const addCourse = async (req,res) => {
    try{
        const corporateTraineeId=await req.params.id
        const{courseId} = req.body
        const newCourse = await new course({courseId:courseId})
        const newCourseList = await corporateTrainee.updateOne({_id:corporateTraineeId},{$addToSet:{courseList:newCourse}})
        res.status(200).json(newCourse)
    }catch(err){
        res.status(400).json({error : err.message})
    }
}
module.exports = {addCoporateTrainee, getAll, getOne, addCourse}