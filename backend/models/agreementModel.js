const mongoose = require('mongoose')

const Schema = mongoose.Schema

const agreementSchema = new Schema({
    traineeAgreement : {
        type : String,
        required : true
    },
    instructorAgreement : {
        type : String,
        required : true

    },
    instructorCut : {
        type : Number,
        min : 1,
        max : 99,
        required : true

    }

}, {timestamps : true})

module.exports = mongoose.model('agreement', agreementSchema)
