/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

jest.mock("usb", () => ({
  __esModule: true,
  default: {
    on: jest.fn,
  },
}))

const usb = require("usb")

module.exports = usb
