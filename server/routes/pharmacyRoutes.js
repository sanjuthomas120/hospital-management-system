const express = require("express");

const {
  pharmacyGetPrescription,
  pharmacyGetMedicine,
  medicineUpdateAvailability,
  getUserAndPrescriptionDetails,
  confirmPharmacyBill
} = require("../controllers/pharmacyController");

const router = express.Router();

router.get("/prescriptions", pharmacyGetPrescription);
router.get("/view-medicine", pharmacyGetMedicine);
router.put("/:medicine_id/update-availability", medicineUpdateAvailability);
router.get("/confirm-bill/:prescriptionId", getUserAndPrescriptionDetails);
router.post("/confirm-pharmacy-bill/:prescriptionId", confirmPharmacyBill);

module.exports = router;
