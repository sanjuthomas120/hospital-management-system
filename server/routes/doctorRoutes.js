const express = require("express");
const {
  getDoctor,
  getTodayAppointmentCount,
  getCompletedAppointmentsCount,
  getPendingAppointmentsCount,
  getMissingAppointmentsCount,
  getCanceledAppointmentsCount,
  getAppointments,
  doctorGetAppointmentDetails,
  addPrescription,
  markAppointmentMissed,
  getPrescriptionHistory, 
  getTeleConsultation,
  getMedicines,
  getTests, 
  viewTeleconsultations,
  requestLeave,
} = require("../controllers/doctorController");
const router = express.Router();

router.get("/getDoctor/:doctorId", getDoctor);
router.get("/:doctorId/today-appointments-count", getTodayAppointmentCount);
router.get(
  "/:doctorId/completed-appointments-count",
  getCompletedAppointmentsCount
);
router.get(
  "/:doctorId/pending-appointments-count",
  getPendingAppointmentsCount
);
router.get(
  "/:doctorId/missing-appointments-count",
  getMissingAppointmentsCount
);
router.get(
  "/:doctorId/canceled-appointments-count",
  getCanceledAppointmentsCount
);
router.get("/:doctorId/today-appointments", getAppointments);
router.get("/:appointmentId/details", doctorGetAppointmentDetails);
router.post("/add-prescription", addPrescription);
router.put('/:appointmentId/mark-missed', markAppointmentMissed);
router.get('/:patientId/prescriptions', getPrescriptionHistory);
router.get('/:doctor_id/today-teleconsultations', getTeleConsultation);
router.get('/medicines', getMedicines)
router.get('/tests', getTests)
router.get("/teleconsultations-view/:doctorId", viewTeleconsultations);
router.post('/request-leave', requestLeave)

module.exports = router;
