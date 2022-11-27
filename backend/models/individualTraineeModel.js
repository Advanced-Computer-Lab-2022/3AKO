const mongoose = require('mongoose')
const Schema = mongoose.Schema

const individualTraineeSchema = new Schema({
    _id : {
        type : mongoose.ObjectId,
        require : true,
        ref : "trainee"
    }

}, {timestamps : true})

module.exports = mongoose.model('individualTrainee', individualTraineeSchema)
