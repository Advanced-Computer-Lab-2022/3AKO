const mongoose = require('mongoose')

const {courseModel, subtitlesModel, lessonsModel, exerciseModel,questionModel} = require('../models/courseModel')
const instructorModel = require('../models/instructorModel')

const getAllCourses = async (req, res) => {
    try{
        const allCoures = await courseModel.find({})
        res.status(200).json(allCoures)
    }catch(err){
        res.status(400).json({error:err.message})
    }
}
const createCourse = async (req, res) => {
    try{
        const instrucrtorId = req.params.id
        const instrucrtorData = await instructorModel.find({_id:instrucrtorId},'name -_id')
        const instrucrtorName = instrucrtorData[0].name
        const {title, outlines, summary, previewVideo, subject, subtitles, price, totalHours, imageURL} = req.body
        // subtitles taken from the json is an array of the titles of the subtitles
        const subParemters = await subtitles.map(sub => {return {title:sub.title,totalHours:sub.totalHours}})
        const subtitlesData = await subParemters.map(sub => new subtitlesModel(sub))
        const reg = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
        const match = previewVideo.match(reg)
        if (match && match[1].length == 11) {
            const course = await courseModel.create({title,outlines,summary,previewVideo:match[1],subject,subtitles:subtitlesData,price,totalHours,imageURL,instrucrtorId,instrucrtorName})
            res.status(200).json(course)
        }
        else{
            res.status(400).json({error:"Invalid Youtube Video Link"})
        }

    }catch(err){
        res.status(400).json({error:err.message})
    }


} 

const getAllSubjects = async (req,res)=>{
    try {
    const subjects = await courseModel.distinct('subject')
    res.status(200).json(subjects)
    } catch (err) {
        res.status(400).json({error:err.message})
    }
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
    try{
        const {searchKey} = req.params
        const instructorId = await instructorModel.find({'name' : searchKey.toLowerCase()},{_id : 1})
        const courses = await courseModel.find( { $or: [ { instrucrtorId: instructorId },{ title: searchKey.toLowerCase()},{subject : searchKey}] } )
        res.status(200).json(courses)
    }catch(err){
        res.status(400).json({error:err.message})
    }
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
        const courseData = await courseModel.find({_id:courseId},'title outlines summary previewVideo subject subtitles.title subtitles._id subtitles.totalHours rating reviews price totalHours instrucrtorId instrucrtorName promotion numOfViews imageURL')
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

const instructorFilterOnSubject = async (req, res) => {
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
const addSubVid = async (req, res) => { // adds a video link to a lesson and discription as well
    try{
        const id = req.params.id;
        const {vidUrl,courseId,position,subtitleId,description} = req.body
        const reg = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
        const match = vidUrl.match(reg)
        if (match && match[1].length == 11) {
            console.log(subtitleId);
            ///no///const updatedCourse = await courseModel.findOneAndUpdate({_id:courseId},{$set:{'subtitles.$[a].lessons.$[b].$.videoURL': match[1]}},{arrayFilters:[{"a.title":title},{"b.position":position}]})
            //const updatedCourse = await courseModel.findOneAndUpdate({_id:courseId,'subtitles.title':title,'subtitles.0.lessons.position':position},//working properly
            //    {$set:{'subtitles.$[a].lessons.$[b].videoURL': match[1]}},{arrayFilters:[{"a.title":title},{"b.position":position}],new:true,upsert:true})
            const updatedCourse = await courseModel.findOneAndUpdate({_id:courseId},{$set:{'subtitles.$[a].lessons.$[b].videoURL': match[1],'subtitles.$[a].lessons.$[b].description':description}},{arrayFilters:[{"a._id":subtitleId},{"b.position":position}],new:true,upsert:true})

            res.status(200).json(updatedCourse)
        }
        else{
            res.status(400).json({error:"Invalid Video Link"})
        }

    }
    catch(err){
        res.status(400).json({error:err.message})
    }

}
const addLesson = async (req, res) => {
    try{
        const id = req.params.id;
        const {vidUrl,courseId,position,subtitleId,title,readings,description} = req.body
        const reg = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
        const match = vidUrl.match(reg)
        if (match && match[1].length == 11) {
            const lesson = await new lessonsModel({title:title,description:description,videoURL:match[1],readings:readings,position:position})
            const updatedCourse = await courseModel.findOneAndUpdate({_id:courseId},{$push:{'subtitles.$[a].lessons':lesson}},{arrayFilters:[{"a._id":subtitleId}],new:true})
            res.status(200).json(updatedCourse)
        }
        else{
            res.status(400).json({error:"Invalid Youtube Video Link"})
        }
    }
    catch(err){
        res.status(400).json({error:err.message})
    }
}
const addPreviewLink = async (req, res) => {
    try{
        const {courseId,vidUrl} = req.body
        const reg = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
        const match = vidUrl.match(reg)
        if (match && match[1].length == 11) {
            const updatedCourse = await courseModel.findOneAndUpdate({_id:courseId},{$set:{'previewVideo':match[1]}},{new:true})
            res.status(200).json(updatedCourse)
        }
        else{
            res.status(400).json("Invalid Youtube Link")
        }


    }
    catch(err){
        res.status(400).json({error:err.message})
    }
}
const addExcercise = async (req, res) => {
    try{
        const {courseId,title,position,subtitleId} = req.body
        const exercise = await new exerciseModel({title:title,position:position})
        const updatedCourse = await courseModel.findOneAndUpdate({_id:courseId},{$push:{'subtitles.$[a].excercises':exercise}},{arrayFilters:[{"a._id":subtitleId}],new:true})
        res.status(200).json(updatedCourse)
    }
    catch(err){
        res.status(400).json({error:err.message})
    }
}
const addQuestion =async (req, res) => {
    try{
        const {courseId,exerciseId,subtitleId,questionContent,choice1,choice2,choice3,choice4,answer} = req.body
        const question = await new questionModel({question:questionContent,choice1,choice2,choice3,choice4,answer})
        const updatedCourse = await courseModel.findOneAndUpdate({_id:courseId},{$push:{'subtitles.$[a].excercises.$[b].questions':question}},{arrayFilters:[{"a._id":subtitleId},{"b._id":exerciseId}],new:true,upsert:true})
        res.status(200).json(updatedCourse)
    }
    catch(err){
        res.status(400).json({error:err.message})

    }
}




const addPromotion = async (req, res) => {
    try{
        const id = req.params.id;
        const {courseId,discount,date} = req.body
        const Endate = new Date(date)
        const updatedCourse = await courseModel.findOneAndUpdate({_id:courseId},{promotion:{discount:discount,saleEndDate:Endate}},{new:true,upsert:true})
        res.status(200).json(updatedCourse)
    }
    catch(err){
        res.status(400).json({error:err.message})
    }
}
const loadSubtitle = async (req, res) => {
    try{
        const id = req.params.id;
        const {courseId,subtitleId} = req.body
        const answers = await courseModel.findOne({_id:courseId},{_id:0,subtitles: {$elemMatch: {_id: subtitleId}},})
        
        res.status(200).json(answers)

    }
    catch(err){
        res.status(400).json({error:err.message})
    }
}
const loadExamAnswers = async (req, res) => {
    try{
        const {courseId,subtitleId,exerciseId} = req.body
        const courseData = await courseModel.findOne({_id:courseId},{_id:0,subtitles: {$elemMatch: {_id: subtitleId}},}).lean()
        const courseInfo= JSON.parse(JSON.stringify(courseData))
        console.log(courseInfo);
        const answers = await courseInfo.subtitles[0].excercises.find(ex => {return ex._id ===exerciseId}).questions.map(q => q.answer)
        console.log(answers);

        res.status(200).json({answers})

    }
    catch(err){
        res.status(400).json({error:err.message})
    }
}
const rateCourse = async (req, res) => {
    try{
        const id = req.params.id;
        const {rating , comment, courseId } = req.body
        const addedReview = await courseModel.findOneAndUpdate({_id:courseId},{$push:{reviews:{rating,comment,reviewerId:id}}},{new:true,upsert:true}).lean()
        const Rating = addedReview.rating
        Rating[""+rating]=Rating[""+rating]+1
        const ret = await courseModel.findOneAndUpdate({_id:courseId},{rating:Rating},{new:true,upsert:true})
        res.status(200).json(ret)
    }
    catch(err){
        res.status(400).json({error:err.message})
    }
}



module.exports = {
    getAllCourses,
    createCourse,
    filterOnSubject,
    filterOnRating,
    searchForCourses,
    getCourseInfo,
    searchByText,
    loadSubtitle,
    loadExamAnswers,
    rateCourse
    ,viewMyCourses,instructorFilterOnSubject,viewMySubjects,addLesson
    ,addSubVid,addPreviewLink,addExcercise,addQuestion,addPromotion,
    getAllSubjects
}