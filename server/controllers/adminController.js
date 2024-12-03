const bcrypt = require("bcrypt");
const saltRounds = 10;
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
const sendEmail = require("../utils/sendEmail");
const MedicineExpense = require("../models/MedicineExpense");

exports.adminAddDoctor = async (req, res) => {
  const { doctor_id, name, specialty, phone, experience, email, password } =
    req.body;
  console.log(req.body);

  const photoFile = req.file;

  try {
    const isDoctorExist = await Auth.findOne({ email });
    if (isDoctorExist) {
      return res
        .status(400)
        .json({ message: "Doctor with the email address is already exists" });
    }
    const hashPassword = await bcrypt.hash(password, saltRounds);
    const newDoctor = new Doctor({
      doctor_id,
      name,
      specialty,
      phone,
      experience,
      photo: photoFile ? `uploads/${photoFile.filename}` : undefined,
    });
    const saveDoctor = await newDoctor.save();

    const resetToken = crypto.randomBytes(32).toString("hex");

    const newAuth = new Auth({
      email,
      password: hashPassword,
      userId: saveDoctor._id,
      userTypeModel: "Doctor",
      resetToken,
    });

    const resetLink = `http://localhost:3000/change-password/${resetToken}`;
    const mailOptions = {
      to: email,
      subject: "Update your password",
      html: `<p> Hey Doctor, <br> Click <a href="${resetLink}">here</a> to update you password and then you can login with your email and password </p>`,
    };
    sendEmail(mailOptions);
    await newAuth.save();
    return res.status(201).json({ message: "Doctor details add successfully" });
  } catch (error) {
    console.error("Error during registration", error);
    return res.status(500).json({ message: "Its not yours it us" });
  }
};

exports.adminViewDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    return res.status(200).json(doctors);
  } catch (error) {
    console.error("Error fetching doctor details:", error);
    return res.status(500).json({ message: "Error fetching doctors" });
  }
};

exports.adminAddLab = async (req, res) => {
  const { name, phone, position, email, password } = req.body;

  try {
    const isLabExist = await Auth.findOne({ email });
    if (isLabExist) {
      return res.status(400).json({
        message: "Lab staff with the email address is already exists",
      });
    }
    const hashPassword = await bcrypt.hash(password, saltRounds);
    const newLab = new Lab({
      name,
      phone,
      position,
    });
    const saveLab = await newLab.save();
    const resetToken = crypto.randomBytes(32).toString("hex");
    const newAuth = new Auth({
      email,
      password: hashPassword,
      userId: saveLab._id,
      userTypeModel: "Lab-Section",
      resetToken,
    });
    const resetLink = `http://localhost:3000/change-password/${resetToken}`;
    const mailOptions = {
      to: email,
      subject: "Update your password",
      html: `<p> Hey Staff, <br> Click <a href="${resetLink}">here</a> to update you password and then you can login with your email and password </p>`,
    };
    sendEmail(mailOptions);
    await newAuth.save();
    return res
      .status(201)
      .json({ message: "Lab staff details add successfully" });
  } catch (error) {
    console.error("Error during registration", error);
    return res.status(500).json({ message: "Its not yours it us" });
  }
};

exports.adminAddAccount = async (req, res) => {
  const { name, phone, position, email, password } = req.body;

  try {
    const isAccountExist = await Auth.findOne({ email });
    if (isAccountExist) {
      return res.status(400).json({
        message: "Account staff with the email address is already exists",
      });
    }
    const hashPassword = await bcrypt.hash(password, saltRounds);
    const newAccount = new Account({
      name,
      phone,
      position,
    });
    const saveAccount = await newAccount.save();
    const resetToken = crypto.randomBytes(32).toString("hex");
    const newAuth = new Auth({
      email,
      password: hashPassword,
      userId: saveAccount._id,
      userTypeModel: "Account-Section",
      resetToken,
    });
    const resetLink = `http://localhost:3000/change-password/${resetToken}`;
    const mailOptions = {
      to: email,
      subject: "Update your password",
      html: `<p> Hey Account staff, <br> Click <a href="${resetLink}">here</a> to update you password and then you can login with your email and password </p>`,
    };
    sendEmail(mailOptions);
    await newAuth.save();
    return res
      .status(201)
      .json({ message: "Account staff details add successfully" });
  } catch (error) {
    console.error("Error during registration", error);
    return res.status(500).json({ message: "Its not yours it us" });
  }
};

exports.adminAddPharmacy = async (req, res) => {
  const { name, phone, position, email, password } = req.body;

  try {
    const isPharmacyExist = await Auth.findOne({ email });
    if (isPharmacyExist) {
      return res.status(400).json({
        message: "Pharmacy staff with the email address is already exists",
      });
    }
    const hashPassword = await bcrypt.hash(password, saltRounds);
    const newPharmacy = new Pharmacy({
      name,
      phone,
      position,
    });
    const savePharmacy = await newPharmacy.save();
    const resetToken = crypto.randomBytes(32).toString("hex");
    const newAuth = new Auth({
      email,
      password: hashPassword,
      userId: savePharmacy._id,
      userTypeModel: "Pharmacy",
      resetToken,
    });
    const resetLink = `http://localhost:3000/change-password/${resetToken}`;
    const mailOptions = {
      to: email,
      subject: "Update your password",
      html: `<p> Hey Pharmacy staff, <br> Click <a href="${resetLink}">here</a> to update you password and then you can login with your email and password </p>`,
    };
    sendEmail(mailOptions);
    await newAuth.save();
    return res
      .status(201)
      .json({ message: "Pharmacy staff details add successfully" });
  } catch (error) {
    console.error("Error during registration", error);
    return res.status(500).json({ message: "Its not yours it us" });
  }
};

exports.adminViewPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    return res.status(200).json(patients);
  } catch (error) {
    console.error("Error fetching patient details:", error);
    return res.status(500).json({ message: "Error fetching patients" });
  }
};
exports.adminViewAccounts = async (req, res) => {
  try {
    const accounts = await Account.find();
    return res.status(200).json(accounts);
  } catch (error) {
    console.error("Error fetching account details:", error);
    return res.status(500).json({ message: "Error fetching account" });
  }
};
exports.adminViewPharmacy = async (req, res) => {
  try {
    const pharmacy = await Pharmacy.find();
    return res.status(200).json(pharmacy);
  } catch (error) {
    console.error("Error fetching pharmacy details:", error);
    return res.status(500).json({ message: "Error fetching pharmacy" });
  }
};
exports.adminViewLab = async (req, res) => {
  try {
    const labs = await Lab.find();
    return res.status(200).json(labs);
  } catch (error) {
    console.error("Error fetching lab details:", error);
    return res.status(500).json({ message: "Error fetching lab" });
  }
};

exports.adminUpdateMedicine = async (req, res) => {
  const { medicineId } = req.params;
  const { name, cas, usage, price } = req.body;

  try {
    const updatedMedicine = await Medicine.findByIdAndUpdate(
      medicineId,
      { name, cas, usage, price },
      { new: true }
    );
    if (!updatedMedicine) {
      return res.status(404).json({ message: "Medicine not found" });
    }
    res.status(200).json(updatedMedicine);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update medicine details", error });
  }
};

exports.adminDeleteMedicine = async (req, res) => {
  const { medicineId } = req.params;
  try {
    const medicine = await Medicine.findByIdAndDelete(medicineId);
    if (!medicine) {
      return res.status(404).json({ message: "Medicine not found" });
    }
    res.status(200).json({ message: "Medicine deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete medicine", error });
  }
};

exports.adminUpdateTest = async (req, res) => {
  const { testId } = req.params;
  const { name, type, ndc, price } = req.body;

  try {
    const updatedTest = await Test.findByIdAndUpdate(
      testId,
      { name, type, ndc, price },
      { new: true }
    );
    if (!updatedTest) {
      return res.status(404).json({ message: "Test not found" });
    }
    res.status(200).json(updatedTest);
  } catch (error) {
    res.status(500).json({ message: "Failed to update test details", error });
  }
};

exports.adminDeleteTest = async (req, res) => {
  const { testId } = req.params;
  try {
    const test = await Test.findByIdAndDelete(testId);
    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }
    res.status(200).json({ message: "Test deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete test", error });
  }
};

exports.adminAddTest = async (req, res) => {
  const { name, type, ndc, price } = req.body;

  try {
    const existingTest = await Test.findOne({ name });
    if (existingTest) {
      return res
        .status(400)
        .json({ message: "A test with this name already exists." });
    }

    const newTest = new Test({ name, type, ndc, price });
    await newTest.save();

    return res
      .status(201)
      .json({ message: "Test added successfully!", test: newTest });
  } catch (error) {
    console.error("Error adding test:", error);
    return res
      .status(500)
      .json({ message: "Failed to add test.", error: error.message });
  }
};

exports.adminAddMedicine = async (req, res) => {
  const { name, cas, usage, price } = req.body;

  try {
    const existingMedicine = await Medicine.findOne({ name });
    if (existingMedicine) {
      return res
        .status(400)
        .json({ message: "A medicine with this name already exists." });
    }

    const newMedicine = new Medicine({ name, cas, usage, price });
    await newMedicine.save();

    return res
      .status(201)
      .json({ message: "Medicine added successfully!", medicine: newMedicine });
  } catch (error) {
    console.error("Error adding medicine:", error);
    return res
      .status(500)
      .json({ message: "Failed to add medicine.", error: error.message });
  }
};

exports.sendNotification = async (req, res) => {
  const { message, userTypes } = req.body;

  try {
    const newNotification = new Notification({ message, userTypes });
    await newNotification.save();

    res.status(201).json({ message: "Notification sent successfully!" });
  } catch (error) {
    console.error("Error sending notification:", error);
    res
      .status(500)
      .json({ message: "Failed to send notification.", error: error.message });
  }
};

exports.notifications = async (req, res) => {
  const { userType } = req.query;

  try {
    const notifications = await Notification.find({ userTypes: userType }).sort(
      { createdAt: -1 }
    );
    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({
      message: "Failed to fetch notifications.",
      error: error.message,
    });
  }
};

exports.leaveRequest = async (req, res) => {
  try {
    const leaveRequests = await DoctorLeave.find().populate("doctorId", "name");
    res.status(200).json(leaveRequests);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching leave requests.",
      error: error.message,
    });
  }
};

exports.approveLeaveRequest = async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  try {
    const request = await DoctorLeave.findById(id);
    if (!request) {
      return res.status(400).json({ message: "Leave request doesn't exist" });
    }
    request.status = status;
    await request.save();
    return res
      .status(200)
      .json({ message: `Doctor leave  ${status} successfully` });
  } catch (error) {
    console.error("Error in updating:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};
exports.viewEmptyMedicine = async (req, res) => {
  try {
    const emptyMedicines = await Medicine.find({
      status: 'empty'
    })
    return res.status(200).json(emptyMedicines);
  } catch (error) {
    console.error("Error in fetching:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
}
exports. updateAvailability =  async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const medicine = await Medicine.findById(id);

    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }

    medicine.status = status;
    await medicine.save();

    return res.status(200).json({ message: 'Medicine status updated successfully' });
  } catch (error) {
    console.error('Error updating medicine status:', error);
    return res.status(500).json({ message: 'Error updating medicine status' });
  }
}

exports.medicinePayment =  async (req, res) => {
  const { medicineId, paidAmount } = req.body;

  try {
    const newPayment = new MedicineExpense({
      medicineId,
      paidAmount,
      date: new Date(),
    });

    await newPayment.save();
    return res.status(201).json({ message: 'Payment recorded successfully' });
  } catch (error) {
    console.error('Error recording payment:', error);
    return res.status(500).json({ message: 'Error recording payment' });
  }
}
exports.deleteDoctor = async (req, res) => {
  const {doctorId} = req.params;
  try {
    const deleteDoctor = await Doctor.findByIdAndDelete(doctorId);
    if (!deleteDoctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    return res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (error) {
    console.error('Some error occurred: ', error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
exports.deletePatient = async (req, res) => {
  const {patientId} = req.params;
  try {
    const deletePatient = await Patient.findByIdAndDelete(patientId);
    if (!deletePatient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    return res.status(200).json({ message: "Patient deleted successfully" });
  } catch (error) {
    console.error('Some error occurred: ', error);
    return res.status(500).json({ message: "Internal server error" });
  }
}