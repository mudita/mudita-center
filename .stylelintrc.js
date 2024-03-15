module.exports = {
  extends: "@mudita/stylelint-config",
  rules: {
    "no-descending-specificity": null,
    "selector-type-no-unknown": [true, { ignoreTypes: ["$dummyValue"] }],
  },
}
