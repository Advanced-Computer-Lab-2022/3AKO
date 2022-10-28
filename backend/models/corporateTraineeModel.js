const mongoose = require('mongoose')

const Schema = mongoose.Schema
const courseModel = require('../models/courseModel')

const courseList = new Schema({
    courseId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    progress : {
        type : Number,
        default : 0
    },
    exercisesList : {
        type: [{
            exercisesId:{ type : mongoose.ObjectId, ref: 'exercise'}, 
            grade:{ type : Number, required : true}}]
    },
    lessonsList : {
        type: [{type : mongoose.ObjectId, ref: 'lesson'}]
    }


    

},{autoCreate : false, _id : false})

const corporateTraineeSchema = new Schema({
    username : {
        type : String,
        require : true
    },
    password : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : false
    },
    courseList : {
        type : [courseList],
        default : []
    },
    pendingRequests : {
        type : [
            {
                courseId :{ 
                    type : mongoose.Schema.Types.ObjectId,
                    required : true
                },
                status : {
                    type : String,
                    default : "pendding" 
                },
                _id : false
        }
        ]
    }
    ,
    notes : {
        type : [String],
        default : []
    },
    complaints : {
        type : [String],
        default : []
    }
    
})
const corporateTrainee = mongoose.model('corporateTrainee' , corporateTraineeSchema)
const course = mongoose.model('Course' ,courseList) 
module.exports = {
    corporateTrainee,
    course
}