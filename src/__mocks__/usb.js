jest.mock('usb', () => ({
  __esModule: true,
  default: {
    on: jest.fn
  }
}))

const usb = require("usb")

module.exports = usb
