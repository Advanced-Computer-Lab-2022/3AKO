const express = require('express')
const { default: mongoose } = require('mongoose')

const {corporateTrainee,course} = require('../models/corporateTraineeModel')

const router = express.Router()

router.post('/', async (req, res) => {
    const {username, password} = req.body

    try {
        const CorporateTrainee = await corporateTrainee.create({username, password}) 
        res.status(200).json(CorporateTrainee)
    }catch(err){
        res.status(400).json({error : err.message})
    }
    // res.send('admin added')
})

router.get('/', async (req,res) => {
    try{
       
        const CorporateTrainee = await corporateTrainee.find({})
        res.status(200).json(CorporateTrainee)
    }catch(err){
        res.status(400).json({error : err.message})
    }
})
router.patch('/:id', async (req,res) => {
    try{
        const {corporateTraineeId} = req.params
        const{courseId} = req.body
        const oldData = await corporateTrainee.find({_id : corporateTraineeId}, {courseList:1, _id:0})
         const newCourse =  {"courseId" : courseId ,"progress" : 0}.json()
        console.log(typeof oldData);
        console.log(oldData);
         oldData.push(newCourse)
        console.log(oldData);
        const newCourseList = await corporateTrainee.findOneAndUpdate({_id:corporateTraineeId}, {courseList: oldData},{new : true} )
         res.status(200).json(newCourseList)
    }catch(err){
        res.status(400).json({error : err.message})
    }
})

module.exports = router