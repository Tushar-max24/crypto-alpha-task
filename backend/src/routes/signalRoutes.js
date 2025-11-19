const express = require("express");
const auth = require("../middleware/auth");
const {
  getSignals,
  createSignal,
  updateSignal,
  deleteSignal
} = require("../controllers/signalController");
const {
  createSignalValidation
} = require("../validations/signalValidation");

const router = express.Router();

router.get("/", auth, getSignals);
router.post("/", auth, createSignalValidation, createSignal);
router.put("/:id", auth, updateSignal);
router.delete("/:id", auth, deleteSignal);

module.exports = router;
