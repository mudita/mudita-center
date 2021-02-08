/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

jest.mock("pure", () => ({
  ...jest.requireActual("pure"),
  default: {},
}))

const pure = require("pure")

module.exports = pure
