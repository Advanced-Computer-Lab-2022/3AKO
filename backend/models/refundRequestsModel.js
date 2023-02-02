const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const refundRequestsSchema = new Schema(
    {
        traineeId: {
            type: mongoose.ObjectId,
            required: true,
            ref: "individualTrainee",
        },
        traineeUserName: {
            type: String,
            required: true,
        },
        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        courseTitle: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            default: "pending",
        },
        progress: {
            type: Number,
            required: true
        }
    },
    { timestamps: true }
);
const refundRequests = mongoose.model("refundRequests", refundRequestsSchema);
module.exports = {
    refundRequests,
};
