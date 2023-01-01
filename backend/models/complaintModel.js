const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const complaintSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            require: true,
        },
        userId: {
            type: mongoose.ObjectId,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        followUps: {
            type: [String],
            default: [],
        },
        status: {
            type: String,
            default: "unseen",
        },
        reportedCourse: {
            type: mongoose.ObjectId,
            required: true,
        },
        courseTitle: {
            type: String,
            required: true,
        },
        reportType: {
            type: String,
            default: 'other'
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("complaint", complaintSchema);
