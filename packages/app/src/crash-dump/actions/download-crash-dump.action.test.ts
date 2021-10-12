/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { AnyAction } from "@reduxjs/toolkit"
import { Event } from "App/crash-dump/constants"
import { DeviceResponseStatus } from "Backend/adapters/device-response.interface"
import downloadDeviceCrashDumpFiles from "Renderer/requests/download-crash-dump.request"
import { downloadCrashDump } from "App/crash-dump/actions/download-crash-dump.action"
import { DownloadCrashDumpError } from "App/crash-dump/errors"
import { testError } from "App/renderer/store/constants"

jest.mock("App/crash-dump/actions/send-crash-dump-data.action", () => ({
  sendCrashDumpData: () => jest.fn(),
}))
jest.mock("Renderer/requests/download-crash-dump.request")

const downloadedCrashDumpsMock: string[] = ["C:/MuditaOs/crash-dumps"]

describe("Download Device Crash Dump Files request returns `success` status", () => {
  describe("Crash dumps doesnt exist on device", () => {
    test("fire async `downloadDeviceCrashDumpFiles` returns `undefined`", async () => {
      ;(downloadDeviceCrashDumpFiles as jest.Mock).mockReturnValue({
        status: DeviceResponseStatus.Ok,
        data: [],
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
      } = await mockStore.dispatch(downloadCrashDump() as unknown as AnyAction)

      expect(mockStore.getActions()).toEqual([
        downloadCrashDump.pending(requestId),
        downloadCrashDump.fulfilled(undefined, requestId),
      ])

      expect(downloadDeviceCrashDumpFiles).not.toHaveBeenCalled()
    })
  })

  describe("Crash dumps exist on device", () => {
    test("fire async `downloadDeviceCrashDumpFiles` returns list of downloaded crash dump files", async () => {
      ;(downloadDeviceCrashDumpFiles as jest.Mock).mockReturnValue({
        status: DeviceResponseStatus.Ok,
        data: downloadedCrashDumpsMock,
      })

      const mockStore = createMockStore([thunk])({
        crashDump: {
          data: {
            files: ["/pure/logs/crash-dumps/file.hex"],
          },
        },
      })

      const {
        meta: { requestId },
      } = await mockStore.dispatch(downloadCrashDump() as unknown as AnyAction)

      expect(mockStore.getActions()).toEqual([
        downloadCrashDump.pending(requestId),
        {
          type: Event.SetDownloadCrashDumpPath,
          payload: downloadedCrashDumpsMock,
        },
        downloadCrashDump.fulfilled(DeviceResponseStatus.Ok, requestId),
      ])

      expect(downloadDeviceCrashDumpFiles).toHaveBeenCalled()
    })
  })
})

describe("Download Device Crash Dump Files request returns `error` status", () => {
  test("fire async `downloadCrashDump` action and execute `rejected` event", async () => {
    const mockStore = createMockStore([thunk])({
      crashDump: {
        data: {
          files: ["/pure/logs/crash-dumps/file.hex"],
        },
      },
    })

    ;(downloadDeviceCrashDumpFiles as jest.Mock).mockReturnValueOnce({
      status: DeviceResponseStatus.Error,
    })

    const errorMock = new DownloadCrashDumpError(
      "Downloading process have been interrupted"
    )
    const {
      meta: { requestId },
    } = await mockStore.dispatch(downloadCrashDump() as unknown as AnyAction)

    expect(mockStore.getActions()).toEqual([
      downloadCrashDump.pending(requestId),
      downloadCrashDump.rejected(testError, requestId, undefined, errorMock),
    ])
  })
})
