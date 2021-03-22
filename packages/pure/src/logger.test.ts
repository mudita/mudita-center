/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

let logger: any

beforeEach(() => {
  jest.isolateModules(() => {
    const loggerModule = require("./logger")
    logger = loggerModule.default
  })
})

afterEach(() => {
  jest.clearAllMocks()
})

jest.spyOn(global.console, "log")

test("console log isn't called by default ", () => {
  logger.log("")
  expect(console.log).not.toBeCalled()
})

test("console log is called if is enabled ", () => {
  logger.toggleLogs(true)
  logger.log("")
  expect(console.log).toBeCalled()
})

test("console log isn't called if is disabled ", () => {
  logger.toggleLogs(false)
  logger.log("")
  expect(console.log).not.toBeCalled()
})
