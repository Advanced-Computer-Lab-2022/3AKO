
const individualTraineeModel = require('../models/individualTraineeModel')
const userModel = require("../models/userModel");
const { traineeModel, courseRecordModel } = require('../models/traineeModel')
const { Error } = require('mongoose');
const Stripe = require('stripe')
const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

const jwt = require('jsonwebtoken')
const { courseModel } = require('../models/courseModel');
const instructorModel = require('../models/instructorModel');
const agreementModel = require('../models/agreementModel');
const { refundRequests } = require('../models/refundRequestsModel');

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '1d' })
}

const addIndividualTrainee = async (req, res) => {
  const { username, password, name, email, gender, country } = req.body

  try {
    console.log(username, password, name, email, gender, country);
    if (!(username && password && name && email && gender && country)) { throw new Error('You must fill in all the nessccery fields') }
    const check = await userModel.findOne({ username }, '_id').lean()
    if (check) { throw new Error('This username already exists') }
    const user = await userModel.create({ username, password, email, type: 'trainee', country })
    await traineeModel.create({ _id: user._id, name, gender, type: 'individual trainee' })
    await individualTraineeModel.create({ _id: user._id })
    const token = createToken(user._id)
    res.cookie('jwt', token, { httpOnly: true, maxAge: 86400 * 1000 });
    res.status(200).json({ type: 'individual trainee', name })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}
const checkout = async (req, res) => {
  try {
    const { courseId } = req.body
    console.log(courseId);
    const id = req._id
    const courseData = await courseModel.findOne({ _id: courseId }, 'title instructorId price promotion adminPromotion imageURL -_id').lean()
    let price = courseData.price
    // if(courseData.promotion) price = (new Date(courseData.promotion.saleEndDate)<new Date())? courseData.price:courseData.price-courseData.promotion.discount/100*courseData.price
    let discount = !courseData.promotion ? 0 : (new Date(courseData.promotion.saleEndDate) > new Date()) ? courseData.promotion.discount : 0
    const adminDiscount = !courseData.adminPromotion ? 0 : (new Date(courseData.adminPromotion.saleEndDate) > new Date()) ? courseData.adminPromotion.discount : 0
    if (discount < adminDiscount) discount = adminDiscount
    let coupon = { _id: 50 }
    if (discount > 0) coupon = await stripe.coupons.create({ percent_off: discount, duration: 'once' });
    console.log(coupon);
    const traineeData = await individualTraineeModel.findOne({ _id: id }, 'wallet stripeId -_id').lean()
    const wallet = traineeData.wallet || 0
    let stripeId = traineeData.stripeId
    if (!stripeId) {
      const customer = await stripe.customers.create(({
        metadata: {
          userId: id
        }
      }))
      stripeId = customer.id
      await individualTraineeModel.updateOne({ _id: id }, { stripeId }, { new: true, upsert: true })
    }
    console.log({ price, wallet });
    if (price > wallet) {
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: courseData.title,
                images: [courseData.imageURL],
                description: courseData.title,
                metadata: {
                  courseId: courseId
                }
              },
              unit_amount: (price - wallet) * 100,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        discounts: [discount === 0 ? {} : {
          coupon: coupon.id,
        }],
        customer: stripeId,
        metadata: {
          courseId: courseId
        },
        success_url: `${process.env.FRONT_END_URL}/checkout-success/${courseId}`,
        cancel_url: `${process.env.FRONT_END_URL}/checkout/${courseId}`,
      });
      res.status(200).send({ url: session.url });
    }
    else {
      // collect the price first
      await individualTraineeModel.updateOne({ _id: id }, { $inc: { wallet: (-price) }, $push: { payments: { courseId, purchaseDate: new Date(), status: 'completed', method: 'wallet', amount: price } } })
      // add coures record to trainee
      const newCourseRecord = await new courseRecordModel({ courseId: courseId })
      await traineeModel.updateOne({ _id: id }, { $addToSet: { courseList: newCourseRecord } }, { new: true, upsert: true })
      // update the number of purchases for the course
      await courseModel.updateOne({ _id: courseId }, { $inc: { numOfPurchases: 1 } })
      // get the instructor percentage of the payment
      const precentageData = await agreementModel.findOne({}, 'instructorCut -_id').lean()
      const percentage = precentageData.instructorCut
      // check if the instructor has a record for the current month
      const now = new Date()
      const date = new Date(now.getFullYear(), now.getMonth(), 1)
      const instructorData = await instructorModel.findOne({ _id: courseData.instructorId }, { earnings: 1, _id: 0, rating: 0, courses: 0, name: 0, gender: 0, biography: 0, consent: 0, reviews: 0, earnings: { $elemMatch: { startDate: date.toISOString() } } })
      // add the amount owed for the instructor to the current month earnings record if exists
      if (instructorData) {
        await instructorModel.updateOne({ _id: courseData.instructorId, 'earnings.startDate': date }, { $inc: { 'earnings.sum': percentage / 100 * price } })
      }
      else { // create a record for the month and add the owed amount to it if one does not exist
        await instructorModel.updateOne({ _id: courseData.instructorId }, { $push: { earnings: { startDate: date, sum: percentage / 100 * price } } })
      }
      res.status(200).send({ completed: true })
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message })
  }
}
const getMyData = async (req, res) => {
  try {
    const id = req._id
    const data = await individualTraineeModel.findOne({ _id: id }, 'wallet -_id')
    res.status(200).json(data)

  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const createPayment = async (req, res) => {
  try {
    const { courseId } = req.body
    const id = req._id
    const courseData = await courseModel.findOne({ _id: courseId }, 'price promotion adminPromotion -_id').lean()
    let price = courseData.price

    let discount = !courseData.promotion ? 0 : (new Date(courseData.promotion.saleEndDate) > new Date()) ? courseData.promotion.discount : 0
    const adminDiscount = !courseData.adminPromotion ? 0 : (new Date(courseData.adminPromotion.saleEndDate) > new Date()) ? courseData.adminPromotion.discount : 0
    if (discount < adminDiscount) discount = adminDiscount
    //if(courseData.promotion) price = (new Date(courseData.promotion.saleEndDate)<new Date())? courseData.price:courseData.price-courseData.promotion.discount/100*courseData.price
    if (discount > 0) price = price - price * discount / 100

    const traineeData = await individualTraineeModel.findOne({ _id: id }, 'wallet stripeId -_id').lean()
    const wallet = traineeData.wallet || 0

    if (price <= wallet) {
      res.status(400).json({ error: "You don't need to pay with card" })
    }
    else if (wallet === 0) {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: price * 100,
        currency: 'usd',
        payment_method_types: ['card'],
        metadata: {
          courseId: courseId,
          traineeId: id,
          method: "card",
          amountFromWallet: 0
        }
      })
      res.status(200).json({ method: 'card', clientSecret: paymentIntent.client_secret, paymentIntentId: paymentIntent.id })
    }
    else {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: (price - wallet) * 100,
        currency: 'usd',
        payment_method_types: ['card'],
        metadata: {
          courseId: courseId,
          traineeId: id,
          method: "mixed",
          amountFromWallet: wallet
        }
      })
      res.status(200).json({ method: 'mixed', clientSecret: paymentIntent.client_secret, paymentIntentId: paymentIntent.id })
    }
  }
  catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message })
  }
}

const payWithWallet = async (req, res) => {
  try {
    const { courseId } = req.body
    const id = req._id
    const courseData = await courseModel.findOne({ _id: courseId }, 'price promotion adminPromotion instructorId -_id').lean()
    let price = courseData.price

    let discount = !courseData.promotion ? 0 : (new Date(courseData.promotion.saleEndDate) > new Date()) ? courseData.promotion.discount : 0
    const adminDiscount = !courseData.adminPromotion ? 0 : (new Date(courseData.adminPromotion.saleEndDate) > new Date()) ? courseData.adminPromotion.discount : 0
    if (discount < adminDiscount) discount = adminDiscount
    //if(courseData.promotion) price = (new Date(courseData.promotion.saleEndDate)<new Date())? courseData.price:courseData.price-courseData.promotion.discount/100*courseData.price
    if (discount > 0) price = price - price * discount / 100

    const traineeData = await individualTraineeModel.findOne({ _id: id }, 'wallet stripeId -_id').lean()
    const wallet = traineeData.wallet || 0

    if (wallet >= price) {
      // collect the price first
      await individualTraineeModel.updateOne({ _id: id }, { $inc: { wallet: (-price) }, $push: { payments: { courseId, purchaseDate: new Date(), status: 'completed', method: 'wallet', amount: price, paymentIntentId: '' } } })
      // add coures record to trainee
      const newCourseRecord = await new courseRecordModel({ courseId: courseId })
      const check = await traineeModel.findOne({ _id: id }, { courseList: { $elemMatch: { courseId: courseId } } }).lean()
      if (check && check.courseList && check.courseList.length !== 0) {
        console.log("course readded");
        await traineeModel.updateOne({ _id: id, 'courseList.courseId': courseId }, { 'courseList.$.status': "active" }, { new: true, upsert: true });
      }
      else {
        console.log("course added");
        await traineeModel.updateOne({ _id: id }, { $addToSet: { courseList: newCourseRecord } }, { new: true, upsert: true })
        await courseModel.updateOne({ _id: courseId }, { $inc: { numOfPurchases: 1 } })
      }
      // get the instructor percentage of the payment
      const precentageData = await agreementModel.findOne({}, 'instructorCut -_id').lean()
      const percentage = precentageData.instructorCut
      // check if the instructor has a record for the current month
      const now = new Date()
      const date = new Date(now.getFullYear(), now.getMonth(), 1)
      const instructorData = await instructorModel.findOne({ _id: courseData.instructorId }, { earnings: 1, _id: 0, rating: 0, courses: 0, name: 0, gender: 0, biography: 0, consent: 0, reviews: 0, earnings: { $elemMatch: { startDate: date.toISOString() } } })
      // add the amount owed for the instructor to the current month earnings record if exists
      if (instructorData) {
        await instructorModel.updateOne({ _id: courseData.instructorId, 'earnings.startDate': date }, { $inc: { 'earnings.$.sum': percentage / 100 * price } }, { new: true, upsert: true })
      }
      else { // create a record for the month and add the owed amount to it if one does not exist
        await instructorModel.updateOne({ _id: courseData.instructorId }, { $push: { earnings: { startDate: date, sum: percentage / 100 * price } } })
      }
      res.status(200).send({ completed: true })
    }
    else {
      res.status(400).json({ message: "You don't have enough money in your wallet for the purchase" })
    }

  }
  catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message })
  }
}

const payWithCard = async (req, res) => {
  try {
    const { courseId, paymentIntentId } = req.body
    if (!courseId || !paymentIntentId) throw new Error("invalid request")
    const id = req._id
    const courseData = await courseModel.findOne({ _id: courseId }, 'price promotion adminPromotion instructorId -_id').lean()
    let price = courseData.price

    let discount = !courseData.promotion ? 0 : (new Date(courseData.promotion.saleEndDate) > new Date()) ? courseData.promotion.discount : 0
    const adminDiscount = !courseData.adminPromotion ? 0 : (new Date(courseData.adminPromotion.saleEndDate) > new Date()) ? courseData.adminPromotion.discount : 0
    if (discount < adminDiscount) discount = adminDiscount
    if (discount > 0) price = price - price * discount / 100

    const traineeData = await individualTraineeModel.findOne({ _id: id }, 'wallet stripeId -_id').lean()
    const wallet = traineeData.wallet || 0

    if (wallet === 0) {
      await stripe.paymentIntents.retrieve(paymentIntentId).then((payment) => {
        if (payment.metadata.courseId.toString() === courseId.toString() && payment.metadata.method.toString() === "card" && payment.metadata.traineeId.toString() === id.toString() && payment.status === 'succeeded' && payment.amount_received === price * 100) {
          const execute = async () => {
            try {
              // collect the price first
              await individualTraineeModel.updateOne({ _id: id }, { $push: { payments: { courseId, purchaseDate: new Date(), status: 'completed', method: 'card', amount: price, paymentIntentId: paymentIntentId } } })
              // add coures record to trainee
              const newCourseRecord = await new courseRecordModel({ courseId: courseId })
              const check = await traineeModel.findOne({ _id: id }, { courseList: { $elemMatch: { courseId: courseId } } }).lean()
              if (check && check.courseList && check.courseList.length !== 0) {
                await traineeModel.updateOne({ _id: id, 'courseList.courseId': courseId }, { 'courseList.$.status': "active" }, { new: true, upsert: true });
              }
              else {

                await traineeModel.updateOne({ _id: id }, { $addToSet: { courseList: newCourseRecord } }, { new: true, upsert: true })
                await courseModel.updateOne({ _id: courseId }, { $inc: { numOfPurchases: 1 } })
              }
              // update the number of purchases for the course
              // get the instructor percentage of the payment
              const precentageData = await agreementModel.findOne({}, 'instructorCut -_id').lean()
              const percentage = precentageData.instructorCut
              // check if the instructor has a record for the current month
              const now = new Date()
              const date = new Date(now.getFullYear(), now.getMonth(), 1)
              const instructorData = await instructorModel.findOne({ _id: courseData.instructorId }, { earnings: { $elemMatch: { startDate: date.toISOString() } } })
              // add the amount owed for the instructor to the current month earnings record if exists
              if (instructorData.earnings.length) {
                await instructorModel.updateOne({ _id: courseData.instructorId, 'earnings.startDate': date }, { $inc: { 'earnings.$.sum': percentage / 100 * price } }, { new: true, upsert: true })
              }
              else { // create a record for the month and add the owed amount to it if one does not exist
                await instructorModel.updateOne({ _id: courseData.instructorId }, { $push: { earnings: { startDate: date, sum: percentage / 100 * price } } }, { new: true, upsert: true })
              }
              return res.status(200).send({ completed: true })
            }
            catch (err) {
              console.log(err);
            }
          }
          execute()
        }
      }).catch((error) => {
        console.log(error);
        throw new Error("invalid payment intent")
      })
    }
    else {
      await stripe.paymentIntents.retrieve(paymentIntentId).then((payment) => {
        if (payment.metadata.courseId.toString() === courseId.toString() && payment.metadata.method.toString() === "mixed" && payment.metadata.traineeId.toString() === id.toString() && payment.status === 'succeeded' && payment.amount_received === (price - wallet) * 100) {
          const execute = async () => {
            try {
              // add payment record and set wallet to 0
              await individualTraineeModel.updateOne({ _id: id }, { wallet: 0, $push: { payments: { courseId, purchaseDate: new Date(), status: 'completed', method: 'mixed', amount: price, paymentIntentId: paymentIntentId } } })
              // add coures record to trainee
              const newCourseRecord = await new courseRecordModel({ courseId: courseId })
              await traineeModel.updateOne({ _id: id }, { $addToSet: { courseList: newCourseRecord } }, { new: true, upsert: true })
              // update the number of purchases for the course
              await courseModel.updateOne({ _id: courseId }, { $inc: { numOfPurchases: 1 } })
              // get the instructor percentage of the payment
              const precentageData = await agreementModel.findOne({}, 'instructorCut -_id').lean()
              const percentage = precentageData.instructorCut
              // check if the instructor has a record for the current month
              const now = new Date()
              const date = new Date(now.getFullYear(), now.getMonth(), 1)
              const instructorData = await instructorModel.findOne({ _id: courseData.instructorId }, { earnings: { $elemMatch: { startDate: date.toISOString() } } })
              // add the amount owed for the instructor to the current month earnings record if exists
              if (instructorData.earnings.length) {
                await instructorModel.updateOne({ _id: courseData.instructorId, 'earnings.startDate': date }, { $inc: { 'earnings.$.sum': percentage / 100 * price } }, { new: true, upsert: true })
              }
              else { // create a record for the month and add the owed amount to it if one does not exist
                await instructorModel.updateOne({ _id: courseData.instructorId }, { $push: { earnings: { startDate: date, sum: percentage / 100 * price } } }, { new: true, upsert: true })
              }
              return res.status(200).json({ completed: true })
            }
            catch (err) {
              console.log(err);
            }
          }
          execute()
        }
      }).catch((error) => {
        throw new Error("invalid payment intent")
      })
    }

  }
  catch (err) {
    res.status(401).json({ error: err.message })
  }
}

const checkBeforeProceed = async (req, res) => {
  try {
    const { courseId, paymentIntentId } = req.body
    const id = req._id
    const courseData = await courseModel.findOne({ _id: courseId }, 'price promotion adminPromotion -_id').lean()
    let price = courseData.price

    let discount = !courseData.promotion ? 0 : (new Date(courseData.promotion.saleEndDate) > new Date()) ? courseData.promotion.discount : 0
    const adminDiscount = !courseData.adminPromotion ? 0 : (new Date(courseData.adminPromotion.saleEndDate) > new Date()) ? courseData.adminPromotion.discount : 0
    if (discount < adminDiscount) discount = adminDiscount
    if (discount > 0) price = price - price * discount / 100

    const traineeData = await individualTraineeModel.findOne({ _id: id }, 'wallet stripeId -_id').lean()
    const wallet = (traineeData.wallet || 0)
    await stripe.paymentIntents.retrieve(paymentIntentId).then((payment) => {
      if (payment.metadata.courseId.toString() === courseId.toString() && payment.metadata.traineeId.toString() === id.toString() && payment.status === "requires_payment_method") {
        if (payment.metadata.method === 'card' && payment.metadata.amountFromWallet == 0) {
          if (wallet === 0) {
            if (payment.amount === price * 100) {
              res.status(200).json({ message: "All is well" })
            }
            else {
              res.status(400).json({ error: "Course price has been updated" })
            }
          }
          else {
            res.status(400).json({ error: "your wallet has money" })
          }
        }
        else if (payment.metadata.method === 'mixed' && payment.metadata.amountFromWallet == wallet) {
          if (payment.amount === (price - wallet) * 100 && wallet !== 0) {
            res.status(200).json({ message: "All is well" })
          }
          else {
            res.status(400).json({ error: "you need to refresh the page" })
          }
        }

      }
      else {
        throw new Error("the payment intent is for a different course or different trainee")
      }
    }).catch((error) => {
      res.status(400).json(error)
    })
  }
  catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const test = async (req, res) => {
  try {
    const { courseId } = req.body
    const id = req._id
    const courseData = await courseModel.findOne({ _id: courseId }, 'price promotion adminPromotion instructorId -_id').lean()
    let price = courseData.price

    let discount = !courseData.promotion ? 0 : (new Date(courseData.promotion.saleEndDate) > new Date()) ? courseData.promotion.discount : 0
    const adminDiscount = !courseData.adminPromotion ? 0 : (new Date(courseData.adminPromotion.saleEndDate) > new Date()) ? courseData.adminPromotion.discount : 0
    if (discount < adminDiscount) discount = adminDiscount
    if (discount > 0) price = price - price * discount / 100

    const precentageData = await agreementModel.findOne({}, 'instructorCut -_id').lean()
    const percentage = precentageData.instructorCut
    const now = new Date()
    const date = new Date(now.getFullYear(), now.getMonth(), 1)
    const instructorData = await instructorModel.findOne({ _id: courseData.instructorId }, { earnings: 1, _id: 0, rating: 0, courses: 0, name: 0, gender: 0, biography: 0, consent: 0, reviews: 0, earnings: { $elemMatch: { startDate: date.toISOString() } } })
    console.log({ instructorData, percentage, id: courseData.instructorId, courseData });
    // add the amount owed for the instructor to the current month earnings record if exists
    console.log(instructorData.earnings.length);
    if (instructorData.earnings.length) {
      const newData = await instructorModel.updateOne({ _id: courseData.instructorId, 'earnings.startDate': date }, { $inc: { 'earnings.$.sum': percentage / 100 * price } }, { new: true, upsert: true })
      res.status(200).json(newData)

    }
    else { // create a record for the month and add the owed amount to it if one does not exist
      const newData = await instructorModel.updateOne({ _id: courseData.instructorId }, { $push: { earnings: { startDate: date, sum: percentage / 100 * price } } }, { new: true, upsert: true })
      res.status(200).json(newData)

    }

  }
  catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message })
  }
}

const requestRefund = async (req, res) => {
  try {
    const id = req._id
    const { courseId } = req.body
    if (!courseId) throw new Error("courseId is required")
    const data = await individualTraineeModel.findOne({ _id: id }, { wallet: 0, _id: 0, payments: { $elemMatch: { courseId: courseId, status: 'completed' } } }).lean()
    if (data && data.payments && data.payments[0]) {
      const progress = await traineeModel.findOne({ _id: id }, { courseList: { $elemMatch: { courseId: courseId } } })
      console.log("progressssssssssssssssssssssssssssssssssssssssss" + progress.courseList[0].progress);
      const traineeData = await userModel.findOne({ _id: id }, 'username -_id').lean()
      const courseData = await courseModel.findOne({ _id: courseId }, 'title -_id').lean()
      const thisRequested = await refundRequests.findOne({ traineeId: id, courseId: courseId, courseTitle: courseData.title })
      if (!thisRequested) {
        await refundRequests.create({ traineeId: id, traineeUserName: traineeData.username, courseId: courseId, courseTitle: courseData.title, status: "pending", progress: progress.courseList[0].progress })
        res.status(200).json({ message: "request successful" })
      }
      else {
        res.status(200).json({ message: "fail" })

      }
    }
    else {
      throw new Error("You do now own this course")
    }
  }
  catch (err) {
    console.log(err);
    res.status(401).json({ error: err.message })
  }
}


module.exports = { addIndividualTrainee, checkout, getMyData, createPayment, payWithCard, payWithWallet, checkBeforeProceed, test, requestRefund }