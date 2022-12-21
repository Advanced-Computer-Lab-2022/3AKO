const mongoose = require('mongoose')

const Schema = mongoose.Schema

const corporateTraineeSchema = new Schema({
    _id : {
        type : mongoose.ObjectId,
        required : true,
        ref : "trainee"
    },
})
const corporateTrainee = mongoose.model('corporateTrainee' , corporateTraineeSchema)
module.exports = {
    corporateTrainee
}