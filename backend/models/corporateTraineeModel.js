const mongoose = require('mongoose')

const Schema = mongoose.Schema

const courseList = new Schema({
    courseId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    progress : {
        type : Number,
        min : 0,
        max : 100,
        default : 0
    },
    exercisesList : {
        type: [{
            exercisesId:{ type : mongoose.ObjectId, ref: 'exercise'}, 
            grade:{ type : Number, required : true},
            answers : {type : [Number],required : true}}]
    },
    lessonsList : {
        type: [{
            lessonId:{ type : mongoose.ObjectId, ref: 'lesson'},
            note:{type : String,default : ""}}]
    }


    

},{autoCreate : false, _id : false})

const corporateTraineeSchema = new Schema({
    _id : {
        type : mongoose.ObjectId,
        require : true,
        ref : "user"
    },
    courseList : {
        type : [courseList],
        default : []
    },
    courseRequests : {
        type : [{
                courseId :{ 
                    type : mongoose.Schema.Types.ObjectId,
                    required : true
                },
                status : {
                    type : String,
                    default : "pendding" 
                }
            }
        ]
    }
    ,
    complaints : {
        type : [mongoose.ObjectId],
        default : []
    },
    gender:{
        type : String,
        required : false
    },
    name:{
        type : String,
        required : true
    }
    
})
const corporateTrainee = mongoose.model('corporateTrainee' , corporateTraineeSchema)
const courseRecordModel = mongoose.model('courseRecordModel' ,courseList) 
module.exports = {
    corporateTrainee,
    courseRecordModel
}