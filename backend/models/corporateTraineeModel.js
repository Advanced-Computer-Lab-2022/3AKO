const mongoose = require('mongoose')

const Schema = mongoose.Schema

const corporateTraineeSchema = new Schema({
    _id : {
        type : mongoose.ObjectId,
        required : true,
        ref : "trainee"
    },
    courseRequests : {
        type : [{
                courseId :{ 
                    type : mongoose.Schema.Types.ObjectId,
                    required : true
                },
                status : {
                    type : String,
                    default : "pendding" 
                }
            }
        ],
        default : []
    }
})
const corporateTrainee = mongoose.model('corporateTrainee' , corporateTraineeSchema)
module.exports = {
    corporateTrainee
}