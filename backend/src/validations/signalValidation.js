const { body } = require("express-validator");

const createSignalValidation = [
  body("pair").notEmpty().withMessage("Pair is required"),
  body("entryPrice")
    .isNumeric()
    .withMessage("Entry price must be a number"),
  body("targetPrice")
    .isNumeric()
    .withMessage("Target price must be a number"),
  body("riskLevel")
    .optional()
    .isIn(["Low", "Medium", "High"])
    .withMessage("Risk level must be Low, Medium or High")
];

module.exports = { createSignalValidation };
