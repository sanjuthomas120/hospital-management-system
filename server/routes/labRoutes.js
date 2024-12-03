const express = require("express");
const { getLabTests, getUserAndPrescriptionDetails, confirmLabBill } = require("../controllers/labController");

const router = express.Router();

router.get("/view-tests", getLabTests);
router.get('/confirm-bill/:prescriptionId' , getUserAndPrescriptionDetails)
router.post("/confirm-lab-bill/:prescriptionId", confirmLabBill);

module.exports = router;
