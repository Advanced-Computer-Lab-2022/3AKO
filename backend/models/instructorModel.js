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
        type : [{ type : mongoose.Types.ObjectId, ref: 'course' }],
        required : true,
        default : []
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    name : {
        type : String,
        required : false
    },
    gender : {
        type : String,
        required : false
    },
    country : {
        type : String,
        required : false
    },
    rating : {
        type : Number,
        required : false,
        max : 5,
        min : 0,
        default : 0
    },
    biography :{
        type : String,
        default : ""
    }

}, {timestamps : true})

module.exports = mongoose.model('instructor', instructorSchema)
