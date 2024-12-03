const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema({
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment",
    required: true,
  },
  medicines: [
    {
      name: { type: String },
      dosage: { type: String },
      instructions: { type: String }
    }
  ],
  tests: [
    {
      name: { type: String },
      instructions: { type: String }
    }
  ],
  notes: {
    type: String,
    default: ""
  },
  pharmacyConfirm: {
    type: String,
    enum: ["confirmed", "not confirmed"],
    default: "not confirmed",
  },
  labConfirm: {
    type: String,
    enum: ["confirmed", "not confirmed"],
    default: "not confirmed",
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Prescription = mongoose.model("Prescription", prescriptionSchema);
module.exports = Prescription;
