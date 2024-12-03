const bcrypt = require("bcrypt");
const saltRounds = 10;
const crypto = require("crypto");
const Patient = require("../models/Patients");
const Auth = require("../models/Auth");
const sendEmail = require("../utils/sendEmail");

exports.registerPatient = async (req, res) => {
  const { name, age, gender, contact, address, email, password } = req.body;
  try {
    const isUserExist = await Auth.findOne({ email });
    if (isUserExist) {
      return res.status(400).json({ message: "Patient with the email address already exists" });
    }
    const hashPassword = await bcrypt.hash(password, saltRounds);
    const newPatient = new Patient({ name, age, gender, contact, address });
    const savePatient = await newPatient.save();

    const newAuth = new Auth({
      email,
      password: hashPassword,
      userId: savePatient._id,
      userTypeModel: "Patient",
    });
    await newAuth.save();
    return res.status(201).json({ message: "Patient registered successfully!" });
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({ message: "Server error during registration" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Auth.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }
    req.session.userId = user.userId;
    req.session.userTypeModel = user.userTypeModel;

    return res.status(200).json({
      message: "Login successful",
      userTypeModel: user.userTypeModel,
      userId: user.userId
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Server error during login" });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await Auth.findOne({ email });
    if (!user || user.userTypeModel !== 'Patient') {
      return res.status(400).json({ message: "User with this email does not exist" });
    }
    const patientDetails = await Patient.findById(user.userId);
    if (!patientDetails){
      return res.status(400).json({message: 'Patient details not found'})
    }
    const resetToken = crypto.randomBytes(32).toString("hex");
    const tokenExpiry = Date.now() + 3600000;

    user.resetToken = resetToken;
    user.resetTokenExpiry = tokenExpiry;
    await user.save();

    const resetLink = `http://localhost:3000/reset-password/${resetToken}`;
    const mailOptions = {
      to: email,
      subject: "Password Reset Request",
      html: `<p>Hey ${patientDetails.name || "User"} <br> You requested a password reset. Click <a href="${resetLink}">here</a> to reset your password. If you didn't request this, please ignore this email.</p>`,
    };
    await sendEmail(mailOptions);
    return res.status(200).json({ message: "Password reset link sent to your email" });
  } catch (error) {
    console.error("Error processing forgot password request:", error);
    return res.status(500).json({ message: "Server error during password reset" });
  }
};

exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const user = await Auth.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }
    const hashPassword = await bcrypt.hash(password, saltRounds);
    user.password = hashPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;

    await user.save();
    return res.status(200).json({ message: "Password has been reset successfully" });
  } catch (error) {
    console.error("Error resetting password:", error);
    return res.status(500).json({ message: "Server error during password reset" });
  }
};
exports.updatePassword = async (req, res) => {
  const { resetToken, newPassword } = req.body;
  try {
    const user = await Auth.findOne({ resetToken });

    if (!user) {
      return res.status(400).json({ message: "Invalid Token" });
    }
    const hashPassword = await bcrypt.hash(newPassword, saltRounds);

    user.password = hashPassword;
    user.resetToken = null;
    await user.save();

    return res.status(200).json({ message: "Password update successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the password" });
  }
};