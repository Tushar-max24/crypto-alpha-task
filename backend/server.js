const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./src/config/db");
const errorHandler = require("./src/utils/errorHandler");

dotenv.config();
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Health Check
app.get("/", (req, res) => {
  res.json({ message: "Crypto Alpha API running" });
});

// Routes
app.use("/api/auth", require("./src/routes/authRoutes"));
app.use("/api/profile", require("./src/routes/profileRoutes"));
app.use("/api/signals", require("./src/routes/signalRoutes"));

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
