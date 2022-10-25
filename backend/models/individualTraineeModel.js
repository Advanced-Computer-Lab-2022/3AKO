const mongoose = require('mongoose')

const Schema = mongoose.Schema

const individualTraineeSchema = new Schema({
    username : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    firstName:{
        type : String,
        required : true
    },
    lastName:{
        type : String,
        required : true
    },
    email:{
        type : String,
        required : true
    },
    gender:{
        type : String,
        required : true
    },
    country:{
        type : String,
        required : true
    },
    //check if the ref syntax work
    //check if the pair work
    coursesIdList :{
        type: [{ type : mongoose.ObjectId, ref: 'course', grade: Number }]
        
    },
    grades :{
        type: [{ type : mongoose.ObjectId, ref: 'quiz', grade: Number }]

    }
}, {timestamps : true})

module.exports = mongoose.model('individualTrainee', individualTraineeSchema)
