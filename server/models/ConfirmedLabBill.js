const mongoose = require("mongoose");

const confirmedLabBillSchema = new mongoose.Schema({
  patientId: { type: String, required: true, ref: "Patient", },
  testDetails: { type: Array, required: true },
  totalAmount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  payment: { type: String, enum: ["completed", "pending"], default: "pending" },
  paymentMode: {type: String}
});

const ConfirmedLabBill = mongoose.model(
  "ConfirmedLabBill",
  confirmedLabBillSchema
);
module.exports = ConfirmedLabBill;
