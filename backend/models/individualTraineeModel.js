const mongoose = require('mongoose')
const Schema = mongoose.Schema

const individualTraineeSchema = new Schema({
    _id : {
        type : mongoose.ObjectId,
        require : true,
        ref : "user"
    },
    name:{
        type : String,
        required : true
    },
    gender:{
        type : String,
        required : false
    },
    coursesList :{
        type: [{
            courseId:{ type : mongoose.ObjectId, ref: 'course'},

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
            }, 
            progress: {type : Number, min : 0, max : 100, default : 0}
            }]
    },
    complaints :{
        type : [mongoose.ObjectId],
        default : []
    }
}, {timestamps : true})

module.exports = mongoose.model('individualTrainee', individualTraineeSchema)
