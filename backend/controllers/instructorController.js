const instructorModel = require("../models/instructorModel");
const userModel = require("../models/userModel");
const courseModel = require("../models/courseModel");
const { Error } = require('mongoose');
const { courseModel } = require("../models/courseModel");

const getMyInfo = async (req, res) => {//this is for the instructor himself
    const id = req._id
    const instructor = await instructorModel.findOne({ '_id': id }, 'name gender biography -_id').lean()
    const email = await userModel.findOne({ '_id': id }, 'email -_id').lean()
    res.json({ ...instructor, ...email })
}
const addInstructor = async (req, res) => {
    const { username, password } = req.body

    try {
        const check = await userModel.findOne({ username }, '_id').lean()
        if (check) { throw new Error('This username already exists') }
        const user = await userModel.create({ username, password, type: 'instructor' })
        const instructor = await instructorModel.create({ _id: user._id })
        res.status(200).json(instructor)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


const editBiography = async (req, res) => {
    try {
        const id = req.params.id;
        const { biography } = req.body
        const updatedInstructor = await instructorModel.findOneAndUpdate({ _id: id }, { biography }, { new: true, upsert: true })
        res.status(200).json(updatedInstructor)
    }
    catch (err) {
        res.status(400).json({ error: err.message })
    }
}
const editInstructorInfo = async (req, res) => { // adds info for first time instructors
    try {
        const id = req._id;
        const { name, gender, biography, email } = req.body
        if (!name || !gender || !biography || !email) { throw new Error('incomplete info') }
        const updatedInstructor = await instructorModel.findOneAndUpdate({ _id: id }, { name, gender, biography }, { new: true, upsert: true })
        await userModel.updateOne({_id:id},{email},{new:true,upsert:true})
        await courseModel.updateMany({instructorId:id},{instructorName:name},{upsert:true})

        res.status(200).json({message: "Successful"})
    }
    catch (err) {
        console.log(err);
        res.status(401).json({ error: err.message })

    }
}
const setContractState = async (req, res) => { // used to either accept the contract or to later reject it
    try {
        const id = req._id;
        const { state } = req.body //boolean 
        const updatedInstructor = await instructorModel.findOneAndUpdate({ _id: id }, { consent: state }, { new: true, upsert: true })
        res.status(200).json(updatedInstructor)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const getContractState = async (req, res) => { // used to either accept the contract or to later reject it
    try {
        const id = req._id;
        const consent = await instructorModel.findOne({ _id: id }, 'consent -_id').lean()
        res.status(200).json(consent)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const rateInstructor = async (req, res) => {
    try {
        const id = req.params.id;
        const { rating, comment, instructorId } = req.body
        const instructorData = await instructorModel.findOne({_id:instructorId},'reviews.reviewerId -_id').lean()
        const check = instructorData.reviews.find( rev => rev.reviewerId.equals( mongoose.Types.ObjectId(id)))
        if(check) {throw new Error("You already reviewed this instructor")}
        const addedReview = await instructorModel.findOneAndUpdate({ _id: instructorId }, { $push: { reviews: { rating, comment, reviewerId: id } } }, { new: true, upsert: true }).lean()
        const Rating = addedReview.rating
        Rating["" + rating] = Rating["" + rating] + 1
        const ret = await instructorModel.findOneAndUpdate({ _id: instructorId }, { rating: Rating }, { new: true, upsert: true })
        res.status(200).json(ret)
    }
    catch (err) {
        res.status(400).json({ error: err.message })
    }
}



module.exports = { getMyInfo, addInstructor, editBiography, editInstructorInfo, setContractState, rateInstructor, getContractState }