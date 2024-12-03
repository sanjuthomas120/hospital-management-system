const crypto = require("crypto");
const Auth = require("../models/Auth");
const Doctor = require("../models/Doctor");
const Patient = require("../models/Patients");
const Lab = require("../models/Lab");
const Pharmacy = require("../models/Pharmacy");
const Account = require("../models/Account");
const Medicine = require("../models/Medicine");
const Test = require("../models/Test");
const Notification = require("../models/Notification");
const DoctorLeave = require("../models/DoctorLeave");
const Appointment = require("../models/Appointment");
const TeleConsultation = require("../models/TeleConsultation");
const ConfirmedPharmacyBill = require("../models/ConfirmedPharmacyBill");
const ConfirmedLabBill = require("../models/ConfirmedLabBill");
const MedicineExpense = require("../models/MedicineExpense");

exports.getTotalDetails = async (req, res) => {
  try {
    const patients = await Patient.countDocuments();
    const doctors = await Doctor.countDocuments();
    const appointments = await Appointment.countDocuments();
    const appointmentEarnings = await Appointment.countDocuments({
      paymentStatus: "completed",
    });
    const teleconsulations = await TeleConsultation.countDocuments();
    const  medicine = await ConfirmedPharmacyBill.find({
      payment: 'completed'
    });
    const medicinePayment = medicine.reduce((total, item) => {
      return total + item.totalAmount
    }, 0)
    const  lab = await ConfirmedLabBill.find({
      payment: 'completed'
    });
    const labPayment = lab.reduce((total, item) => {
      return total + item.totalAmount
    }, 0)
    const medicineBill = await MedicineExpense.find();
    const totalExpense = medicineBill.reduce((total, item) => {
      return total + item.paidAmount
    },0)
    const appointmentsPayment = appointmentEarnings * 500;
    const teleconsulationsPayment = teleconsulations * 1500;
    const totalRevenue = appointmentsPayment + teleconsulationsPayment + medicinePayment + labPayment;
    return res
      .status(200)
      .json({ patients, doctors, appointments, appointmentsPayment, teleconsulations, teleconsulationsPayment, medicinePayment, labPayment, totalRevenue, totalExpense });
  } catch (error) {
    console.error("Something went wrong: ", error);
  }
};
exports.pendingBills = async (req, res) => {
  try {
    const appointment = await Appointment.find({
      paymentStatus: "pending",
      status: "completed",
    }).populate("doctor_id", "name specialty")
    .populate('patient_id', 'name contact age');
    const pharmacy = await ConfirmedPharmacyBill.find({
      payment: "pending",
    }).populate('patientId', 'name contact age');;
    const lab = await ConfirmedLabBill.find({
      payment: "pending",
    }).populate('patientId', 'name contact age');;
    return res.status(200).json({ appointment, pharmacy, lab });
  } catch (error) {
    console.error("Server error: ", error);
    return res.status(500).json({ message: "Server error" });
  }
};
exports.completePendingBills = async (req, res) => {
  const { type, billId } = req.params;

  try {
    let updatedBill;

   
    if (type === "appointment") {
      updatedBill = await Appointment.updateOne(
        { _id: billId },
        { $set: { paymentStatus: "completed" } }
      );
    } else if (type === "pharmacy") {
      updatedBill = await ConfirmedPharmacyBill.updateOne(
        { _id: billId },
        { $set: { payment: "completed",
            paymentMode: 'offline'
         } }
      );
    } else if (type === "lab") {
      updatedBill = await ConfirmedLabBill.updateOne(
        { _id: billId },
        { $set: { payment: "completed",
          paymentMode: 'offline'
         } }
      );
    } else {
      return res.status(400).json({ message: "Invalid bill type" });
    }

    // Check if a document was updated
    if (updatedBill.matchedCount === 0) {
      return res.status(404).json({ message: "Bill not found" });
    }

    res.status(200).json({ message: "Bill marked as completed successfully" });
  } catch (error) {
    console.error("Error updating bill:", error);
    res.status(500).json({ message: "Failed to mark bill as completed", error });
  }
};
