const mongoose = require('mongoose')

const Schema = mongoose.Schema

const instructorSchema = new Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    courses : {
        type : [{ type : ObjectId, ref: 'courseModel' }],
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    gender : {
        type : String,
        required : true
    },
    country : {
        type : String,
        required : true
    },
    rating : {
        type : Number,
        required : true,
        max : 5,
        min : 0,
        default : 0
    }

}, {timestamps : true})

module.exports = mongoose.model('instructor', instructorSchema)
