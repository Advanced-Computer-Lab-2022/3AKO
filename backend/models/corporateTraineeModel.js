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
    //3ayzen course list kman lel pending courses
    courseList : {
        type : [courseList],
        default : []
    },
    //leeh el notes hena 3nd el user nafso, mesh gowa el course list. 3ayzeen access el lessons mn hena 
    notes : {
        type : [String],
        default : []
    },
    //el complaints hena elmafrod tkon bt-reference el complaints elly el admin hayshofha 
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