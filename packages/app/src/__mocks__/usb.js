/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

jest.mock("usb", () => ({
  __esModule: true,
  usb: {
    on: jest.fn,
  },
}))

const usb = require("usb")

module.exports = usb
