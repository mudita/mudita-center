/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

const nxPreset = require("@nx/jest/preset").default

module.exports = {
  ...nxPreset,
  ci: process.env.CI === "true",
  collectCoverage: true,
  coverageReporters: ["lcov", "text-summary", "json-summary", "text"],
  coverageDirectory: "coverage",
  passWithNoTests: true,
  setupFilesAfterEnv: [`${__dirname}/jest.setup.js`],
}
