const {courseModel, subtitlesModel, lessonsModel, exerciseModel} = require("../models/courseModel");
const instructorModel = require("../models/instructorModel");

const getInstructor = async (req,res)=>{
    const {id} = req.params
    const instructor = await instructorModel.find({'_id' : id})
    res.send(instructor)
}
const addInstructor = async (req, res) => {
    const {username, password, email} = req.body

    try {
        const instructor = await instructorModel.create({username, password, email}) 
        res.status(200).json(instructor)
    }catch(error){
        res.status(400).json({error : error.message})
    }
}

const viewMyCourses = async (req,res)=>{
    const {id} = req.params
    try {
    const instructorCourses = await courseModel.find({'instrucrtorId' : id})
    res.send(instructorCourses)
    } catch (err) {
        res.send({error:err.message})
    }
}

const viewMySubjects = async (req,res)=>{
    const {id} = req.params
    try {
    const subjects = await courseModel.distinct('subject', {'instrucrtorId' : id})
    res.send(subjects)
    } catch (err) {
        res.send({error:err.message})
    }
}

const filterOnSubject = async (req, res) => {
    const {id} = req.params
    const {subject} = req.body
    try{
    const {courses} = await instructorModel.findOne({'_id':id}).select('courses -_id')
    var x = []    
        for (let index = 0; index < courses.length; index++) {
            const element = courses[index];
            const courseInfo = await courseModel.findOne({'_id':element,'subject':subject}).select('title -_id')
            if(courseInfo)
            x.push(courseInfo)
        }
    res.send(x)
} catch (err) {
    res.send({error:err.message})
}
}

const addCourse = async (req, res) => {
    try{
        const instrucrtorId = req.params.id
        const instrucrtorData = await instructorModel.find({_id:instrucrtorId},'name -_id')
        const instrucrtorName = instrucrtorData[0].name
        const {title, outlines, summary, previewVideo, subject, subtitles, price, totalHours, imageURL} = req.body
        // subtitles taken from the json is an array of the titles of the subtitles
        const subParemters = await subtitles.map(sub => {return {title:sub}})
        const subtitlesData = await subtitlesModel.create(subParemters)
        console.log(subtitlesData);
        const course = await courseModel.create({title,outlines,summary,previewVideo,subject,subtitles:subtitlesData,price,totalHours,imageURL,instrucrtorId,instrucrtorName})
        res.status(200).json(course)

    }catch(err){
        res.status(400).json({error:err.message})
    }


} 



module.exports = {getInstructor,addInstructor,viewMyCourses,filterOnSubject,addCourse,viewMySubjects}