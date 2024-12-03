const mongoose = require("mongoose");

const confirmedPharmacyBillSchema = new mongoose.Schema({
  patientId: { type: String, required: true, ref: "Patient", },
  medicineDetails: { type: Array, required: true },
  totalAmount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  payment: { type: String, enum: ["completed", "pending"], default: "pending" },
  paymentMode: {type: String}
});

const ConfirmedPharmacyBill = mongoose.model(
  "ConfirmedPharmacyBill",
  confirmedPharmacyBillSchema
);
module.exports = ConfirmedPharmacyBill;
