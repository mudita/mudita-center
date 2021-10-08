/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { AnyAction } from "@reduxjs/toolkit"
import { Event } from "App/crash-dump/constants"
import { DeviceResponseStatus } from "Backend/adapters/device-response.interface"
import getDeviceCrashDumpFiles from "Renderer/requests/get-device-crash-dump-files.request"
import { getCrashDump } from "App/crash-dump/actions/get-crash-dump.action"
import { GetCrashDumpError } from "App/crash-dump/errors"
import { testError } from "App/renderer/store/constants"

jest.mock("Renderer/requests/get-device-crash-dump-files.request")

const crashDumpsMock: string[] = ["/pure/logs/crash-dumps/file.hex"]

describe("Get Device Crash Dump Files request returns `success` status", () => {
  describe("Crash dumps already loaded from device", () => {
    test("fire async `getDeviceCrashDumpFiles` returns `undefined`", async () => {
      ;(getDeviceCrashDumpFiles as jest.Mock).mockReturnValue({
        status: DeviceResponseStatus.Ok,
        data: [],
      })

      const mockStore = createMockStore([thunk])({
        crashDump: {
          data: {
            files: crashDumpsMock,
          },
        },
      })

      const {
        meta: { requestId },
      } = await mockStore.dispatch(getCrashDump() as unknown as AnyAction)

      expect(mockStore.getActions()).toEqual([
        getCrashDump.pending(requestId),
        getCrashDump.fulfilled(undefined, requestId),
      ])

      expect(getDeviceCrashDumpFiles).not.toHaveBeenCalled()
    })
  })

  describe("Crash dumps doesnt loaded yet", () => {
    test("fire async `getDeviceCrashDumpFiles` returns list of crash dump files", async () => {
      ;(getDeviceCrashDumpFiles as jest.Mock).mockReturnValue({
        status: DeviceResponseStatus.Ok,
        data: crashDumpsMock,
      })

      const mockStore = createMockStore([thunk])({
        crashDump: {
          data: {
            files: [],
          },
        },
      })

      const {
        meta: { requestId },
      } = await mockStore.dispatch(getCrashDump() as unknown as AnyAction)

      expect(mockStore.getActions()).toEqual([
        getCrashDump.pending(requestId),
        {
          type: Event.SetCrashDump,
          payload: crashDumpsMock,
        },
        getCrashDump.fulfilled(DeviceResponseStatus.Ok, requestId),
      ])

      expect(getDeviceCrashDumpFiles).toHaveBeenCalled()
    })
  })
})

describe("Get Device Crash Dump Files request returns `error` status", () => {
  test("fire async `getCrashDump` action and execute `rejected` event", async () => {
    const mockStore = createMockStore([thunk])({
      crashDump: {
        data: {
          files: [],
        },
      },
    })

    ;(getDeviceCrashDumpFiles as jest.Mock).mockReturnValueOnce({
      status: DeviceResponseStatus.Error,
    })

    const errorMock = new GetCrashDumpError(
      "Getting crash dumps from device isn't possible"
    )
    const {
      meta: { requestId },
    } = await mockStore.dispatch(getCrashDump() as unknown as AnyAction)

    expect(mockStore.getActions()).toEqual([
      getCrashDump.pending(requestId),
      getCrashDump.rejected(testError, requestId, undefined, errorMock),
    ])
  })
})
