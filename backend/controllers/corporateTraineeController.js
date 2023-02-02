const { default: mongoose } = require('mongoose')
const { traineeModel } = require('../models/traineeModel')
const { Error } = require('mongoose');

const { corporateTrainee } = require('../models/corporateTraineeModel')
const userModel = require("../models/userModel");
const { corporateRequests } = require('../models/CorporateRequestsModel');
const { courseModel } = require('../models/courseModel');

const addCorporateTrainee = async (req, res) => {
    const { username, password } = req.body
    console.log(req.body);
    try {
        const check = await userModel.findOne({ username }, '_id').lean()
        if (check) { throw new Error('This username already exists') }
        const user = await userModel.create({ username, password, type: 'trainee' })
        const CorporateTrainee = await traineeModel.create({ _id: user._id, type: 'corporate trainee' })
        const CorporateTraineeInfo = await corporateTrainee.create({ _id: user._id })
        res.status(200).json(CorporateTrainee)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


const getOne = async (req, res) => {
    try {
        const id = req.params.id
        const CorporateTrainee = await traineeModel.findOne({ _id: id })
        res.status(200).json(CorporateTrainee)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const requestCourse = async (req, res) => {
    try {
        const corporateId = req._id
        const { courseId } = req.body
        console.log(req.body, courseId);
        const previousRequest = await corporateRequests.findOne({ courseId: courseId, corporateId: corporateId, status: 'pending' }).lean()
        if (previousRequest) return res.status(401).json({ error: 'You already requsted this course' })
        const courseData = await courseModel.findOne({ _id: courseId }, 'title -_id').lean()
        const courseTitle = courseData.title
        const data = await userModel.findOne({ _id: corporateId }, 'username -_id').lean()
        const corporateUserName = data.username
        //await corporateTrainee.updateOne({_id:corporateTraineeId},{$addToSet:{courseRequests:{courseId:courseId}}})
        await corporateRequests.create({ corporateId: corporateId, corporateUserName, courseId, courseTitle, status: 'pending' })

        res.status(200).json({ message: 'successful' })
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: err.message })
    }
}


module.exports = { addCorporateTrainee, getOne, requestCourse }