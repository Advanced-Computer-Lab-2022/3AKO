const mongoose = require('mongoose')
const Schema = mongoose.Schema

const individualTraineeSchema = new Schema({
    _id : {
        type : mongoose.ObjectId,
        required : true,
        ref : "trainee"
    },
    wallet : {
        type : Number,
        default : 0
    },
    payments : {
        type : [{
            courseId : {
                type : mongoose.ObjectId,
                required : true
            },
            purchaseDate : {
                type : Date,
                required : true
            },
            status  : {
                type : String,
                default : 'completed'
            },
            method : {
                type : String,
                required : true
            },
            amount : {
                type : Number,
                min : 0,
                required : true
            },
            paymentIntentId : {
                type : String,
                default : ''
            }
        }],
        default : []
    }

}, {timestamps : true})

module.exports = mongoose.model('individualTrainee', individualTraineeSchema)
