const Doctor = require("../models/Doctor");
const Appointment = require("../models/Appointment");
const Patient = require("../models/Patients");
const Prescription = require("../models/Prescription");
const TeleConsultation = require("../models/TeleConsultation");
const ConfirmedPharmacyBill = require("../models/ConfirmedPharmacyBill");
const getAvailableTimeSlots = require("../utils/getAvailableTimeSlots");
const generateMeetingLink = require("../utils/generateMeetingLink");
const { format } = require("date-fns");
const Auth = require("../models/Auth");
const mongoose = require("mongoose");
const ConfirmedLabBill = require("../models/ConfirmedLabBill");

exports.viewDoctors = async (req, res) => {
  try {
    const Doctors = await Doctor.find();
    return res.status(200).json(Doctors);
  } catch (error) {
    console.error("Error fetching in data:", error);
    return res
      .status(500)
      .json({ message: "Something went wrong please try again" });
  }
};

exports.availability = async (req, res) => {
  const { doctorId, date } = req.params;

  try {
    const selectedDate = new Date(date);

    if (isNaN(selectedDate.getTime())) {
      return res.status(400).json({ error: "Invalid date provided" });
    }

    const startOfDay = new Date(selectedDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(selectedDate);
    endOfDay.setHours(23, 59, 59, 999);

    const appointments = await Appointment.find({
      doctor_id: doctorId,
      date: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    });

    const workingHours = {
      start: new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        9,
        0
      ),
      end: new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        17,
        0
      ),
    };

    const breaks = [
      {
        start: new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate(),
          13,
          0
        ),
        end: new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate(),
          14,
          0
        ),
      },
      {
        start: new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate(),
          15,
          30
        ),
        end: new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate(),
          16,
          0
        ),
      },
    ];

    const availableSlots = getAvailableTimeSlots(
      appointments,
      workingHours,
      breaks
    );

    const bookedSlots = appointments
      .map((appointment) =>
        new Date(appointment.time).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      )
      .sort(
        (a, b) => new Date(`1970/01/01 ${a}`) - new Date(`1970/01/01 ${b}`)
      );

    res.json({ available: availableSlots, booked: bookedSlots });
  } catch (error) {
    console.error("Error fetching available time slots:", error);
    res.status(500).json({ error: "Error fetching available slots" });
  }
};

exports.bookAppointment = async (req, res) => {
  const { doctor_id, patient_id, date, time, paymentMode } = req.body;
  try {
    const newAppointment = new Appointment({
      doctor_id,
      patient_id,
      date,
      time,
      paymentMode,
      paymentStatus: paymentMode === "offline" ? "pending" : "completed",
    });

    await newAppointment.save();
    return res.status(201).json({ message: "Appointment booked successfully" });
  } catch (error) {
    console.error("Error booking appointment:", error);
    return res.status(500).json({ message: "Failed to book appointment" });
  }
};

exports.getPatientAppointments = async (req, res) => {
  const { patientId } = req.params;
  const dayStart = new Date();
  dayStart.setHours(0, 0, 0, 0);

  try {
    const appointments = await Appointment.find({
      patient_id: patientId,
      date: { $gte: dayStart },
    })
      .populate("doctor_id", "name specialty")
      .sort({ date: 1 });
    return res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching patient appointment details:", error);
    return res
      .status(500)
      .json({ error: "Unable to fetch appointment details" });
  }
};

exports.getPatientAppointmentHistory = async (req, res) => {
  const { patientId } = req.params;
  const previousDate = new Date();
  previousDate.setDate(previousDate.getDate() - 1);
  try {
    const appointmentHistory = await Appointment.find({
      patient_id: patientId,
      date: { $lte: previousDate },
    })
      .populate("doctor_id", "name specialty")
      .sort({ date: 1 });
    return res.status(200).json(appointmentHistory);
  } catch (error) {
    console.error("Error fetching patient appointment history details:", error);
    return res
      .status(500)
      .json({ error: "Unable to fetch appointment history details" });
  }
};

exports.getPrescription = async (req, res) => {
  const { appointmentId } = req.params;
  try {
    const prescription = await Prescription.findOne({
      appointment_id: appointmentId,
    });
    if (!prescription) {
      return res.status(404).json({ message: "Prescription not found" });
    }
    res.json(prescription);
  } catch (error) {
    console.error("Error fetching prescription:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.cancelAppointment = async (req, res) => {
  const { appointmentId } = req.params;

  try {
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.status = "canceled";
    await appointment.save();

    res.status(200).json({ message: "Appointment canceled" });
  } catch (error) {
    console.error("Error in canceling appointment:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

exports.availabilityTeleConsultation = async (req, res) => {
  const { doctorId, date } = req.params;
  try {
    const selectedDate = new Date(date);
    if (isNaN(selectedDate.getTime())) {
      return res.status(400).json({ error: "Invalid date provided" });
    }

    const startOfDay = new Date(selectedDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(selectedDate);
    endOfDay.setHours(23, 59, 59, 999);

    const takenSlots = await TeleConsultation.find({
      doctorId: doctorId,
      date: { $gte: startOfDay, $lte: endOfDay },
    });

    const workingHours = {
      start: new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        19,
        0
      ),
      end: new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        21,
        30
      ),
    };

    const breaks = [
      {
        start: new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate(),
          20,
          0
        ),
        end: new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate(),
          20,
          30
        ),
      },
    ];

    const availableSlots = getAvailableTimeSlots(
      takenSlots,
      workingHours,
      breaks
    );

    const bookedSlots = takenSlots.map((slot) =>
      format(new Date(slot.time), "hh:mm a")
    );

    res.json({ available: availableSlots, booked: bookedSlots });
  } catch (error) {
    console.error("Error fetching teleconsultation availability:", error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
};

exports.bookTeleconsultation = async (req, res) => {
  try {
    const { doctorId, patientId, date, time } = req.body;

    const existingBooking = await TeleConsultation.findOne({
      doctorId,
      date: new Date(date),
      time,
    });

    if (existingBooking) {
      return res.status(400).json({
        message: "This slot is already booked. Please choose another time.",
      });
    }

    const sessionId = `${doctorId}-${patientId}-${new Date().getTime()}`;
    const meetingLink = generateMeetingLink(sessionId);

    const newBooking = new TeleConsultation({
      doctorId,
      patientId,
      date: new Date(date),
      time,
      meetingLink,
      status: "confirmed",
    });

    await newBooking.save();

    res.status(201).json({
      message: "Teleconsultation booked successfully",
      meetingLink,
    });
  } catch (error) {
    console.error("Error booking teleconsultation:", error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
};

exports.viewTeleconsultations = async (req, res) => {
  const { patientId } = req.params;
  const dayStart = new Date();
  dayStart.setHours(0, 0, 0, 0);
  try {
    const teleconsultations = await TeleConsultation.find({
      patientId,
      date: { $gte: dayStart },
    })
      .populate("doctorId", "name")
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
        doctorName: tc.doctorId ? tc.doctorId.name : "Unknown Doctor",
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

exports.getProfile = async (req, res) => {
  const { patientId } = req.params;
  try {
    const userInfo = await Auth.aggregate([
      {
        $match: { userId: new mongoose.Types.ObjectId(patientId) },
      },
      {
        $lookup: {
          from: "patients",
          localField: "userId",
          foreignField: "_id",
          as: "userInfo",
        },
      },
      {
        $unwind: "$userInfo",
      },
      {
        $project: {
          _id: 0,
          email: 1,
          "userInfo.name": 1,
          "userInfo.age": 1,
          "userInfo.gender": 1,
          "userInfo.contact": 1,
          "userInfo.address": 1,
        },
      },
    ]);
    if (!userInfo || userInfo.length === 0) {
      return res.status(400).json({ message: "Something went wrong" });
    }
    return res.status(200).json(userInfo[0]);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error please try again later" });
  }
};
exports.updateProfile = async (req, res) => {
  const { patientId } = req.params;
  const { name, age, gender, contact, address } = req.body;

  try {
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    patient.name = name || patient.name;
    patient.age = age || patient.age;
    patient.gender = gender || patient.gender;
    patient.contact = contact || patient.contact;
    patient.address = address || patient.address;

    await patient.save();

    return res.status(200).json({
      message: "Profile updated successfully",
      userInfo: patient,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res
      .status(500)
      .json({ message: "Server error, please try again later" });
  }
};
exports.pendingBills = async (req, res) => {
  const { patient_id } = req.params;
  try {
    const appointment = await Appointment.find({
      patient_id,
      paymentStatus: "pending",
      status: "completed",
    }).populate("doctor_id", "name specialty");
    const pharmacy = await ConfirmedPharmacyBill.find({
      patientId: patient_id,
      payment: "pending",
    });
    const lab = await ConfirmedLabBill.find({
      patientId: patient_id,
      payment: "pending",
    });
    return res.status(200).json({ appointment, pharmacy, lab });
  } catch (error) {
    console.error("Server error: ", error);
    return res.status(500).json({ message: "Server error" });
  }
};
exports.completedBills = async (req, res) => {
  const { patient_id } = req.params;
  try {
    const appointment = await Appointment.find({
      patient_id,
      paymentStatus: "completed",
    }).populate("doctor_id", "name specialty");
    const pharmacy = await ConfirmedPharmacyBill.find({
      patientId: patient_id,
      payment: "completed",
    });
    const lab = await ConfirmedLabBill.find({
      patientId: patient_id,
      payment: "completed",
    });
    const teleconsultationData = await TeleConsultation.find({
      patientId: patient_id,
    }).populate("doctorId", "name specialty");
    const teleconsultation = teleconsultationData.map((tc) => ({
      ...tc.toObject(),
      totalAmount: 1500,
      paymentMode: 'online'
    }))
    return res
      .status(200)
      .json({ appointment, pharmacy, lab, teleconsultation });
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
        { $set: { paymentStatus: "completed",
          paymentMode: 'online'
         } }
      );
    } else if (type === "pharmacy") {
      updatedBill = await ConfirmedPharmacyBill.updateOne(
        { _id: billId },
        { $set: { payment: "completed",
            paymentMode: 'online'
         } }
      );
    } else if (type === "lab") {
      updatedBill = await ConfirmedLabBill.updateOne(
        { _id: billId },
        { $set: { payment: "completed",
          paymentMode: 'online'
         } }
      );
    } else {
      return res.status(400).json({ message: "Invalid bill type" });
    }

    if (updatedBill.matchedCount === 0) {
      return res.status(404).json({ message: "Bill not found" });
    }

    res.status(200).json({ message: "Bill marked as completed successfully" });
  } catch (error) {
    console.error("Error updating bill:", error);
    res.status(500).json({ message: "Failed to mark bill as completed", error });
  }
};
