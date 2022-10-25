const mongoose = require('mongoose')

const courseModel = require('../models/courseModel')

const getAllCoures = async (req, res) => {
    const allCoures = await courseModel.find({})
    res.send(allCoures)
}

const filterOnSubject = async (req, res) => {
    const {subject} = req.body
    const courses = await courseModel.find({'subject' : subject})
    res.send(courses)
}

const filterOnRating = async (req, res) => {
    const {minRating, maxRating} = req.body
    const courses = await courseModel
        .find({$and : [{'rating' : {$gt : minRating}}, {'rating' : {$lt : maxRating}}]})
    res.send(courses)
}

module.exports = {
    getAllCoures,
    filterOnSubject,
    filterOnRating 
}