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

const quizSchema = mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    questions :{
        type : [questionSchema],
        required : true
    }

})

const subtitleSchema =mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    lessons :{
        type : [lessonSchema,quizSchema],
        required : true
    }

    
})
const courseSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    outline :{
        type: String,
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
       required : true
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
        // required : true
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
        default : 0,
    }
    
    
}, {timestamps : true})

module.exports = mongoose.model('course', courseSchema)
