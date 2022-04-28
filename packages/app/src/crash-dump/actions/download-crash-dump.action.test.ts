/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { AnyAction } from "@reduxjs/toolkit"
import { Event } from "App/crash-dump/constants"
import { downloadCrashDumpRequest } from "App/crash-dump/requests/download-crash-dump.request"
import { downloadCrashDump } from "App/crash-dump/actions/download-crash-dump.action"
import { DownloadCrashDumpError } from "App/crash-dump/errors"
import { testError } from "App/renderer/store/constants"
import { RequestResponseStatus } from "App/core/types/request-response.interface"

jest.mock("App/crash-dump/actions/send-crash-dump-data.action", () => ({
  sendCrashDumpData: () => jest.fn(),
}))
jest.mock("App/crash-dump/requests/download-crash-dump.request")

const downloadedCrashDumpsMock: string[] = ["C:/MuditaOs/crash-dumps"]

describe("Download Device Crash Dump Files request returns `success` status", () => {
  describe("Crash dumps doesnt exist on device", () => {
    test("fire async `downloadDeviceCrashDumpFiles` returns `undefined`", async () => {
      ;(downloadCrashDumpRequest as jest.Mock).mockReturnValue({
        status: RequestResponseStatus.Ok,
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

      expect(downloadCrashDumpRequest).not.toHaveBeenCalled()
    })
  })

  describe("Crash dumps exist on device", () => {
    test("fire async `downloadDeviceCrashDumpFiles` returns list of downloaded crash dump files", async () => {
      ;(downloadCrashDumpRequest as jest.Mock).mockReturnValue({
        status: RequestResponseStatus.Ok,
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
        downloadCrashDump.fulfilled(RequestResponseStatus.Ok, requestId),
      ])

      expect(downloadCrashDumpRequest).toHaveBeenCalled()
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

    ;(downloadCrashDumpRequest as jest.Mock).mockReturnValueOnce({
      status: RequestResponseStatus.Error,
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
