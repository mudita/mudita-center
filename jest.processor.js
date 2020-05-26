const path = require("path")
const { updateThresholds } = require("jest-coverage-processor")
const configPath = path.resolve(__dirname, "./jest.config.js")

module.exports = results => updateThresholds(results, { configPath })
