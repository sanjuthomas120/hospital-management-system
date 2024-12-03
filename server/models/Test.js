const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    enum: ["blood", "lab"],
    required: true,
  },
  ndc: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  status: {
    type: String,
    enum: ["available", "not available"],
    default: "available",
  },
});

const Test = mongoose.model("Test", testSchema);

module.exports = Test;
