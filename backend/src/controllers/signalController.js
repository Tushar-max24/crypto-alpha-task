const { validationResult } = require("express-validator");
const Signal = require("../models/Signal");

const getSignals = async (req, res, next) => {
  const { search, riskLevel } = req.query;
  const query = { user: req.user.id };

  if (search) query.pair = { $regex: search, $options: "i" };
  if (riskLevel) query.riskLevel = riskLevel;

  try {
    const signals = await Signal.find(query).sort({ createdAt: -1 });
    res.json(signals);
  } catch (err) {
    next(err);
  }
};

const createSignal = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const signal = await Signal.create({
      ...req.body,
      user: req.user.id
    });
    res.status(201).json(signal);
  } catch (err) {
    next(err);
  }
};

const updateSignal = async (req, res, next) => {
  try {
    const signal = await Signal.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { $set: req.body },
      { new: true }
    );
    if (!signal)
      return res.status(404).json({ message: "Signal not found" });

    res.json(signal);
  } catch (err) {
    next(err);
  }
};

const deleteSignal = async (req, res, next) => {
  try {
    const signal = await Signal.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });
    if (!signal)
      return res.status(404).json({ message: "Signal not found" });

    res.json({ message: "Signal deleted" });
  } catch (err) {
    next(err);
  }
};

module.exports = { getSignals, createSignal, updateSignal, deleteSignal };
