/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

const nxPreset = require("@nx/jest/preset").default

module.exports = {
  ...nxPreset,
  moduleNameMapper: {
    ...nxPreset.moduleNameMapper,
    "App/(.*)": `${__dirname}/apps/mudita-center/src/$1`,
    "Core/(.*)": `${__dirname}/libs/core/$1`,
    "p-queue$": `${__dirname}/__mocks__/p-queue.ts`,
  },
  setupFilesAfterEnv: [`${__dirname}/jest.setup.js`],
}
