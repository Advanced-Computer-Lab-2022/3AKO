const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    username : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    type : {
        type : String,
        required : true
    },
    email : {
        type : String,
        default : ""
    },
    country : {
        type : String,
        default : ""
    }

}, {timestamps : true})

module.exports = mongoose.model('user', userSchema)
