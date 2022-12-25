const mongoose = require('mongoose')

const Schema = mongoose.Schema
const lessonSchema = mongoose.Schema({
    title : {
        type : String,
        required: true
    },
    description :{
        type : String,
        default :""
    }
    ,
    videoURL :{
        type : String,
        default: ""
    },
    readings :{
        type : String,
        default:""
    },
    position : {
        type : Number,
        required : true 
    }
},{autoCreate : false})

const questionSchema = mongoose.Schema({
    question : {
        type : String,
        require : true
    },
    choice1 : {
            type : String,
            required : true
    },
    choice2 : {
            type : String,
            required : true
    },
    choice3 : {
            type : String,
            required : true 
    },
    choice4 : {
            type : String,
            required : true
    },
    answer : {
        type : Number,
        required : true,
        min : 1,
        max : 4
    }
},{autoCreate : false})

const exerciseSchema = mongoose.Schema({
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

},{autoCreate : false})

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
    exercises : {
        type : [exerciseSchema],
        required : true,
        default : []
    },
    totalHours : {
        type : Number,
        required : true
    }

    
},{autoCreate : false})
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
        }]
    },
    price : {
        type : Number,
        min : 0,
        required : true
    },
    totalHours : {
        type : Number,
        default : 0
    },
    materialCount : {
        type : Number,
        default : 0
    },
    instructorId : {
        type : mongoose.ObjectId,
        required : true
    },
    instructorName : {
        type : String,
        required : true
    },
    promotion :{
        discount : {
            type : Number,
            default : 0,
            min : 0,
            max : 100
        },
        saleEndDate : {
            type : Date,
            default : '2020-01-01'
        }
    },
    adminPromotion :{
        discount : {
            type : Number,
            default : 0,
            min : 0,
            max : 100
        },
        saleEndDate : {
            type : Date,
            default : '2020-01-01'
        }
    },
    numOfViews : {
        type : Number,
        default : 0
    },
    numOfRatings : {
        type : Number,
        default : 0
    },
    imageURL :{
        type : String,
        default : "https://www.google.com/url?sa=i&url=https%3A%2F%2Ftheconversation.com%2Fthe-50-great-books-on-education-24934&psig=AOvVaw2y1QPujW8vq-OTh5Nspo2J&ust=1667236771520000&source=images&cd=vfe&ved=0CA0QjRxqFwoTCJjM8I27iPsCFQAAAAAdAAAAABAE"
    },
    status : {
        type : String,
        default : "unpublished"
    },
    numOfPurchases : {
        type:Number,
        default: 0
    }
    
    
}, {timestamps : true})

const courseModel = mongoose.model('course', courseSchema)
const subtitlesModel = mongoose.model('subtitlesModel', subtitleSchema)
const lessonsModel = mongoose.model('lessonsModel', lessonSchema)
const exerciseModel = mongoose.model('exerciseModel',exerciseSchema)
const questionModel = mongoose.model('questionModel',questionSchema)
module.exports = {courseModel, subtitlesModel, lessonsModel, exerciseModel,questionModel}
