const jwt = require('jsonwebtoken');
const { Error } = require('mongoose');
const { corporateTrainee } = require('../models/corporateTraineeModel');
const { courseModel } = require('../models/courseModel');
const individualTraineeModel = require('../models/individualTraineeModel');
const { traineeModel } = require('../models/traineeModel');
const userModel = require("../models/userModel");
const mongoose = require('mongoose')


const requireAdmin = async (req,res,next) => {

    const {authorization} = req.headers 
    if(!authorization){
        return res.status(401).json({error:"Token required"})
    }
    const token = authorization.split(' ')[1]

    try{
        const {_id} = jwt.verify(token, process.env.SECRET)
        const user = await userModel.findOne({_id},'type').lean()
        if(user.type ==='admin') {
            req._id=_id 
            next()
        }
        else {throw new Error("You do not have access to this resource")}
    }
    catch(err){
        console.log(err)
        res.status(401).json({error : err.message})
    }
}
const requireTrainee = async (req,res,next) => {

    const {authorization} = req.headers 
    if(!authorization){
        return res.status(401).json({error:"Token required"})
    }
    const token = authorization.split(' ')[1]

    try{
        const {_id} = jwt.verify(token, process.env.SECRET)
        const user = await userModel.findOne({_id},'type').lean()
        if(user.type ==='trainee') {
            req._id=_id 
             next()
            }
        else {throw new Error( "You are not an authorized trainee")}
    }
    catch(err){
        console.log(err)
        res.status(401).json({error : err.message})
    }
}
const requireInstructor = async (req,res,next) => {

    const {authorization} = req.headers 
    if(!authorization){
        return res.status(401).json({error:"Token required"})
    }
    const token = authorization.split(' ')[1]

    try{
        const {_id} = jwt.verify(token, process.env.SECRET)
        const user = await userModel.findOne({_id},'type').lean()
        if(user.type ==='instructor') {
            req._id=_id 
            next()
        }
        else {throw new Error( "You are not an authorized admin")}
    }
    catch(err){
        console.log(err)
        res.status(401).json({error : err.message})
    }
}
const requireUser = async (req,res,next) => {
    const {authorization} = req.headers 
    if(!authorization){
        return res.status(401).json({error:"Token required"})
    }
    const token = authorization.split(' ')[1]

    try{
        const {_id} = jwt.verify(token, process.env.SECRET)
        req._id = _id
        req.user = await userModel.findOne({_id},'type').lean()
        next()
    }
    catch(err){
        console.log(err)
        res.status(401).json({error : err.message})
    }
}

const requireCourseAuthor = async (req,res,next) => { 
    const {authorization} = req.headers
    const courseId = req.query.courseId || req.body.courseId || req.params.courseId
    try{
        if(!authorization){
            throw new Error( "Token required")
        }
        const token = authorization.split(' ')[1]
        if(!courseId){
            throw new Error( "CourseId required")
        }
        const {_id} = jwt.verify(token, process.env.SECRET)
        const user = await userModel.findOne({_id},'type').lean()
        if(user.type ==='instructor') {
            req._id=_id 
            const course = await courseModel.findOne({_id:courseId},'instrucrtorId -_id').lean()
            if((course.instrucrtorId.toString())===_id) {next()}
            else {throw new Error( "You do not have access to this Course")}
        }
        else {throw new Error( "You are not an authorized instructor")}
    }
    catch(err){
        console.log(err)
        res.status(401).json({error : err.message})
    }
}

const requireOwnership = async (req,res,next) => {
    const {authorization} = req.headers 
    const courseId = req.params.courseId || req.body.courseId || req.query.courseId
    if(!authorization){
        return res.status(401).json({error:"Token required"})
    }
    const token = authorization.split(' ')[1]
    if(!courseId){
        return res.status(401).json({error:"CourseId required"})
    }
    try{
        const {_id} = jwt.verify(token, process.env.SECRET)
        const user = await userModel.findOne({_id},'type').lean()
        if(user.type ==='trainee') {
            req._id=_id 
            const courseList = await traineeModel.findOne({_id},'courseList.courseId -_id').lean()
            const check = courseList.courseList.find( course => course.courseId.equals( mongoose.Types.ObjectId(courseId)))
            if(!check) {throw new Error("You do not own this course")}
            else { next()}
            }
        else {throw new Error("You are not an authorized trainee")}
    }
    catch(err){
        console.log(err)
        res.status(401).json({error : err.message})
    }
}

const requireIndividualTrainee = async (req,res,next) => {

    const {authorization} = req.headers 
    if(!authorization){
        return res.status(401).json({error:"Token required"})
    }
    const token = authorization.split(' ')[1]
    try{
        const {_id} = jwt.verify(token, process.env.SECRET)
        const user = await individualTraineeModel.findOne({_id}).lean()
        if(user) {
            req._id=_id 
             next()
            }
        else {throw new Error( "You are not an authorized individual trainee")}
    }
    catch(err){
        console.log(err)
        res.status(401).json({error : err.message})
    }
}
const requireCorporateTrainee = async (req,res,next) => {

    const {authorization} = req.headers 
    if(!authorization){
        return res.status(401).json({error:"Token required"})
    }
    const token = authorization.split(' ')[1]
    try{
        const {_id} = jwt.verify(token, process.env.SECRET)
        const user = await corporateTrainee.findOne({_id}).lean()
        if(user) {
            req._id=_id 
             next()
            }
        else {throw new Error( "You are not an authorized individual trainee")}
    }
    catch(err){
        console.log(err)
        res.status(401).json({error : err.message})
    }
}

module.exports = {requireAdmin,requireTrainee,requireInstructor,requireUser,requireCourseAuthor,requireOwnership,requireIndividualTrainee,requireCorporateTrainee}