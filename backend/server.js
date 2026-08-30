const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const modernizeRoutes = require("./routes/modernizeRoutes");
const authRoutes = require("./routes/authRoutes");
const historyRoutes = require("./routes/historyRoutes");

const app = express();

// Connect MongoDB
connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/modernize", modernizeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/history", historyRoutes);

app.get("/", (req, res) => {
    res.send("AI Legacy Backend is running!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});