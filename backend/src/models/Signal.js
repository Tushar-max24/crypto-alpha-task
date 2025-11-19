const mongoose = require("mongoose");

const signalSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    pair: { type: String, required: true, trim: true }, // e.g. BTC/USDT
    entryPrice: { type: Number, required: true },
    targetPrice: { type: Number, required: true },
    riskLevel: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium"
    },
    note: { type: String, trim: true },
    status: {
      type: String,
      enum: ["Open", "Closed"],
      default: "Open"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Signal", signalSchema);
