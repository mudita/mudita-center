/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import PureLogger, {
  ScrubProps,
} from "App/__deprecated__/main/utils/pure-logger"
import logger from "App/__deprecated__/main/utils/logger"
import { flags } from "App/feature-flags"

jest.mock("App/feature-flags")

describe("Pure Logger main util", () => {
  describe("when does not apply to File System Endpoint ", () => {
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

    test("body is scrubbed if Feature.LogsScrubbingEnabled toggle isn't set to false", () => {
      jest.spyOn(flags, "get").mockReturnValueOnce(true)
      jest.spyOn(logger, "info")
      const pureLogger = new PureLogger()
      pureLogger.info(mockScrubPropsMessage)
      expect(logger.info).toBeCalledWith(mockScrubbedMessage)
    })

    test("body is scrubbed if Feature.LogsScrubbingEnabled toggle is to true", () => {
      jest.spyOn(flags, "get").mockReturnValueOnce(true)
      jest.spyOn(logger, "info")
      const pureLogger = new PureLogger()
      pureLogger.info(mockScrubPropsMessage)
      expect(logger.info).toBeCalledWith(mockScrubbedMessage)
    })

    test("body isn't scrubbed if Feature.LogsScrubbingEnabled toggle is to false ", () => {
      jest.spyOn(flags, "get").mockReturnValueOnce(false)
      jest.spyOn(logger, "info")
      const pureLogger = new PureLogger()
      pureLogger.info(mockScrubPropsMessage)
      expect(logger.info).toBeCalledWith(mockNoScrubbedMessage)
    })
  })
  describe("when scrubs props are relative to File System Endpoint ", () => {
    const mockScrubProps: ScrubProps[] = [
      {
        body: {
          txID: "6",
          chunkNo: 12,
          data: "W21haW5dICAgICBbMjAyMS0wNi0wOVQwNjowODoxMS43NDlaXSBbaW5mb106ICBTdGFydGluZyB0aGUgYXBwClttYWluXSAgICAgWzIwMjEtMDYtMDlUMDY6MDg6MTEuOTAwWl0gW2luZm9dOiAgUHJlcGFyaW5nIHRyYW5zbGF0aW9uIHVwZGF0ZSBmb3IgbGFuZ3VhZ2UgImVuLVVTIgpbbWFpbl0gICAgIFsyMDIxLTA2LTA5VDA2OjA4OjEyLjE2NFpdIFtpbmZvXTogIFRyYW5zbGF0aW9uIGZvciBsYW5ndWFnZSAiZW4tVVMiIGFwcGxpZWQgc3VjY2Vzc2Z1bGx5ClttYWluXSAgICAgWzIwMjEtMDYtMDlUMDY6MDg6MTIuMjA5Wl0gW2luZm9dOiAgQ2hlY2tpbmcgZm9yIHVwZGF0ZQpbbWFpbl0gICAgIFsyMDIxLTA2LTA5VDA2OjA4OjEyLjk2MlpdIFtpbmZvXTogIFVwZGF0ZSBmb3IgdmVyc2lvbiAxMy4wLjAgaXMgbm90IGF2YWlsYWJsZSAobGF0ZXN0IHZlcnNpb246IDEzLjAuMCwgZG93bmdyYWRlIGlzIGRpc2FsbG93ZWQpLgpbbWFpbl0gICAgIFsyMDIxLTA2LTA5VDA2OjA4OjEyLjk5MlpdIFtpbmZvXTogID09PT0gc2VyaWFsIHBvcnQ6IGxpc3QgPT09PQpbbWFpbl0gICAgIFsyMDIxLTA2LTA5VDA2OjA4OjEyLjk5MlpdIFtpbmZvXTogIFsKICB7CiAgICAicGF0aCI6ICIvZGV2L3R0eS5CbHVldG9vdGgtSW5jb21pbmctUG9ydCIKICB9Cl0KW21haW5dICAgICBbMjAyMS0wNi0wOVQwNzo1NDo1NC44MTdaXSBbaW5mb106ICBQcmVwYXJpbmcgdHJhbnNsYXRpb24gdXBkYXRlIGZvciBsYW5ndWFnZSAiZW4tVVMiClttYWluXSAgICAgWzIwMjEtMDYtMDlUMDc6NTQ6NTUuMTYxWl0gW2luZm9dOiAgVHJhbnNsYXRpb24gZm9yIGxhbmd1YWdlICJlbi1VUyIgYXBwbGllZCBzdWNjZXNzZnVsbHkKW21haW5dICAgICBbMjAyMS0wNi0wOVQwNzo1NDo1NS4xODlaXSBbaW5mb106ICBDaGVja2luZyBmb3IgdXBkYXRlClttYWluXSAgICAgWzIwMjEtMDYtMDlUMDc6NTQ6NTUuODgxWl0gW2luZm9dOiAgVXBkYXRlIGZvciB2ZXJzaW9uIDEzLjAuMCBpcyBub3QgYXZhaWxhYmxlIChsYXRlc3QgdmVyc2lvbjogMTMuMC4wLCBkb3duZ3JhZGUgaXMgZGlzYWxsb3dlZCkuClttYWluXSAgICAgWzIwMjEtMDYtMDlUMDc6NTQ6NTYuMjY5Wl0gW2luZm9dOiAgPT09PSBzZXJpYWwgcG9ydDogbGlzdCA9PT09ClttYWluXSAgICAgWzIwMjEtMDYtMDlUMDc6NTQ6NTYuMjcwWl0gW2luZm9dOiAgWwogIHsKICAgICJwYXRoIjogIi9kZXYvdHR5LkJsdWV0b290aC1JbmNvbWluZy1Qb3J0IgogIH0KXQpbbWFpbl0gICAgIFsyMDIxLTA2LTA5VDA3OjU0OjU2LjI3MFpdIFtpbmZvXTogID09PT0gc2VyaWFsIHBvcnQ6IGxpc3QgPT09PQpbbWFpbl0gICAgIFsyMDIxLTA2LTA5VDA3OjU0OjU2LjI3MVpdIFtpbmZvXTogIFsKICB7CiAgICAicGF0aCI6ICIvZGV2L3R0eS5CbHVldG9vdGgtSW5jb21pbmctUG9ydCIKICB9Cl0KW21haW5dICAgICBbMjAyMS0wNi0wOVQxMTo0NjoyMy42MDNaXSBbaW5mb106ICBTdGFydGluZyB0aGUgYXBwClttYWluXSAgICAgWzIwMjEtMDYtMDlUMTE6NDY6MjMuNzAzWl0gW2luZm9dOiAgUHJlcGFy",
        },
        endpoint: 3,
        status: 200,
        uuid: 53,
      },
    ]

    const mockScrubPropsMessage = JSON.stringify(mockScrubProps, null, 2)
    const mockScrubbedMessage = `[
  {
    "body": "scrubbed",
    "endpoint": 3,
    "status": 200,
    "uuid": 53
  }
]`
    const mockNoScrubbedMessage = `[
  {
    "body": {
      "txID": "6",
      "chunkNo": 12,
      "data": "scrubbed"
    },
    "endpoint": 3,
    "status": 200,
    "uuid": 53
  }
]`

    afterEach(() => {
      jest.clearAllMocks()
    })

    test("body is scrubbed if Feature.LogsScrubbingEnabled toggle isn't set to false ", () => {
      jest.spyOn(flags, "get").mockReturnValueOnce(true)
      jest.spyOn(logger, "info")
      const pureLogger = new PureLogger()
      pureLogger.info(mockScrubPropsMessage)
      expect(logger.info).toBeCalledWith(mockScrubbedMessage)
    })

    test("body is scrubbed if Feature.LogsScrubbingEnabled toggle is to true ", () => {
      jest.spyOn(flags, "get").mockReturnValueOnce(true)
      jest.spyOn(logger, "info")
      const pureLogger = new PureLogger()
      pureLogger.info(mockScrubPropsMessage)
      expect(logger.info).toBeCalledWith(mockScrubbedMessage)
    })

    test("body isn't scrubbed if Feature.LogsScrubbingEnabled toggle is to false ", () => {
      jest.spyOn(flags, "get").mockReturnValueOnce(false)
      jest.spyOn(logger, "info")
      const pureLogger = new PureLogger()
      pureLogger.info(mockScrubPropsMessage)
      expect(logger.info).toBeCalledWith(mockNoScrubbedMessage)
    })
  })
})
