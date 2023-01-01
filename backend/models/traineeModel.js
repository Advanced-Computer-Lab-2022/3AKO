const mongoose = require('mongoose')

const Schema = mongoose.Schema

const courseList = new Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    progress: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
    },
    exerciseList: {
        type: [{
            exerciseId: { type: mongoose.ObjectId, ref: 'exercise' },
            grade: { type: Number, required: true },
            answers: { type: [Number], required: true }
        }]
    },
    lessonsList: {
        type: [{
            lessonId: { type: mongoose.ObjectId, ref: 'lesson' },
            note: { type: String, default: "" }
        }]
    },
    status: {
        type: String,
        default: "active"
    }
}, { autoCreate: false, _id: false })

const traineeSchema = new Schema({
    _id: {
        type: mongoose.ObjectId,
        require: true,
        ref: "user"
    },
    courseList: {
        type: [courseList],
        default: []
    },
    complaints: {
        type: [mongoose.ObjectId],
        default: []
    },
    gender: {
        type: String,
        required: false
    },
    name: {
        type: String,
        default: ""
    },
    type: {
        type: String,
        required: true
    },
    profileImag: {
        type: String
    }
})
const traineeModel = mongoose.model('trainee', traineeSchema)
const courseRecordModel = mongoose.model('courseRecordModel', courseList)
module.exports = {
    traineeModel,
    courseRecordModel
}