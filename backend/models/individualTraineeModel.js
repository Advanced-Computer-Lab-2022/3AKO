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
    name:{
        type : String,
        required : true
    },
    email:{
        type : String,
        required : true
    },
    gender:{
        type : String,
        required : false
    },
    // remove country ??
    country:{
        type : String,
        required : true
    },


    //check if the ref syntax work
    coursesList :{
        type: [{courseId:{ type : mongoose.ObjectId, ref: 'course'},

                exercisesList:{type: [{exercisesId:{ type : mongoose.ObjectId, ref: 'exercise'}, grade: Number, _id:false} ]}, 

                lessonsList:{type: [{type : mongoose.ObjectId, ref: 'lesson'}]}, 

                progress: Number,
                _id: false
            }]
    }
}, {timestamps : true})

module.exports = mongoose.model('individualTrainee', individualTraineeSchema)
