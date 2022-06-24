/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { AnyAction } from "@reduxjs/toolkit"
import { Event } from "App/crash-dump/constants"
import { getCrashDumpsRequest } from "App/crash-dump/requests/get-crash-dumps.request"
import { getCrashDump } from "App/crash-dump/actions/get-crash-dump.action"
import { GetCrashDumpError } from "App/crash-dump/errors"
import { testError } from "App/__deprecated__/renderer/store/constants"
import { RequestResponseStatus } from "App/core/types/request-response.interface"

jest.mock("App/crash-dump/requests/get-crash-dumps.request")

const crashDumpsMock: string[] = ["/pure/logs/crash-dumps/file.hex"]

describe("Get Device Crash Dump Files request returns `success` status", () => {
  describe("Crash dumps already loaded from device", () => {
    test("fire async `getDeviceCrashDumpFiles` returns `undefined`", async () => {
      ;(getCrashDumpsRequest as jest.Mock).mockReturnValue({
        status: RequestResponseStatus.Ok,
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

      expect(getCrashDumpsRequest).not.toHaveBeenCalled()
    })
  })

  describe("Crash dumps doesnt loaded yet", () => {
    test("fire async `getDeviceCrashDumpFiles` returns list of crash dump files", async () => {
      ;(getCrashDumpsRequest as jest.Mock).mockReturnValue({
        status: RequestResponseStatus.Ok,
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
        getCrashDump.fulfilled(RequestResponseStatus.Ok, requestId),
      ])

      expect(getCrashDumpsRequest).toHaveBeenCalled()
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

    ;(getCrashDumpsRequest as jest.Mock).mockReturnValueOnce({
      status: RequestResponseStatus.Error,
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
