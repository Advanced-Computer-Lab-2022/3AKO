
const complaintModel = require("../models/complaintModel");



const addComplaint = async (req, res) => {
    try{
        const id = req.params.id;
        const {title, body,reportedCourse} = req.body
        const complaint = await complaintModel.create({title,body,userId:id,reportedCourse})
        res.status(200).json(complaint)
    }
    catch(err){
        res.status(400).json({error:err.message})
    }
}

module.exports ={addComplaint}