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
    const allCoures = await courseModel.find({},{_id :0, totalHours:1,title:1,rating:1,promotion:1})
    res.send(allCoures)
}

const filterOnSubject = async (subject) => {
    if(subject != null){
    const courses = await courseModel.find({'subject' : subject})
    }
    else {
        const courses = {}
    }
   return courses;
}

const filterOnRating = async (minRating) => {
    
    const courses = await courseModel.find({'rating' : {$gte : minRating}})
    return courses;
}

const filterOnPrice = async (minPrice,maxPrice) => {
    
    const courses = await courseModel.find({'price' : $and[ {$gte : minPrice },{$lte : maxPrice }]})
    return courses;
}

const filter = async (req,res) =>{
    const {} = req.body
    const priceFiltered = filterOnPrice();
    const subjectFiltered = filterOnSubject();
}


const searchForCourses = async (req, res) => {
    const {searchKey} = req.params
    const instructorId = await instructorModel.find({'name' : searchKey.toLowerCase()},{_id : 1})
    const courses = await courseModel.find( { $or: [ { instrucrtorId: instructorId },{ title: searchKey.toLowerCase()},{subject : searchKey}] } )
    
    res.send(courses)
}

// const getCourseInfo= async (req, res) => {
//     try{
//         const courseId = req.params.courseId        
//         const courseData = await (courseModel.find({_id:courseId}).select('-_id').lean())
//         const courseInfo= JSON.parse(JSON.stringify(courseData))
//         courseInfo[0].subtitles=courseInfo[0].subtitles.map(sub => sub.title)
//         res.status(200).json(courseInfo[0])
//     }catch(err){
//         res.status(400).json({error:err.message})
//     }
// }
const getCourseInfo = async (req, res) => {
    try{
        const courseId = req.params.courseId
        const courseData = await courseModel.find({_id:courseId},'title outlines summary previewVideo subject subtitles.title rating price totalHours instrucrtorId instrucrtorName promotion numOfViews imageURL')
        res.status(200).json(courseData[0])
    }catch(err){
        res.status(400).json({error:err.message})
    }
}
const searchByText = async (req, res) => {
    try{
        const text=req.params.text
        console.log(text);
        const courses =  await courseModel.find({$or: [{ title: {"$regex": text,"$options": "i"}},
            {subject: {"$regex": text,"$options": "i"}},
            {instrucrtorName: {"$regex": text,"$options": "i"}}]},
            'title outlines summary previewVideo subject subtitles.title rating price totalHours instrucrtorId instrucrtorName promotion numOfViews imageURL')
        res.status(200).json(courses)
    }catch(err){
        res.status(400).json({error:err.message})
    }
    
}



module.exports = {
    getAllCourses,
    filterOnSubject,
    filterOnRating,
    createCourse,
    searchForCourses,
    getCourseInfo,
    searchByText
}