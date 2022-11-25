const instructorModel = require("../models/instructorModel");
const userModel = require("../models/userModel");

const getInstructor = async (req,res)=>{
    const {id} = req.params
    const instructor = await instructorModel.find({'_id' : id})
    res.send(instructor)
}
const addInstructor = async (req, res) => {
    const {username, password} = req.body

    try {
        const user = await userModel.create({username,password,type:'instructor'})
        const instructor = await instructorModel.create({_id:user._id}) 
        res.status(200).json(instructor)
    }catch(error){
        res.status(400).json({error : error.message})
    }
}


const editBiography = async (req, res) => {
    try{
        const id = req.params.id;
        const {biography}= req.body
        const updatedInstructor = await instructorModel.findOneAndUpdate({_id:id},{biography},{new:true,upsert:true})
        res.status(200).json(updatedInstructor)
    }
    catch(err){
        res.status(400).json({error:err.message})
    }
}
const addInstructorInfo = async (req, res) => { // adds info for first time instructors
    try{
        const id = req.params.id;
        const {name , gender, biography} = req.body
        const updatedInstructor = await instructorModel.findOneAndUpdate({_id:id},{name,gender,biography},{new:true,upsert:true})
        res.status(200).json(updatedInstructor)
    }
    catch(err){
        res.status(400).json({error:err.message})

    }
}
const setContractState = async (req, res) => { // used to either accept the contract or to later reject it
    try{
        const id = req.params.id;
        const {state} =req.body //bollean 
        const updatedInstructor = await instructorModel.findOneAndUpdate({_id:id},{consent:state},{new:true,upsert:true})
        res.status(200).json(updatedInstructor)
    }catch(err){
        res.status(400).json({error:err.message})
    }
}

const rateInstructor = async (req, res) => {
    try{
        const id = req.params.id;
        const {rating , comment, instructorId } = req.body
        const addedReview = await instructorModel.findOneAndUpdate({_id:instructorId},{$push:{reviews:{rating,comment,reviewerId:id}}},{new:true,upsert:true}).lean()
        const Rating = addedReview.rating
        Rating[""+rating]=Rating[""+rating]+1
        const ret = await instructorModel.findOneAndUpdate({_id:instructorId},{rating:Rating},{new:true,upsert:true})
        res.status(200).json(ret)
    }
    catch(err){
        res.status(400).json({error:err.message})
    }
}


module.exports = {getInstructor,addInstructor,editBiography,addInstructorInfo,setContractState,rateInstructor}