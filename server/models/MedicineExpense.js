const mongoose = require('mongoose');

const MedicineExpenseSchema = new mongoose.Schema({
  medicineId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Medicine',
  },
  paidAmount: Number,
  date: {
    type: Date,
    default: Date.now,
  },
});

const MedicineExpense = mongoose.model(' MedicineExpense', MedicineExpenseSchema);

module.exports = MedicineExpense;
