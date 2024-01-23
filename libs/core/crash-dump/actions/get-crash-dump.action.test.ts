/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AnyAction } from "@reduxjs/toolkit"
import { AppError } from "Core/core/errors"
import { RequestResponseStatus } from "Core/core/types/request-response.interface"
import { getCrashDump } from "Core/crash-dump/actions/get-crash-dump.action"
import { CrashDumpError, Event } from "Core/crash-dump/constants"
import { getCrashDumpsRequest } from "Core/crash-dump/requests/get-crash-dumps.request"
import { testError } from "Core/__deprecated__/renderer/store/constants"
import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"

jest.mock("Core/crash-dump/requests/get-crash-dumps.request")

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
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/await-thenable
      } = await mockStore.dispatch(getCrashDump() as unknown as AnyAction)

      expect(mockStore.getActions()).toEqual([
        getCrashDump.pending(requestId),
        {
          type: Event.SetCrashDump,
          payload: [],
        },
        getCrashDump.fulfilled(undefined, requestId),
      ])

      expect(getCrashDumpsRequest).toHaveBeenCalled()
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
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/await-thenable
      } = await mockStore.dispatch(getCrashDump() as unknown as AnyAction)

      expect(mockStore.getActions()).toEqual([
        getCrashDump.pending(requestId),
        {
          type: Event.SetCrashDump,
          payload: crashDumpsMock,
        },
        getCrashDump.fulfilled(undefined, requestId),
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

    const errorMock = new AppError(
      CrashDumpError.Getting,
      "Getting crash dumps from device isn't possible"
    )
    const {
      meta: { requestId },
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/await-thenable
    } = await mockStore.dispatch(getCrashDump() as unknown as AnyAction)

    expect(mockStore.getActions()).toEqual([
      getCrashDump.pending(requestId),
      getCrashDump.rejected(testError, requestId, undefined, errorMock),
    ])
  })
})
