const mongoose = require('mongoose')
const { Error } = require('mongoose');
const userModel = require("../models/userModel");
const { traineeModel } = require('../models/traineeModel')
const instructorModel = require("../models/instructorModel");
const adminModel = require('../models/adminModel')
const passwordTokenModel = require('../models/passwordTokenModel')
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken')

let testAccount = ''
let transporter = ''
const initalizeMailer = async () => {
    try {
        testAccount = await nodemailer.createTestAccount();
        transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            auth: {
                user: process.env.email,
                pass: process.env.password,
            },
        });
    } catch (err) {
        console.log({ error: "nodemailer not connected" });
    }
}
initalizeMailer()
const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '1d' })
}

const types = ['admin', 'individual trainee', 'corporate trainee', 'instrcutor']
const editPassword = async (req, res) => {
    try {
        const id = req._id;
        const { oldPassword, newPassword } = req.body
        const passwordObj = await userModel.findOne({ _id: id }, 'password -_id').lean()
        const password = JSON.parse(JSON.stringify(passwordObj)).password
        if (oldPassword === password) {
            const updatedTrainee = await userModel.findOneAndUpdate({ _id: id }, { password: newPassword }, { new: true, upsert: true })
            res.status(200).json(updatedTrainee)
        }
        else {
            res.status(400).json({ error: "Wrong Password" })
        }
    }
    catch (err) {
        res.status(400).json({ error: err.message })
    }
}
const editEmail = async (req, res) => {
    try {
        const id = req._id;
        const { email } = req.body
        const updatedUser = await userModel.findOneAndUpdate({ _id: id }, { email }, { new: true, upsert: true })
        res.status(200).json(updatedUser)
    }
    catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body
        if (!username || !password) {
            throw new Error("Must fill username and password")
        }
        const user = await userModel.findOne({ username }).lean()
        if (!user) {
            throw new Error("Invalid username")
        }

        if (user.password === password) {
            const token = createToken(user._id)
            if (user.type === 'trainee') {
                res.cookie('jwt', token, { httpOnly: true, maxAge: 86400 * 1000 });
                const trainee = await traineeModel.findOne({ _id: user._id }, 'name type courseList.courseId courseList.status -_id').lean()
                res.status(200).json(trainee)
            }
            else if (user.type === 'instructor') {
                res.cookie('jwt', token, { httpOnly: true, maxAge: 86400 * 1000 });
                const instrucrtor = await instructorModel.findOne({ _id: user._id }, 'name').lean()
                res.status(200).json({ ...instrucrtor, type: "instructor" })
            }
            else if (user.type === 'admin') {
                res.cookie('jwt', token, { httpOnly: true, maxAge: 86400 * 1000 });
                const admin = await adminModel.findOne({ _id: user._id }).lean()
                res.status(200).json({ type: "admin" })
            }
            else {
                res.status(401).json({ error: "Bad user entery" })
            }
        }
        else {

            throw new Error("wrong password")
        }

    }
    catch (err) {
        res.status(401).json({ error: err.message })
    }
}
const temp = (req, res) => {
    try {
        console.log(req._id);
        res.status(200).json({ _id: req._id })
    }
    catch (err) {
        res.status(400).json({ error: err.message })
    }
}
const logout = (req, res) => {
    try {
        res.cookie('jwt', '', { httpOnly: true, maxAge: 86400 });

        res.status(200).json({ message: "loged out successfully" })
    }
    catch (err) {
        res.status(400).json({ error: err.message })
    }
}
const sendEmail = async (req, res) => {
    try {
        const { username } = req.body
        const data = await userModel.findOne({ username }, 'email').lean()
        if (data && data.email) {
            require('crypto').randomBytes(48, async function (err, buffer) {
                const token = await buffer.toString('hex');
                let date = new Date()
                date.setMinutes(date.getMinutes() + 5); //1 minute time allowed
                try {
                    await passwordTokenModel.create({ _id: data._id, token, expiration: date })
                }
                catch (err) {
                    await passwordTokenModel.updateOne({ _id: data._id }, { token, expiration: date })

                }
                await transporter.sendMail({
                    from: 'The_ACL_Company@gmail.com', // sender address
                    to: data.email, // list of receivers
                    subject: "Password Update Link", // Subject line
                    text: token, // plain text body
                    html: '<p>Click <a href="http://localhost:3000/resetpassword/' + token + '">here</a> to reset your password</p>', // html body
                }, (error,) => {
                    if (error) {
                        console.log("error sending mail");
                        console.log(error);
                    } else {
                        console.log("successful");
                    }

                });
            })
        }
        res.status(200).json({ message: "please Check your mail" })
    }
    catch (err) {
        res.status(401).json({ error: err.message })
    }
}

const verifyPassword = async (req, res) => {
    try {
        const { username, password, token } = req.body
        if (!username || !password || !token) {
            throw new Error("invalid request")
        }
        const data = await userModel.findOne({ username }, '_id').lean()
        const check = await passwordTokenModel.findOne({ _id: data._id }).lean()
        if (new Date(check.expiration) < new Date()) {
            throw new Error("token Expired")
        }
        if (check.token === token) {
            await userModel.updateOne({ _id: data._id }, { password })
            await passwordTokenModel.deleteOne({ _id: data._id })
            res.status(200).json({})
        }
        else {
            throw new Error("invalid token")
        }

    }
    catch (err) {
        console.log(err);
        res.status(401).json({ error: err.message })
    }
}

const restoreData = async (req, res) => {
    try {
        console.log('we got here');
        const id = req._id
        const user = await userModel.findOne({ _id: id }, 'type -_id')
        if (user.type === 'trainee') {
            const trainee = await traineeModel.findOne({ _id: id }, 'name type courseList.courseId courseList.status -_id').lean()

            res.status(200).json(trainee)
        }
        else if (user.type === 'instructor') {
            const instrucrtor = await instructorModel.findOne({ _id: id }, 'name -_id').lean()
            res.status(200).json({ ...instrucrtor, type: "instructor", _id: id })
        }
        else if (user.type === 'admin') {
            //const admin = await adminModel.findOne({ _id: id }).lean()
            res.status(200).json({ type: "admin" })
        }
        else {
            res.status(401).json({ error: "Bad user entery" })
        }
    }
    catch (err) {
        console.log(err);
        res.status(401).json({ error: err.message })
    }
}

const changeCountry = async (req, res) => {
    try {
        const id = req._id
        const { country } = req.body
        if (!country) return res.status(400).json({ error: 'You must add a country' })
        else if (country.length !== 2) return res.status(400).json({ error: 'Country value should be 2 charechters long' })
        await userModel.updateOne({ _id: id }, { country }, { new: true, upsert: true })
        return res.status(200).json({ message: 'successful' })
    }
    catch (err) {
        res.status(401).json({ error: err.message })
    }
}

module.exports = { editPassword, editEmail, login, temp, logout, sendEmail, verifyPassword, restoreData, changeCountry };
