const express = require("express");
const { getTotalDetails, pendingBills, completePendingBills } = require("../controllers/accountController");

const router = express.Router();

router.get("/total-counts", getTotalDetails);
router.get('/pending-bills', pendingBills);
router.patch('/complete-bill/:type/:billId', completePendingBills)
module.exports = router;
