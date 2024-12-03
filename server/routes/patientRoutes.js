const express = require("express");
const {
  viewDoctors,
  availability,
  bookAppointment,
  getPatientAppointments,
  getPrescription,
  cancelAppointment,
  availabilityTeleConsultation,
  getPatientAppointmentHistory,
  bookTeleconsultation,
  viewTeleconsultations,
  getProfile,
  updateProfile,
  pendingBills,
  completedBills,
  completePendingBills
} = require("../controllers/patientController");

const router = express.Router();

router.get("/view-doctors", viewDoctors);
router.get("/availability/:doctorId/:date", availability);
router.post("/book", bookAppointment);
router.get("/appointments/:patientId", getPatientAppointments);
router.get("/appointment-history/:patientId", getPatientAppointmentHistory);
router.get("/view-prescription/:appointment_id", getPrescription);
router.put("/:appointmentId/cancel-appointment", cancelAppointment);
router.get(
  "/teleconsultation-availability/:doctorId/:date",
  availabilityTeleConsultation
);
router.post("/bookTeleconsultation", bookTeleconsultation);
router.get("/teleconsultations-view/:patientId", viewTeleconsultations);
router.get('/edit-profile/:patientId', getProfile)
router.put('/update-profile/:patientId', updateProfile)
router.get('/pending-bills/:patient_id', pendingBills)
router.get('/completed-bills/:patient_id', completedBills)
router.patch('/complete-bill/:type/:billId', completePendingBills)
module.exports = router;
