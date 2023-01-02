const adminModel = require("../models/adminModel");
const userModel = require("../models/userModel");
const agreementModel = require("../models/agreementModel");
const { Error } = require("mongoose");
const { corporateRequests } = require("../models/CorporateRequestsModel");
const { corporateTrainee } = require("../models/corporateTraineeModel");
const { courseRecordModel, traineeModel } = require("../models/traineeModel");
const { courseModel } = require("../models/courseModel");
const { refundRequests } = require("../models/refundRequestsModel");
const individualTraineeModel = require("../models/individualTraineeModel");
const instructorModel = require("../models/instructorModel");

const addAdmin = async (req, res) => {
    const { username, password } = req.body;
    try {
        const check = await userModel.findOne({ username }, "_id").lean();
        if (check) {
            throw new Error("This username already exists");
        }
        const user = await userModel.create({
            username,
            password,
            type: "admin",
        });
        const admin = await adminModel.create({ _id: user._id });
        res.status(200).json(admin);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const addAgreementRecord = async (req, res) => {
    try {
        const { traineeAgreement, instructorAgreement, instructorCut } =
            req.body;
        const count = await agreementModel.countDocuments();
        if (count === 0) {
            await agreementModel.create({
                traineeAgreement,
                instructorAgreement,
                instructorCut,
            });
            res.status(200).json({ message: "successful" });
        } else {
            res.status(401).json({ error: "the agreement is already created" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
const changeAgreements = async (req, res) => {
    try {
        const { traineeAgreement, instructorAgreement, instructorCut } =
            req.body;
        await agreementModel.updateOne(
            {},
            { traineeAgreement, instructorAgreement, instructorCut }
        );
        res.status(200).json({ message: "successful" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
const getCourseRequests = async (req, res) => {
    try {
        const data = await corporateRequests.find({ status: "pending" });
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
const answerRequest = async (req, res) => {
    try {
        const { requestId, response } = req.body;
        const request = await corporateRequests.findOne({ _id: requestId });
        if (!request)
            return res.status(400).json({ error: "invalid request id" });
        if (response === "accept") {
            await corporateRequests.updateOne(
                { _id: requestId },
                { status: "accepted" },
                { new: true, upsert: true }
            );
            await courseModel.updateOne(
                { _id: request.courseId },
                { $inc: { numOfPurchases: 1 } }
            );
            const newCourseRecord = await new courseRecordModel({
                courseId:request.courseId,
            });
            await traineeModel.updateOne(
                { _id: request.corporateId },
                { $addToSet: { courseList: newCourseRecord } },
                { new: true, upsert: true }
            );
            res.status(200).json({ message: "successful" });
        } else if (response === "reject") {
            await corporateRequests.updateOne(
                { _id: requestId },
                { status: "rejected" },
                { new: true, upsert: true }
            );
            console.log("successful");
            res.status(200).json({ message: "successful" });
        } else {
            console.log("no such request");
            res.status(401).json({ error: "No such request" });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
};

const getRefundRequests = async (req, res) => {
    try {
        const data = await refundRequests.find({ status: "pending" });
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
const answerRefundRequest = async (req, res) => {
    try {
        const { requestId, response } = req.body;
        const request = await refundRequests.findOne({ _id: requestId });
        console.log(requestId, response);
        if (!request)
            return res.status(400).json({ error: "invalid request id" });
        if (response === "accept") {
            // get the payment details to get the paid amount
            const paymentData = await individualTraineeModel.findOne({_id:request.traineeId},{wallet:0,_id:0,payments: { $elemMatch: { courseId: request.courseId,status:'completed' }}}).lean()
            console.log({paymentData});
            const payment = paymentData.payments[0]
            console.log({payment});

            // get the instructor id from the course data
            const courseData = await courseModel.findOne({_id:request.courseId},'instructorId -_id').lean()
            console.log({courseData});

            // add the refunded amount to the trainee wallet
            await individualTraineeModel.updateOne({_id:request.traineeId},{$inc:{wallet:payment.amount}},{new:true,upsert:true})
            console.log({terror:"reached"});

            // get the cut for the instructor
            const precentageData = await agreementModel.findOne({},'instructorCut -_id').lean()
            const percentage = precentageData.instructorCut
            const now = new Date()
            const date = new Date(now.getFullYear(), now.getMonth(), 1)
            // deduct the amount given to the instructor from the current month
            //await instructorModel.updateOne({_id : courseData.instructorId,'earnings.startDate':date.toISOString()},{$inc:{'earnings.$.sum': -percentage/100*payment.amount}},{new:true,upsert:true})
            const instructorData = await instructorModel.findOne({ _id: courseData.instructorId }, { earnings: 1, _id: 0, rating: 0, courses: 0, name: 0, gender: 0, biography: 0, consent: 0, reviews: 0, earnings: { $elemMatch: { startDate: date.toISOString() } } }).lean()
            // add the amount owed for the instructor to the current month earnings record if exists
            if (instructorData.earnings && instructorData.earnings.length) {
            const newData = await instructorModel.updateOne({ _id: courseData.instructorId, 'earnings.startDate': date }, { $inc: { 'earnings.$.sum':-percentage/100*payment.amount} }, { new: true, upsert: true })
            }
            else { // create a record for the month and add the owed amount to it if one does not exist
            const newData = await instructorModel.updateOne({ _id: courseData.instructorId }, { $push: { earnings: { startDate: date, sum: -percentage/100*payment.amount } } }, { new: true, upsert: true })
            }
            console.log("ok");
            // change the status of the course
                await traineeModel.updateOne({_id:request.traineeId,'courseList.courseId':request.courseId},{'courseList.$.status':"refunded"},{new:true,upsert:true});
            
            
            // mark the request as accepted
            await refundRequests.updateOne({ _id: requestId }, { status: "accepted" }, { new: true, upsert: true });
                    console.log("not ok");
            
            res.status(200).json({ message: "successful" });
        } else if (response === "reject") {
            // mark the request as rejected
            await refundRequests.updateOne( { _id: requestId }, { status: "rejected" }, { new: true, upsert: true });
            console.log("successful");
            res.status(200).json({ message: "successful" });
        } else {
            console.log("no such request");
            res.status(401).json({ error: "No such request" });
        }
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: error.message });
    }
}; 


module.exports = {
    addAdmin,
    addAgreementRecord,
    changeAgreements,
    getCourseRequests,
    answerRequest,
    getRefundRequests,
    answerRefundRequest

};
