const complaintModel = require("../models/complaintModel");
const userModel = require("../models/userModel");
const { Error } = require("mongoose");
const { courseModel } = require("../models/courseModel");

const addComplaint = async (req, res) => {
    try {
        const id = req._id;
        const { title, body, reportedCourse, reportType } = req.body;
        const userData = await userModel.findOne({_id:id},'username -_id').lean()
        const courseData = await courseModel.findOne({_id:reportedCourse},'title -_id').lean()
        const complaint = await complaintModel.create({
            title,
            body,
            userId: id,
            reportedCourse,
            reportType,
            username: userData.username,
            courseTitle:courseData.title,
        });
        res.status(200).json({message : 'successful'});
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
const getPendingComplaints = async (req, res) => {
    try {
        const id = req._id;
        const complaints = await complaintModel
            .find({ status: { $in: ["unseen", "pending"] } })
            .lean();
        // const data = complaints.map((complaint) => {
        //     const seen = complaint.seenBy.find((adminId) => {
        //         return adminId.toString() === id.toString();
        //     });
        //     let record = complaint;
        //     record.delete(seen);
        //     record.seen = false;
        //     if (seen) record.seen = true;
        //     return record;
        // });
        res.status(200).json(complaints);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
const loadComplaint = async (req, res) => {
    try {
        const id = req._id;
        const { complaintId } = req.body;

        const data = await complaintModel.findOne(
            { _id: complaintId },
            "-seenBy"
        );
        return res.status(200).json(data);

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
const resolveComplaint = async (req, res) => {
    try {
        const { complaintId } = req.body;
        console.log(complaintId);
        await complaintModel.updateOne(
            { _id: complaintId },
            { status: "resolved" }
        );
        res.status(200).json({ success: true });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
const markComplaintPending = async (req, res) => {
    try {
        const { complaintId } = req.body;
        await complaintModel.updateOne(
            { _id: complaintId },
            { status: "pending" }
        );
        res.status(200).json({ success: true });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const getMyComplaints = async (req, res) => {
    const id = req._id;

    try {
        const complaints = await complaintModel.find({ userId: id }, { seenBy: 0 })
        res.status(200).json(complaints);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }


}

const addFollowUp = async (req, res) => {
    const id = req._id;
    const { complaintId, followUp } = req.body
    try {
        const complaints = await complaintModel.findOneAndUpdate({ userId: id, _id: complaintId }, { $push: { followUps: followUp }, status: 'unseen' })
        res.status(200).json(complaints);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

module.exports = {
    addComplaint,
    getPendingComplaints,
    loadComplaint,
    resolveComplaint,
    markComplaintPending,
    getMyComplaints,
    addFollowUp,
};
