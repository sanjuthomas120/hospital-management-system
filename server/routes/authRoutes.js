const express = require("express");
const { registerPatient, login, forgotPassword, resetPassword, updatePassword } = require("../controllers/authController");

const router = express.Router();

router.post("/register-patient", registerPatient);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/change-password", updatePassword)

module.exports = router;
