
const individualTraineeModel = require('../models/individualTraineeModel')



const addIndividualTrainee = async (req, res) => {
    const {username, password, firstName, lastName, email, gender, country, coursesList} = req.body

    try {
        const individualTrainee = await individualTraineeModel.create({username, password, firstName, lastName, email, gender, country, coursesList}) 
        res.status(200).json(individualTrainee)
    }catch(err){
        res.status(400).json({error : err.message})
    }
}


module.exports = {addIndividualTrainee}