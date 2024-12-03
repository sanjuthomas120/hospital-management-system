const Appointment = require("../models/Appointment");
const Patient = require("../models/Patients");
const Prescription = require("../models/Prescription");
const Test = require("../models/Test");
const ConfirmedLabBill = require('../models/ConfirmedLabBill')

exports.getLabTests = async (req, res) => {
  try {
    const tests = await Test.find();

    if (tests) {
      return res.status(200).json(tests);
    }
  } catch (error) {
    console.error("Error ocurred:", error);
    return res.status(500).json("Server error");
  }
};

exports.getUserAndPrescriptionDetails = async (req, res) => {
  const { prescriptionId } = req.params;
  try {
    const prescription = await Prescription.findById(prescriptionId);
    const appointmentId = prescription.appointmentId;
    const appointmentDetails = await Appointment.findById(appointmentId);
    const patientId = appointmentDetails.patient_id;
    const patientDetails = await Patient.findById(patientId);
    const testDetails = await Promise.all(
      prescription.tests.map(async (test) => {
        const testInfo = await Test.findOne({ name: test.name });
        if (testInfo) {
          return {
            name: test.name,
            price: testInfo.price,
          };
        }
      })
    );
    const getDate = prescription.createdAt;
    return res.status(200).json({ patientDetails, testDetails, getDate });
  } catch (error) {
    console.error("Server error: ", error);
    return res.status(500).json({ message: "Server Error" });
  }
};
exports.confirmLabBill = async (req, res) => {
  const {prescriptionId} = req.params;
  const { patientId, testDetails, totalAmount } = req.body;
  try {
    const prescription = await Prescription.findById(prescriptionId)
    prescription.labConfirm = 'confirmed';
    await prescription.save();
    const newBill = new ConfirmedLabBill({
      patientId,
      testDetails,
      totalAmount,
      date: new Date(),
    });
    await newBill.save();
    res.status(200).json({ message: "Bill confirmed successfully" });
  } catch (error) {
    console.error("Error saving bill:", error);
    res.status(500).json({ message: "Server error" });
  }
}
