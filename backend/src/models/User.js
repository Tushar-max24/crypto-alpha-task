const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },

    // NEW FIELDS
    country: { type: String, default: "" },
    bio: { type: String, default: "", maxlength: 300 },
    notifications: { type: Boolean, default: true },
    theme: {
      type: String,
      enum: ["dark", "light", "system"],
      default: "dark",
    },
    avatar: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
