module.exports = {
  extends: "@mudita/stylelint-config",
  rules: {
    "no-descending-specificity": null,
    "value-no-vendor-prefix": null,
    "selector-type-no-unknown": [true, { ignoreTypes: ["$dummyValue"] }],
  },
}
