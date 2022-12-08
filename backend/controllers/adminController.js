
const adminModel = require('../models/adminModel')
const userModel = require("../models/userModel");
const { Error } = require('mongoose');

const addAdmin = async (req, res) => {
    const {username, password} = req.body
    try {
        const check = await userModel.findOne({username},'_id').lean()
        if(check){ throw new Error('This username already exists')}
        const user = await userModel.create({username,password,type:'admin'})
        const admin = await adminModel.create({_id:user._id})
        res.status(200).json(admin)
    }catch(error){
        res.status(400).json({error : error.message})
    }
}


module.exports = {addAdmin}