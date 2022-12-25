const { default: mongoose } = require('mongoose')
const { Error } = require('mongoose');
const { traineeModel, courseRecordModel } = require('../models/traineeModel')
const { courseModel } = require('../models/courseModel')
const instructorModel = require('../models/instructorModel')

const userModel = require("../models/userModel");

const addCourseToTrainee = async (req, res) => {//works with corporate but how with indiviual
    try {
        const { id } = req.params
        const { courseId } = req.body
        const newCourseRecord = await new courseRecordModel({ courseId: courseId })
        const newCourseList = await traineeModel.findOneAndUpdate({ _id: id }, { $addToSet: { courseList: newCourseRecord } }, { new: true, upsert: true })
        res.status(200).json(newCourseList)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const addLessonRecord = async (req, res) => {
    try {
        const traineeId = await req._id
        const { courseId, lessonId } = req.body
        const total = await courseModel.findOne({ _id: courseId }, 'materialCount -_id').lean()
        const newCourseList = await traineeModel.findOneAndUpdate({ _id: traineeId, 'courseList.courseId': courseId }, { $push: { 'courseList.$.lessonsList': { lessonId, note: "" } }, $inc: { 'courseList.$.progress': 1 / total.materialCount } }, { new: true, upsert: true }).lean()
        res.status(200).json({ message: "Successful" })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}
const addExerciseRecord = async (req, res) => {
    try {
        const traineeId = await req._id
        const { courseId, subtitleId, exerciseId, answers } = req.body
        // check if a record already exists for this exercise
        const exerciseData = await traineeModel.findOne({ _id: req._id }, { _id: 0, courseList: { $elemMatch: { courseId: courseId } } }).lean()
        const parsedData = await JSON.parse(JSON.stringify(exerciseData))
        const exerciseRecord = await (parsedData.courseList[0].exerciseList).find((ex) => { return ex.exerciseId === exerciseId })
        if (exerciseRecord) return res.status(401).json({ message: "You already passed this exam" })
        // getting the correct answers for the exercise
        const courseData = await courseModel.findOne({ _id: courseId }, { _id: 0, materialCount: 1, subtitles: { $elemMatch: { _id: subtitleId } } }).lean()
        const count = courseData.materialCount
        const courseInfo = JSON.parse(JSON.stringify(courseData))

        const correctAnswers = await courseInfo.subtitles[0].exercises.find(ex => { return ex._id === exerciseId }).questions.map(q => q.answer)
        if (!correctAnswers) throw new Error("this exercise does not exist")
        let grade = 0
        // comparing the answers
        for (let i = 0; i < correctAnswers.length; i++) {
            if (answers[i].toString() == correctAnswers[i].toString()) {
                grade++
            }
        }
        //adding a record only if the trainee gets more than half the answers correct
        if (grade < correctAnswers.length / 2) return res.status(200).json({ message: "Exam Failed" })
        await traineeModel.updateOne({ _id: traineeId, 'courseList.courseId': courseId }, { $push: { 'courseList.$.exerciseList': { exerciseId: exerciseId, grade: grade, answers } }, $inc: { 'courseList.$.progress': 1 / count } })
        res.status(200).json({ grade })
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: err.message })
    }
}
const addTraineeInfo = async (req, res) => { // adds info for first time trainee
    try {
        const id = req._id;
        const { name, gender } = req.body
        const updatedTrainee = await traineeModel.findOneAndUpdate({ _id: id }, { name, gender }, { new: true, upsert: true })
        res.status(200).json(updatedTrainee)
    }
    catch (err) {
        res.status(400).json({ error: err.message })

    }
}
const myCourses = async (req, res) => {
    try {
        const id = req._id
        const myCourseData = await traineeModel.findOne({ _id: id }, 'courseList.courseId courseList.progress -_id').lean()
        const myCourseIds = myCourseData.courseList.map(li => li.courseId)
        console.log(myCourseIds);
        const findHelper = async (courseId) => {
            console.log("id " + courseId);
            const title = await courseModel.findOne({ _id: courseId }, 'title -_id').lean()
            console.log(title);
            return title
        }
        const coursesTitles = await Promise.all(myCourseIds.map(courseId => findHelper(courseId)))
        const coursesInfo = []
        for (i = 0; i < myCourseIds.length; i++) {
            console.log(myCourseData.courseList[i]);
            coursesInfo[i] = { ...coursesTitles[i], ...myCourseData.courseList[i] }
        }
        res.status(200).json(coursesInfo)
        //res.status(200).json({...(myCourseData)})

    }
    catch (err) {
        res.status(400).json({ error: err.message })
    }
}
const getMyInfo = async (req, res) => {//this is for the instructor himself
    const id = req._id
    const trainee = await traineeModel.findOne({ '_id': id }, 'name gender -_id').lean()
    const email = await userModel.findOne({ '_id': id }, 'email -_id').lean()
    res.json({ ...trainee, ...email })
}
const editTraineeInfo = async (req, res) => { // adds info for first time instructors
    try {
        const id = req._id;
        const { name, gender, email } = req.body
        if (!name || !gender || !email) { throw new Error('incomplete info') }
        const updatedTrainee = await traineeModel.findOneAndUpdate({ _id: id }, { name, gender }, { new: true, upsert: true })
        await userModel.updateOne({ _id: id }, { email }, { new: true, upsert: true })
        res.status(200).json(updatedTrainee)
    }
    catch (err) {
        res.status(401).json({ error: err.message })

    }
}
const getMyAnswers = async (req, res) => {
    try {
        const { courseId, exerciseId } = req.body
        const courseData = await traineeModel.findOne({ _id: req._id }, { _id: 0, courseList: { $elemMatch: { courseId: courseId } } }).lean()
        const parsedData = await JSON.parse(JSON.stringify(courseData))
        const answers = await (parsedData.courseList[0].exerciseList).find((ex) => {
            console.log(ex.exerciseId, exerciseId, ex.exerciseId === exerciseId);
            return ex.exerciseId === exerciseId
        })
        res.status(200).json(answers)
    }
    catch (err) {
        res.status(401).json({ error: err.message })

    }

}

const viewInstructor = async (req, res) => {
    try {
        const { instructorId } = req.body
        const instructor = await instructorModel.findOne({ _id: instructorId })
        res.status(200).json(instructor)
    }
    catch (err) {
        res.status(401).json({ error: err.message })
    }
}

module.exports = { viewInstructor, addCourseToTrainee, addLessonRecord, addExerciseRecord, addTraineeInfo, myCourses, getMyInfo, editTraineeInfo, getMyAnswers }