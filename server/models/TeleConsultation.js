const mongoose = require("mongoose");

const teleConsultationSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  date: { type: Date, required: true },
  time: { type: String, required: true }, 
  meetingLink: { type: String, required: true },
});

const TeleConsultation = mongoose.model(
  "TeleConsultation",
  teleConsultationSchema
);
module.exports = TeleConsultation;
