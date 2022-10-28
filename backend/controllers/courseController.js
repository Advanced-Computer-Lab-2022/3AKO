const mongoose = require('mongoose')

const courseModel = require('../models/courseModel')
const instructorModel = require('../models/instructorModel')

const createCourse = async (req, res) => {
    const {id} = req.params
    try{
        req.body["instrucrtorId"]=id
        const course = await courseModel.create(req.body)
        const instructorCourses = await instructorModel.updateOne({_id:id},{$addToSet:{courses:course}})
        res.send(course)
    }catch(err){
        res.status(400).json({error : err.message})
    }   
}

const getAllCourses = async (req, res) => {
    const allCoures = await courseModel.find({})
    res.send(allCoures)
}

const filterOnSubject = async (req, res) => {
    const {subject} = req.body
    const courses = await courseModel.find({'subject' : subject})
    res.send(courses)
}

const filterOnRating = async (req, res) => {
    const minRating = req.body
    const courses = await courseModel.find({'rating' : {$gt : minRating}})
    res.send(courses)
}

const searchForCourses = async (req, res) => {
    const {title, subject, firstName, lastName} = req.body
    const instructorId = await instructorModel.find({'firstName' : firstName, 'lastName' : lastName},{_id : 1})
    if(title == null){

    }else {
        
    }
    res.send(courses)
}

module.exports = {
    getAllCourses,
    filterOnSubject,
    filterOnRating,
    createCourse,
    searchForCourses 
}