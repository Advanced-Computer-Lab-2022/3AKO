const instructorModel = require("../models/instructorModel");

const getInstructor = async (req,res)=>{
    const {id} = req.params
    const instructor = await instructorModel.find({'_id' : id})
    res.send(instructor)
}


module.exports = {getInstructor}