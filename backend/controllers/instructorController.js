const {courseModel, subtitlesModel, lessonsModel, exerciseModel,questionModel} = require("../models/courseModel");
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
        const subtitlesData = await new subtitlesModel(subParemters)
        console.log(subtitlesData);
        const course = await courseModel.create({title,outlines,summary,previewVideo,subject,subtitles:subtitlesData,price,totalHours,imageURL,instrucrtorId,instrucrtorName})
        res.status(200).json(course)

    }catch(err){
        res.status(400).json({error:err.message})
    }


} 
const addSubVid = async (req, res) => {
    try{
        const id = req.params.id;
        const {vidUrl,courseId,position,title,description} = req.body
        const reg = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
        const match = vidUrl.match(reg)
        if (match && match[1].length == 11) {
            ///no///const updatedCourse = await courseModel.findOneAndUpdate({_id:courseId},{$set:{'subtitles.$[a].lessons.$[b].$.videoURL': match[1]}},{arrayFilters:[{"a.title":title},{"b.position":position}]})
            //const updatedCourse = await courseModel.findOneAndUpdate({_id:courseId,'subtitles.title':title,'subtitles.0.lessons.position':position},//working properly
            //    {$set:{'subtitles.$[a].lessons.$[b].videoURL': match[1]}},{arrayFilters:[{"a.title":title},{"b.position":position}],new:true,upsert:true})
            const updatedCourse = await courseModel.findOneAndUpdate({_id:courseId},{$set:{'subtitles.$[a].lessons.$[b].videoURL': match[1],'subtitles.$[a].lessons.$[b].description':description}},{arrayFilters:[{"a.title":title},{"b.position":position}],new:true,upsert:true})

            res.status(200).json(updatedCourse)
          }

    }
    catch(err){
        res.status(400).json({error:err.message})
    }

}
const addLesson = async (req, res) => {
    try{
        const id = req.params.id;
        const {vidUrl,courseId,position,subtitleTitle,title,readings,description} = req.body
        const lesson = await new lessonsModel({title:title,description:description,videoURL:vidUrl,readings:readings,position:position})
        //const updatedCourse = await courseModel.findOneAndUpdate({_id:courseId},{$addToSet:{'subtitles.$[a].lessons':lesson}},{arrayFilters:[{"a.title":subtitleTitle}],new:true})
        const updatedCourse = await courseModel.findOneAndUpdate({_id:courseId},{$push:{'subtitles.$[a].lessons':lesson}},{arrayFilters:[{"a.title":subtitleTitle}],new:true})

        res.status(200).json(updatedCourse);
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
        const {courseId,title,position,subtitleTitle} = req.body
        const exercise = await new exerciseModel({title:title,position:position})
        const updatedCourse = await courseModel.findOneAndUpdate({_id:courseId},{$push:{'subtitles.$[a].excercises':exercise}},{arrayFilters:[{"a.title":subtitleTitle}],new:true})
        res.status(200).json(updatedCourse)
    }
    catch(err){
        res.status(400).json({error:err.message})
    }
}
const addQuestion =async (req, res) => {
    try{
        const {courseId,position,subtitleTitle,questionContent,choice1,choice2,choice3,choice4,answer} = req.body
       const question = await new questionModel({question:questionContent,choice1,choice2,choice3,choice4,answer})
        const updatedCourse = await courseModel.findOneAndUpdate({_id:courseId},{$push:{'subtitles.$[a].excercises.$[b].questions':question}},{arrayFilters:[{"a.title":subtitleTitle},{"b.position":position}],new:true})
        res.status(200).json(updatedCourse)
    }
    catch(err){
        res.status(400).json({error:err.message})

    }
}
const editInfo = async (req, res) => {
    try{
        const id = req.params.id;
        const {biography,email}= req.body
        const updatedInstructor = await instructorModel.findOneAndUpdate({_id:id},{email,biography},{new:true,upsert:true})
        res.status(200).json(updatedInstructor)
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
const editPassword = async (req, res) => {
    try{
        const id = req.params.id;
        const {oldPassword,newPassword}= req.body
        const passwordObj = await instructorModel.findOne({_id:id},'password -_id').lean()
        const password= JSON.parse(JSON.stringify(passwordObj)).password
        console.log(password===oldPassword);
        if(oldPassword===password){
            const updatedInstructor = await instructorModel.findOneAndUpdate({_id:id},{password:newPassword},{new:true,upsert:true})
            res.status(200).json(updatedInstructor)
        }
        else{
            res.status(400).json({error:"Wrong Password"})
        }
    }
    catch(err){
        res.status(400).json({error:err.message})
    }
}



module.exports = {getInstructor,addInstructor,viewMyCourses,filterOnSubject,addCourse,viewMySubjects,addLesson,addSubVid,addPreviewLink,addExcercise,addQuestion,editInfo,addPromotion,editPassword}