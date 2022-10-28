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
    const instructorCourses = await instructorModel.findOne({'_id':id}).select('courses -_id').populate('courses','title -_id')
    const courses = instructorCourses.courses    
    res.send(instructorCourses)
    } catch (err) {
        res.send({error:err.message})
    }
}


module.exports = {getInstructor,addInstructor,viewMyCourses}