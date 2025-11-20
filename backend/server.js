const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./src/config/db");
const errorHandler = require("./src/utils/errorHandler");

// Load environment variables
dotenv.config();
connectDB();

const app = express();

// Allowed frontend origins
const allowedOrigins = [
  "http://localhost:5173",                       // Local Dev
  "https://crypto-alpha-task.vercel.app"         // LIVE FRONTEND URL
];

// CORS Configuration
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("❌ CORS Blocked:", origin);
        callback(new Error("Not allowed by CORS: " + origin));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middlewares
app.use(express.json());
app.use(morgan("dev"));

// Health Check Route
app.get("/", (req, res) => {
  res.json({ message: "Crypto Alpha API running" });
});

// API Routes
app.use("/api/auth", require("./src/routes/authRoutes"));
app.use("/api/profile", require("./src/routes/profileRoutes"));
app.use("/api/signals", require("./src/routes/signalRoutes"));

// Global Error Handler
app.use(errorHandler);

// Server Listener
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
