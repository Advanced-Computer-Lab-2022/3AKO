const courseModel = require("../models/courseModel");
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
    }catch(err){
        res.status(400).json({error : err.message})
    }
}

const viewMyCourses = async (req,res)=>{
    const {id} = req.params
    try {
    const instructorCourses = await instructorModel.findOne({'_id':id}).select('courses -_id').populate('courses','title subject')
    const {courses} = instructorCourses    
    var jsonArray = JSON.parse(JSON.stringify(courses))
    res.send(jsonArray)
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



module.exports = {getInstructor,addInstructor,viewMyCourses,filterOnSubject}