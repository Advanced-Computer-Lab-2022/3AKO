const express = require("express");

const {
    addAdmin,
    addAgreementRecord,
    changeAgreements,
    getCourseRequests,
    answerRequest,
    getRefundRequests,
    answerRefundRequest,
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
    markComplaintPending,
} = require("../controllers/complaintController");
const {
    getCoursesWithAdminPromotion,
    getCoursesWithPromotion,
    addAdminPromotionToAllCourses,
    addAdminPromotion,
    addAdminPromotionWithSubject,
} = require("../controllers/courseController");

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
router.patch("/resolveCompalint", resolveComplaint);
router.patch("/markComplaintPending", markComplaintPending);

router.post("/addAgreementRecord", addAgreementRecord);
router.patch("/changeAgreements", changeAgreements);
router.get("/getCourseRequests", getCourseRequests);
router.get("/getCoursesWithAdminPromotion", getCoursesWithAdminPromotion);
router.get("/getCoursesWithPromotion", getCoursesWithPromotion);
router.patch("/addAdminPromotionToAllCourses", addAdminPromotionToAllCourses);
router.patch("/addAdminPromotionWithSubject", addAdminPromotionWithSubject);
router.patch("/addAdminPromotion", addAdminPromotion);

router.get("/getRefundRequests", getRefundRequests);
router.patch("/answerRefundRequest", answerRefundRequest);
module.exports = router;
