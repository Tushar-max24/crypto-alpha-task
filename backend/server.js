const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./src/config/db");
const errorHandler = require("./src/utils/errorHandler");

dotenv.config();
connectDB();

const app = express();

// Allowed frontend origins
const allowedOrigins = [
  "http://localhost:5173",                         // local dev frontend
  "https://crypto-alpha.vercel.app",              // Vercel frontend
];

// CORS config
app.use(
  cors({
    origin: function (origin, callback) {
      // allow same server/no origin (Postman, etc.)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS blocked from: " + origin));
      }
    },
    credentials: true,
  })
);

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
