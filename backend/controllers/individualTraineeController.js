
const individualTraineeModel = require('../models/individualTraineeModel')
const userModel = require("../models/userModel");
const {traineeModel} = require('../models/traineeModel')
const { Error } = require('mongoose');
const Stripe = require('stripe')
const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

const jwt = require('jsonwebtoken')

const createToken= (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn :'1d'})
}

const addIndividualTrainee = async (req, res) => {
    const {username, password, name, email, gender, country} = req.body

    try {
        console.log(username, password, name, email, gender, country);
        if(!(username && password && name && email && gender && country)){ throw new Error('You must fill in all the nessccery fields')}
        const check = await userModel.findOne({username},'_id').lean()
        if(check){ throw new Error('This username already exists')}
        const user = await userModel.create({username,password,email,type:'trainee',country})
        await traineeModel.create({_id:user._id ,name, gender,type:'individual trainee'}) 
        await individualTraineeModel.create({_id:user._id})
        const token = createToken(user._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: 86400 * 1000 });
        res.status(200).json({type:'individual trainee',name})
    }catch(err){
        res.status(400).json({error : err.message})
    }
}
const payment = async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'T-shirt',
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.FRONT_END_URL}/payment-success`,
    cancel_url: `${process.env.FRONT_END_URL}`,
  });

  res.status(200).send({url:session.url});
}


module.exports = {addIndividualTrainee}