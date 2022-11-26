const mongoose = require('mongoose')

const Schema = mongoose.Schema

const complaintSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    body : {
        type : String,
        require : true
    },
    userId : {
        type : mongoose.ObjectId,
        required : true
    },
    followUps : {
        type : [String],
        default : []
    },
    status : {
        type : String,
        default : "pending"
    },
    reportedCourse :{
        type : mongoose.ObjectId,
        required : true
    },
    seenBy :{
        type : [mongoose.ObjectId],
        default : []
    }
}, {timestamps : true})

module.exports = mongoose.model('complaint', complaintSchema)