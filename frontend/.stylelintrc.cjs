module.exports = {
  // Minimal config to prevent "Unknown at rule" errors for Tailwind directives
  rules: {
    "at-rule-no-unknown": [
      true,
      {
        "ignoreAtRules": ["tailwind", "apply", "variants", "responsive", "screen"]
      }
    ]
  }
};
