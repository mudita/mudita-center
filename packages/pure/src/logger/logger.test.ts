/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Logger, { PureLogger, ConsoleLogger } from "./logger"

let logger: PureLogger

beforeEach(() => {
  logger = new Logger()
})

afterEach(() => {
  jest.clearAllMocks()
})

jest.spyOn(global.console, "info")

test("console info isn't called by default ", () => {
  logger.info("")
  expect(console.info).not.toBeCalled()
})

test("console info is called if is enabled ", () => {
  logger.toggleLogs(true)
  logger.info("")
  expect(console.info).toBeCalled()
})

test("console info isn't called if is disabled ", () => {
  logger.toggleLogs(false)
  logger.info("")
  expect(console.info).not.toBeCalled()
})

test("registration custom logger works properly ", () => {
  const l: ConsoleLogger = {
    info: jest.fn(),
  }
  logger.registerLogger(l)
  logger.toggleLogs(true)
  logger.info("")
  expect(console.info).not.toBeCalled()
  expect(l.info).toBeCalled()
})
