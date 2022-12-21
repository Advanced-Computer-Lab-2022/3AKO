const mongoose = require('mongoose')

const Schema = mongoose.Schema

const corporateRequestsSchema = new Schema({
    corporateId : {
        type : mongoose.ObjectId,
        required : true,
        ref : "corporateTrainee"
    },
    corporateUserName : {
        type : String,
        required : true
    }
    ,
    courseId :{
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    courseTitle : {
        type : String,
        required : true
    },
    status : {
        type : String,
        default : "pendding" 
    }
}, {timestamps : true})
const corporateRequests = mongoose.model('corporateRequests' , corporateRequestsSchema)
module.exports = {
    corporateRequests
}