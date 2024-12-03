const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  photo: { type: String },
  doctor_id : { type: String, required: true, unique: true},
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  phone: { type: String, required: true },
  experience: { type: String, required: true },
});

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
