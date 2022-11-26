const mongoose = require('mongoose')

const Schema = mongoose.Schema

const adminSchema = new Schema({
    _id : {
        type : mongoose.ObjectId,
        require : true,
        ref : "user"
    }
}, {timestamps : true})

module.exports = mongoose.model('admin', adminSchema)
