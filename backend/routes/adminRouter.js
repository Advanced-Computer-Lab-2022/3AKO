const express = require("express");

const {
    addAdmin,
    addAgreementRecord,
    changeAgreements,
    getCourseRequests,
    answerRequest,
} = require("../controllers/adminController");
const { addInstructor } = require("../controllers/instructorController");
const {
    addCorporateTrainee,
} = require("../controllers/corporateTraineeController");
const { addCourseToTrainee } = require("../controllers/traineeController");
const { requireAdmin } = require("../middleware/requireAuth");
const {
    getPendingComplaints,
    loadComplaint,
    resolveComplaint,
} = require("../controllers/complaintController");

const router = express.Router();
router.use(requireAdmin);
router.post("/addAdmin", addAdmin);
router.post("/addInstructor", addInstructor);
router.post("/addCorporateTrainee", addCorporateTrainee);
router.patch("/addCourseToCorporate", addCourseToTrainee);
router.patch("/answerRequest", answerRequest);

//router.patch('/editEmail/:id',editEmail)

router.get("/getPendingComplaints", getPendingComplaints);
router.patch("/loadComplaint", loadComplaint);
router.post("/resolveCompalint", resolveComplaint);
router.post("/addAgreementRecord", addAgreementRecord);
router.patch("/changeAgreements", changeAgreements);
router.get("/getCourseRequests", getCourseRequests);
module.exports = router;
