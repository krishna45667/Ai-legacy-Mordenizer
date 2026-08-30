const History = require("../models/History");

// GET /api/history
const getUserHistory = async (req, res) => {
  try {
    const historyItems = await History.find({
      userId: req.user.id
    })
      .sort({ createdAt: -1 })
      .limit(50);

    return res.status(200).json(historyItems);

  } catch (error) {
    console.error("Fetch history error:", error);

    return res.status(500).json({
      error: "Failed to retrieve code history."
    });
  }
};

// POST /api/history
const saveHistory = async (req, res) => {
  try {
    const {
      originalCode,
      updatedCode,
      explanation
    } = req.body;

    if (!originalCode || !updatedCode || !explanation) {
      return res.status(400).json({
        error: "Original code, updated code, and explanation are required."
      });
    }

    const historyRecord = await History.create({
      userId: req.user.id,
      originalCode,
      updatedCode,
      explanation
    });

    return res.status(201).json(historyRecord);

  } catch (error) {
    console.error("Save history error:", error);

    return res.status(500).json({
      error: "Failed to save code history."
    });
  }
};

module.exports = {
  getUserHistory,
  saveHistory
};