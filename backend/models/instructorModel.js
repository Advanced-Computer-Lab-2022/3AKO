const mongoose = require('mongoose')

const Schema = mongoose.Schema

const instructorSchema = new Schema({
    _id : {
        type : mongoose.ObjectId,
        require : true,
        ref : "user"
    },
    courses : {
        type : [{ type : mongoose.Types.ObjectId, ref: 'course' }],
        required : true,
        default : []
    },
    name : {
        type : String,
        default : ""
    },
    gender : {
        type : String,
        default : ""
    },
    rating : {
        1:{
            type : Number,
            default : 0
        },
        2:{
            type : Number,
            default : 0
        },
        3:{
            type : Number,
            default : 0
        },
        4:{
            type : Number,
            default : 0
        },
        5:{
            type : Number,
            default : 0
        },
        total : {
            type : Number,
            default : 0
        }
    },
    reviews :{
        type : [{
            rating : {
                type : Number,
                min : 1,
                max : 5,
                required : true
            },
            comment : {
                type : String,
                default : ""
            },
            reviewerId : {
                type : mongoose.ObjectId,
                required : true
            }
        }],
        default : []
    },
    biography :{
        type : String,
        default : ""
    },
    consent : {
        type : Boolean,
        default : false
    },
    earnings : {
        type : [{
            startDate : {
                type : Date,
                required : true
            },
            sum : {
                type : Number,
                min : 0,
                required : true
            }
        }],
        default : []
    }

}, {timestamps : true})

module.exports = mongoose.model('instructor', instructorSchema)
