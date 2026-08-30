const express = require("express");

const router = express.Router();

const {
    getUserHistory,
    saveHistory
} = require("../controller/historyController");

const { protect } = require("../middleware/authMiddleware");

router.use(protect);

router.get("/", getUserHistory);

router.post("/", saveHistory);

module.exports = router;
