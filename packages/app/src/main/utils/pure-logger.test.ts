/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import PureLogger, { ScrubProps } from "App/main/utils/pure-logger"
import logger from "App/main/utils/logger"

const mockScrubProps: ScrubProps[] = [
  {
    body: {
      gitTag: "release-0.74.1-internal",
    },
    endpoint: 1,
    status: 200,
    uuid: 53,
  },
]

const mockScrubPropsMessage = JSON.stringify(mockScrubProps, null, 2)
const mockScrubbedMessage = `[
  {
    "body": "scrubbed",
    "endpoint": 1,
    "status": 200,
    "uuid": 53
  }
]`
const mockNoScrubbedMessage = `[
  {
    "body": {
      "gitTag": "release-0.74.1-internal"
    },
    "endpoint": 1,
    "status": 200,
    "uuid": 53
  }
]`

afterEach(() => {
  jest.clearAllMocks()
})

test("body is scrubbed if LOGS_SCRUBBED env isn't set to false ", () => {
  process.env = {}
  jest.spyOn(logger, "info")
  const pureLogger = new PureLogger()
  pureLogger.info(mockScrubPropsMessage)
  expect(logger.info).toBeCalledWith(mockScrubbedMessage)
})

test("body is scrubbed if LOGS_SCRUBBED env is to true ", () => {
  process.env = { LOGS_SCRUBBED: "true" }
  jest.spyOn(logger, "info")
  const pureLogger = new PureLogger()
  pureLogger.info(mockScrubPropsMessage)
  expect(logger.info).toBeCalledWith(mockScrubbedMessage)
})

test("body isn't scrubbed if LOGS_SCRUBBED env is to false ", () => {
  process.env = { LOGS_SCRUBBED: "false" }
  jest.spyOn(logger, "info")
  const pureLogger = new PureLogger()
  pureLogger.info(mockScrubPropsMessage)
  expect(logger.info).toBeCalledWith(mockNoScrubbedMessage)
})
