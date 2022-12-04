const mongoose = require('mongoose')
const Schema = mongoose.Schema

const passwordTokenSchema = new Schema({
    _id : {
        type : mongoose.ObjectId,
        required : true,
        ref : "trainee"
    },
    token : {
        type : String,
        required : true
    },
    expiration : {
        type : Date,
        required : true
    }
},)

module.exports = mongoose.model('passwordToken', passwordTokenSchema)
