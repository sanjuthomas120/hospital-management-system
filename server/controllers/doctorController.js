const Doctor = require("../models/Doctor");
const Appointment = require("../models/Appointment");
const Prescription = require("../models/Prescription");
const Medicine = require("../models/Medicine");
const TeleConsultation = require("../models/TeleConsultation");
const Test = require("../models/Test");
const DoctorLeave = require("../models/DoctorLeave") 

exports.getDoctor = async (req, res) => {
  const doctorId = req.params.doctorId;
  try {
    const doctor = await Doctor.findById(doctorId);
    if (doctor) {
      return res.status(200).json(doctor);
    } else {
      return res.status(404).json({ message: "Doctor not found" });
    }
  } catch (error) {
    console.error("Error fetching doctor details:", error);
    return res.status(500).json({ message: "Error fetching doctors" });
  }
};

exports.getTodayAppointmentCount = async (req, res) => {
  const { doctorId } = req.params;

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  try {
    const todayAppointmentCount = await Appointment.countDocuments({
      doctor_id: doctorId,
      date: { $gte: todayStart, $lte: todayEnd },
    });
    return res.status(200).json({ count: todayAppointmentCount });
  } catch (error) {
    console.error("Error counting today's appointments:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

exports.getCompletedAppointmentsCount = async (req, res) => {
  const { doctorId } = req.params;

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  try {
    const completedAppointmentsCount = await Appointment.countDocuments({
      doctor_id: doctorId,
      date: { $gte: todayStart, $lte: todayEnd },
      status: "completed",
    });

    return res.status(200).json({ count: completedAppointmentsCount });
  } catch (error) {
    console.error("Error counting completed appointments:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

exports.getPendingAppointmentsCount = async (req, res) => {
  const { doctorId } = req.params;

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);
  try {
    const pendingAppointmentCount = await Appointment.countDocuments({
      doctor_id: doctorId,
      date: { $gte: todayStart, $lte: todayEnd },
      status: "confirmed",
    });

    return res.status(200).json({ count: pendingAppointmentCount });
  } catch (error) {
    console.error("Error counting pending appointments:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

exports.getCanceledAppointmentsCount = async (req, res) => {
  const { doctorId } = req.params;

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);
  try {
    const pendingAppointmentCount = await Appointment.countDocuments({
      doctor_id: doctorId,
      date: { $gte: todayStart, $lte: todayEnd },
      status: "canceled",
    });

    return res.status(200).json({ count: pendingAppointmentCount });
  } catch (error) {
    console.error("Error counting pending appointments:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

exports.getMissingAppointmentsCount = async (req, res) => {
  const { doctorId } = req.params;

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);
  try {
    const pendingAppointmentCount = await Appointment.countDocuments({
      doctor_id: doctorId,
      date: { $gte: todayStart, $lte: todayEnd },
      status: "missed",
    });

    return res.status(200).json({ count: pendingAppointmentCount });
  } catch (error) {
    console.error("Error counting pending appointments:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

exports.getAppointments = async (req, res) => {
  const { doctorId } = req.params;

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  try {
    const getAppointments = await Appointment.find({
      doctor_id: doctorId,
      date: { $gte: todayStart, $lte: todayEnd },
      status: "confirmed",
    }).populate("patient_id", "name contact");

    return res.status(200).json({ appointments: getAppointments });
  } catch (error) {
    console.error("Error fetching today's appointments:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

exports.doctorGetAppointmentDetails = async (req, res) => {
  const { appointmentId } = req.params;
  try {
    const appointmentDetails = await Appointment.findById(
      appointmentId
    ).populate("patient_id", "name age contact gender");
    return res.status(200).json({ patient: appointmentDetails });
  } catch (error) {
    console.error("Error appointments details:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

exports.addPrescription = async (req, res) => {
  try {
    const { appointmentId, medicines, tests, notes } = req.body;

    if (!appointmentId || (!medicines.length && !tests.length)) {
      return res.status(400).json({ message: "Invalid input: provide at least one medicine or test." });
    }

    const appointmentDetails = await Appointment.findById(appointmentId);
    if (!appointmentDetails) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointmentDetails.status = "completed";
    await appointmentDetails.save();

    const prescriptionData = {
      appointmentId,
      notes: notes || "",
    };

    if (medicines.length > 0) {
      prescriptionData.medicines = medicines;
    }

    if (tests.length > 0) {
      prescriptionData.tests = tests;
    }

    const prescription = new Prescription(prescriptionData);
    await prescription.save();

    res.status(201).json({ message: "Prescription added successfully" });
  } catch (error) {
    console.error("Error adding prescription:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.markAppointmentMissed = async (req, res) => {
  const { appointmentId } = req.params;

  try {
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.status = "missed";
    await appointment.save();

    res.status(200).json({ message: "Appointment marked as missed" });
  } catch (error) {
    console.error("Error marking appointment as missed:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

exports.getPrescriptionHistory = async (req, res) => {
  const { patientId } = req.params;

  try {
    const prescriptions = await Prescription.find()
      .populate({
        path: "appointmentId",
        match: { patient_id: patientId },
      })
      .sort({ createdAt: -1 });
    const filteredPrescriptions = prescriptions.filter(
      (prescription) => prescription.appointmentId !== null
    );

    if (filteredPrescriptions.length === 0) {
      return res.status(404).json({ message: "No prescriptions found" });
    }

    res.status(200).json({ prescriptions: filteredPrescriptions });
  } catch (error) {
    console.error("Error fetching prescription history:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

exports.getTeleConsultation = async (req, res) => {
  const { doctor_id } = req.params;
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  try {
    const getTeleConsultations = await TeleConsultation.find({
      doctorId: doctor_id,
      date: { $gte: todayStart, $lte: todayEnd },
    }).populate("patientId", "name contact");

    return res.status(200).json({ teleconsultations: getTeleConsultations });
  } catch (error) {
    console.error("Error fetching today's Teleconsultations:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

exports.getMedicines = async (req, res) => {
  const searchQuery = req.query.search;

  try {
    const medicines = await Medicine.find({
      name: { $regex: searchQuery, $options: "i" },
    }).limit(10);
    res.json({ medicines });
  } catch (error) {
    console.error("Error fetching medicine suggestions:", error);
    res.status(500).json({ message: "Error fetching medicine suggestions" });
  }
};

exports.getTests = async (req, res) => {
  const searchQuery = req.query.search;

  try {
    const tests = await Test.find({
      name: { $regex: searchQuery, $options: "i" },
    }).limit(10);
    res.json({ tests });
  } catch (error) {
    console.error("Error fetching test suggestions:", error);
    res.status(500).json({ message: "Error fetching test suggestions" });
  }
};

exports.viewTeleconsultations = async (req, res) => {
  const { doctorId } = req.params;
  const dayStart = new Date();
  dayStart.setHours(0, 0, 0, 0);
  try {
    const teleconsultations = await TeleConsultation.find({
      doctorId,
      date: { $gte: dayStart},
    })
      .populate("patientId", "name")
      .exec();

    const currentTime = new Date();
    const formattedData = teleconsultations.map((tc) => {
      const linkDisplayTimeStart = new Date(tc.time);
      const linkDisplayTimeEnd = new Date(
        linkDisplayTimeStart.getTime() + 15 * 60 * 1000
      );
      const showMeetingLink =
        currentTime >=
          new Date(linkDisplayTimeStart.getTime() - 15 * 60 * 1000) &&
        currentTime <= linkDisplayTimeEnd;

      return {
        _id: tc._id,
        doctorName: tc.patientId ? tc.patientId.name : "Unknown Patient",
        date: tc.date,
        time: tc.time,
        meetingLink: showMeetingLink ? tc.meetingLink : null,
      };
    });

    res.json(formattedData);
  } catch (error) {
    console.error("Error fetching teleconsultations:", error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
};

exports.requestLeave = async (req, res) => {
  const { doctorId, startDate, endDate, reason } = req.body;
  
  try {
    const leaveRequest = new DoctorLeave({
      doctorId,
      startDate,
      endDate,
      reason
    });
    await leaveRequest.save();
    res.status(201).json({ message: 'Leave request submitted successfully.', leaveRequest });
  } catch (error) {
    console.error('Error submitting leave request:', error);
    res.status(500).json({ message: 'Failed to submit leave request.', error: error.message });
  }
};