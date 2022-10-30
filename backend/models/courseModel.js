const mongoose = require('mongoose')

const Schema = mongoose.Schema

const lessonSchema = mongoose.Schema({
    title : {
        type : String,
        required: true
    },
    description :{
        type : String
    }
    ,
    videoURL :{
        type : String,
        required : true
    },
    readings :{
        type : String,
    },
    position : {
        type : Number,
        required : true 
    }
})

const questionSchema = mongoose.Schema({
    question : {
        type : String,
        require : true
    },
    answer1 : {
        value : {
            type : String,
            required : true

        },
        isTrue : {
            type :  Boolean,
            required : true
        }
    },
    answer2 : {
        value : {
            type : String,
            required : true

        },
        isTrue : {
            type :  Boolean,
            required : true
        }
    },
    answer3 : {
        value : {
            type : String,
            required : true

        },
        isTrue : {
            type :  Boolean,
            required : true
        }
    },
    answer4 : {
        value : {
            type : String,
            required : true

        },
        isTrue : {
            type :  Boolean,
            required : true
        }
    }   

})

const excerciseSchema = mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    questions :{
        type : [questionSchema],
        required : true
    },
    position :{
        type : Number,
        required :true
    }

})

const subtitleSchema =mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    lessons :{
        type : [lessonSchema],
        required : true,
        default:[]
    },
    excercises : {
        type : [excerciseSchema],
        required : true,
        default : []
    }

    
})
const courseSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    outlines :{
        type: [String],
        required : true
    },
    summary : {
        type : String,
        required: true

    },
    previewVideo :{
        type : String

    },
    subject : {
        type : String,
        required : true
    },
    subtitles : {
       type : [subtitleSchema],
       required : true,
       default : []
    },
    rating : {
        type : Number,
        min : 0,
        max : 5
    },
    price : {
        type : Number,
        min : 0,
        required : true
    },
    totalHours : {
        type : Number,
        required : true
    },
    instrucrtorId : {
        type : mongoose.ObjectId,
        required : true
    },
    instrucrtorName : {
        type : String
    },
    promotion :{
        sale : {
            type : Number
        },
        byInstructor :{
            type : Boolean
        }
    },
    numOfViews : {
        type : Number,
        required : true,
        default : 0
    },
    imageURL :{
        type : String,
        default : "https://www.google.com/url?sa=i&url=https%3A%2F%2Ftheconversation.com%2Fthe-50-great-books-on-education-24934&psig=AOvVaw2y1QPujW8vq-OTh5Nspo2J&ust=1667236771520000&source=images&cd=vfe&ved=0CA0QjRxqFwoTCJjM8I27iPsCFQAAAAAdAAAAABAE"
    }
    
    
}, {timestamps : true})

module.exports = mongoose.model('course', courseSchema)
