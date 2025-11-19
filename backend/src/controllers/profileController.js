const User = require("../models/User");

const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    next(err);
  }
};

const updateProfile = async (req, res, next) => {
  const { name } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: { name } },
      { new: true }
    ).select("-password");

    res.json(user);
  } catch (err) {
    next(err);
  }
};

module.exports = { getProfile, updateProfile };
