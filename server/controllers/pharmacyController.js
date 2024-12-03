const Prescription = require("../models/Prescription");
const Appointment = require("../models/Appointment");
const Patient = require("../models/Patients");
const Medicine = require("../models/Medicine");
const ConfirmedPharmacyBill = require('../models/ConfirmedPharmacyBill')

exports.pharmacyGetPrescription = async (req, res) => {
  const { search, page = 1, limit = 10 } = req.query;
  const query = {};

  try {
    const appointments = await Appointment.find()
      .populate({
        path: "patient_id",
        match: { name: new RegExp(search, "i") },
        select: "name",
      })
      .exec();

    const filteredAppointments = appointments.filter(
      (app) => app.patient_id !== null
    );
    const appointmentIds = filteredAppointments.map((app) => app._id);

    query.appointmentId = { $in: appointmentIds };

    const prescriptions = await Prescription.find(query)
      .populate("appointmentId")
      .limit(Number(limit))
      .skip((page - 1) * limit);

    const totalPrescriptions = await Prescription.countDocuments(query);
    const totalPages = Math.ceil(totalPrescriptions / limit);

    const prescriptionsWithPatientNames = await Promise.all(
      prescriptions.map(async (prescription) => {
        const appointment = await Appointment.findById(
          prescription.appointmentId
        ).populate("patient_id", "name");
        return {
          ...prescription.toObject(),
          patientName: appointment.patient_id
            ? appointment.patient_id.name
            : "Unknown",
        };
      })
    );

    res.json({ prescriptions: prescriptionsWithPatientNames, totalPages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.pharmacyGetMedicine = async (req, res) => {
  try {
    const medicines = await Medicine.find();

    if (medicines) {
      return res.status(200).json(medicines);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.medicineUpdateAvailability = async (req, res) => {
  const { medicine_id } = req.params;
  try {
    const medicine = await Medicine.findById(medicine_id);
    if (!medicine) {
      return res.status(400).json({ message: "Medicine not exist" });
    }
    medicine.status = "empty";
    await medicine.save();
    res.status(200).json({ message: "Medicine availability updated" });
  } catch (error) {
    console.error("Error in updating:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};
exports.getUserAndPrescriptionDetails = async(req, res) => {
  const {prescriptionId} = req.params;
  try {
    const prescription = await Prescription.findById(prescriptionId);
    const appointmentId = prescription.appointmentId;
    const appointmentDetails = await Appointment.findById(appointmentId);
    const patientId = appointmentDetails.patient_id;
    const patientDetails = await Patient.findById(patientId);
    const medicineDetails = await Promise.all(
      prescription.medicines.map(async (med) => {
        const medicineInfo = await Medicine.findOne({ name: med.name});
        if(medicineInfo){
          return {
            name: med.name,
            dosage: med.dosage,
            price: medicineInfo.price
          }
        }
      })
    )
    const getDate = prescription.createdAt;
    return res.status(200).json({patientDetails, medicineDetails, getDate})
  } catch (error) {
    console.error('Server error: ', error)
    return res.status(500).json({message: 'Server Error'})
  }
}
exports.confirmPharmacyBill = async (req, res) => {
  const {prescriptionId} = req.params;
  const { patientId, medicineDetails, totalAmount } = req.body;
  try {
    const prescription = await Prescription.findById(prescriptionId)
    prescription.pharmacyConfirm = 'confirmed';
    await prescription.save();
    const newBill = new ConfirmedPharmacyBill({
      patientId,
      medicineDetails,
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