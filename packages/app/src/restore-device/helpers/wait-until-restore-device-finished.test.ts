/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { waitUntilRestoreDeviceFinished } from "App/restore-device/helpers/wait-until-restore-device-finished"
import getRestoreDeviceStatus from "App/__deprecated__/renderer/requests/get-restore-device-status.request"
import getUnlockDeviceStatus from "App/__deprecated__/renderer/requests/get-unlock-device-status.request"
import {
  GetRestoreDeviceStatusDataState,
  GetRestoreDeviceStatusResponseBody,
} from "@mudita/pure"
import {
  RequestResponse,
  RequestResponseStatus,
} from "App/core/types/request-response.interface"

jest.mock("App/__deprecated__/renderer/requests/get-restore-device-status.request")
jest.mock("App/__deprecated__/renderer/requests/get-unlock-device-status.request")

const successGetRestoreDeviceResponse: RequestResponse<GetRestoreDeviceStatusResponseBody> =
  {
    status: RequestResponseStatus.Ok,
    data: {
      id: "1",
      state: GetRestoreDeviceStatusDataState.Finished,
    },
  }
const runningGetRestoreDeviceResponse: RequestResponse<GetRestoreDeviceStatusResponseBody> =
  {
    status: RequestResponseStatus.Ok,
    data: {
      id: "1",
      state: GetRestoreDeviceStatusDataState.Running,
    },
  }

const errorGetRestoreDeviceResponse: RequestResponse<GetRestoreDeviceStatusResponseBody> =
  {
    status: RequestResponseStatus.Ok,
    data: {
      id: "1",
      state: GetRestoreDeviceStatusDataState.Error,
    },
  }

const successDeviceResponse: RequestResponse = {
  status: RequestResponseStatus.Ok,
}
const errorDeviceResponse: RequestResponse = {
  status: RequestResponseStatus.Error,
}

beforeEach(() => {
  // mock timer to call callbacks immediately
  jest
    .spyOn(window, "setTimeout")
    .mockImplementation((handler: () => any) => handler())
})

afterEach(() => {
  jest.resetAllMocks()
})

describe("`waitUntilRestoreDeviceFinished` helper ", () => {
  describe("when each request return success immediately", () => {
    test("function should returns OK status", async () => {
      ;(getRestoreDeviceStatus as jest.Mock).mockReturnValue(
        successGetRestoreDeviceResponse
      )
      ;(getUnlockDeviceStatus as jest.Mock).mockReturnValue(
        successDeviceResponse
      )

      const response = await waitUntilRestoreDeviceFinished("1")

      expect(getRestoreDeviceStatus).toHaveBeenCalled()
      expect(getUnlockDeviceStatus).toHaveBeenCalled()
      expect(response.status).toEqual(RequestResponseStatus.Ok)
    })
  })

  describe("when `getRestoreDeviceStatus` return success after next request", () => {
    test("function should returns OK status", async () => {
      let index = 0
      ;(getRestoreDeviceStatus as jest.Mock).mockImplementation(() => {
        if (index === 0) {
          index++
          return runningGetRestoreDeviceResponse
        } else {
          return successGetRestoreDeviceResponse
        }
      })
      ;(getUnlockDeviceStatus as jest.Mock).mockReturnValue(
        successDeviceResponse
      )

      const response = await waitUntilRestoreDeviceFinished("1")

      expect(getRestoreDeviceStatus).toHaveBeenCalledTimes(2)
      expect(getUnlockDeviceStatus).toHaveBeenCalledTimes(1)
      expect(response.status).toEqual(RequestResponseStatus.Ok)
    })
  })

  describe("when `getRestoreDeviceStatus` return error in next request ", () => {
    test("function should returns OK status", async () => {
      let index = 0
      ;(getRestoreDeviceStatus as jest.Mock).mockImplementation(() => {
        if (index === 0) {
          index++
          return runningGetRestoreDeviceResponse
        } else {
          return errorDeviceResponse
        }
      })
      ;(getUnlockDeviceStatus as jest.Mock).mockReturnValue(
        successDeviceResponse
      )

      const response = await waitUntilRestoreDeviceFinished("1")

      expect(getRestoreDeviceStatus).toHaveBeenCalledTimes(2)
      expect(getUnlockDeviceStatus).toHaveBeenCalledTimes(1)
      expect(response.status).toEqual(RequestResponseStatus.Ok)
    })
  })

  describe("when `getUnlockDeviceStatus` return success after next request", () => {
    test("function should returns OK status", async () => {
      ;(getRestoreDeviceStatus as jest.Mock).mockReturnValue(
        successGetRestoreDeviceResponse
      )

      let index = 0
      ;(getUnlockDeviceStatus as jest.Mock).mockImplementation(() => {
        if (index === 0) {
          index++
          return errorDeviceResponse
        } else {
          return successDeviceResponse
        }
      })

      const response = await waitUntilRestoreDeviceFinished("1")

      expect(getRestoreDeviceStatus).toHaveBeenCalledTimes(1)
      expect(getUnlockDeviceStatus).toHaveBeenCalledTimes(2)
      expect(response.status).toEqual(RequestResponseStatus.Ok)
    })
  })

  describe("when `getRestoreDeviceStatus` return error as response state", () => {
    test("function should returns Error status ", async () => {
      ;(getRestoreDeviceStatus as jest.Mock).mockReturnValue(
        errorGetRestoreDeviceResponse
      )

      const response = await waitUntilRestoreDeviceFinished("1")

      expect(getRestoreDeviceStatus).toHaveBeenCalledTimes(1)
      expect(getUnlockDeviceStatus).not.toHaveBeenCalled()
      expect(response.status).toEqual(RequestResponseStatus.Error)
    })
  })

  describe("when `getRestoreDeviceStatus` return error as response state next request", () => {
    test("function should returns Error status", async () => {
      let index = 0
      ;(getRestoreDeviceStatus as jest.Mock).mockImplementation(() => {
        if (index === 0) {
          index++
          return runningGetRestoreDeviceResponse
        } else {
          return errorGetRestoreDeviceResponse
        }
      })
      ;(getUnlockDeviceStatus as jest.Mock).mockReturnValue(
        successDeviceResponse
      )

      const response = await waitUntilRestoreDeviceFinished("1")

      expect(getRestoreDeviceStatus).toHaveBeenCalledTimes(2)
      expect(getUnlockDeviceStatus).not.toHaveBeenCalled()
      expect(response.status).toEqual(RequestResponseStatus.Error)
    })
  })

  describe("when `getRestoreDeviceStatus` return error as request response", () => {
    test("function should returns Error status ", async () => {
      ;(getRestoreDeviceStatus as jest.Mock).mockReturnValue(
        errorDeviceResponse
      )

      const response = await waitUntilRestoreDeviceFinished("1")

      expect(getRestoreDeviceStatus).toHaveBeenCalledTimes(1)
      expect(getUnlockDeviceStatus).not.toHaveBeenCalled()
      expect(response.status).toEqual(RequestResponseStatus.Error)
    })
  })

  describe("when `getRestoreDeviceStatus` return timeouts", () => {
    test("function should returns Error status", async () => {
      ;(getRestoreDeviceStatus as jest.Mock).mockReturnValue(
        runningGetRestoreDeviceResponse
      )

      const response = await waitUntilRestoreDeviceFinished("1")

      expect(getRestoreDeviceStatus).toHaveBeenCalledTimes(24)
      expect(getUnlockDeviceStatus).not.toHaveBeenCalled()
      expect(response.status).toEqual(RequestResponseStatus.Error)
    })
  })

  describe("when `getUnlockDeviceStatus` return timeouts", () => {
    test("function should returns Error status", async () => {
      ;(getRestoreDeviceStatus as jest.Mock).mockReturnValue(
        successGetRestoreDeviceResponse
      )
      ;(getUnlockDeviceStatus as jest.Mock).mockReturnValue(errorDeviceResponse)

      const response = await waitUntilRestoreDeviceFinished("1")

      expect(getRestoreDeviceStatus).toHaveBeenCalledTimes(1)
      expect(getUnlockDeviceStatus).toHaveBeenCalledTimes(24)
      expect(response.status).toEqual(RequestResponseStatus.Error)
    })
  })
})
