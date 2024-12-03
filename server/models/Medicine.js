const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  cas: {
    type: String,
    required: true,
    match: /^[0-9-]+$/,
  },
  usage: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  status: {
    type: String,
    enum: ["available", "empty"],
    default: "available",
  },
});

const Medicine = mongoose.model("Medicine", medicineSchema);
module.exports = Medicine;
