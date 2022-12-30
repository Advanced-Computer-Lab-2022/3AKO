const complaintModel = require("../models/complaintModel");
const { Error } = require("mongoose");

const addComplaint = async (req, res) => {
    try {
        const id = req._id;
        const { title, body, reportedCourse, reportType } = req.body;
        console.log(req.body);
        const complaint = await complaintModel.create({
            title,
            body,
            userId: id,
            reportedCourse,
            reportType
        });
        res.status(200).json(complaint);
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
        const seen = await complaintModel
            .findOne({ _id: complaintId }, "seenBy -_id")
            .lean();
        const check = seen.seenBy.find((adminId) => {
            return adminId.toString() === id.toString();
        });
        if (check) {
            const data = await complaintModel.findOne(
                { _id: complaintId },
                "-seenBy"
            );
            return res.status(200).json(data);
        } else {
            const data = await complaintModel.findOneAndUpdate(
                { _id: complaintId },
                { $push: { seenBy: id } },
                { fields: { seenBy: 0 }, new: true, upsert: true }
            );
            res.status(200).json(data);
        }
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

module.exports = {
    addComplaint,
    getPendingComplaints,
    loadComplaint,
    resolveComplaint,
    markComplaintPending,
};
