const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "userTypeModel" },
  userTypeModel: {
    type: String,
    required: true,
    enum: [
      "Patient",
      "Doctor",
      "Admin",
      "Account-Section",
      "Pharmacy",
      "Lab-Section",
    ],
  },
  resetToken: { type: String },
  resetTokenExpiry: { type: Date },
});

const Auth = mongoose.model("Auth", authSchema);

module.exports = Auth;
