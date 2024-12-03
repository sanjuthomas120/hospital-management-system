const express = require("express");
const multer = require("multer");
const {
  adminAddDoctor,
  adminViewDoctors,
  adminAddLab,
  adminAddAccount,
  adminAddPharmacy,
  adminViewPatients,
  adminViewAccounts,
  adminViewPharmacy,
  adminViewLab,
  adminUpdateMedicine,
  adminDeleteMedicine,
  adminUpdateTest,
  adminDeleteTest,
  adminAddTest,
  adminAddMedicine,
  sendNotification,
  notifications,
  leaveRequest,
  approveLeaveRequest,
  viewEmptyMedicine,
  updateAvailability,
  medicinePayment,
  deleteDoctor,
  deletePatient
} = require("../controllers/adminController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const router = express.Router();
const upload = multer({ storage: storage });

router.post("/add-doctor", upload.single("photo"), adminAddDoctor);
router.get("/view-doctors", adminViewDoctors);
router.get("/view-patients", adminViewPatients);
router.get("/view-accounts", adminViewAccounts);
router.get("/view-pharmacy", adminViewPharmacy);
router.get("/view-labs", adminViewLab);
router.post("/add-lab-staff", adminAddLab);
router.post("/add-account-staff", adminAddAccount);
router.post("/add-pharmacy-staff", adminAddPharmacy);
router.put("/:medicineId/update-medicine", adminUpdateMedicine);
router.delete("/delete-medicine/:medicineId", adminDeleteMedicine);
router.put("/update-test/:testId", adminUpdateTest);
router.delete("/delete-test/:testId", adminDeleteTest);
router.post("/add-test", adminAddTest);
router.post("/add-medicine", adminAddMedicine);
router.post("/send-notification", sendNotification);
router.get("/notifications", notifications);
router.get("/leave-requests", leaveRequest);
router.patch("/leave-requests/:id", approveLeaveRequest)
router.get('/view-empty-medicine', viewEmptyMedicine);
router.put('/update-medicine/:id', updateAvailability);
router.post('/add-payment', medicinePayment);
router.delete('/delete-doctor/:doctorId', deleteDoctor);
router.delete('/delete-doctor/:patientId', deletePatient);

module.exports = router;
