/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AnyAction } from "@reduxjs/toolkit"
import { AppError } from "App/core/errors"
import { RequestResponseStatus } from "App/core/types/request-response.interface"
import { downloadCrashDump } from "App/crash-dump/actions/download-crash-dump.action"
import { CrashDumpError, Event } from "App/crash-dump/constants"
import { downloadCrashDumpRequest } from "App/crash-dump/requests/download-crash-dump.request"
import { testError } from "App/__deprecated__/renderer/store/constants"
import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { CrashDump } from "App/crash-dump/dto"

jest.mock("App/crash-dump/actions/send-crash-dump-data.action", () => ({
  sendCrashDumpData: () => jest.fn(),
}))
jest.mock("App/crash-dump/requests/download-crash-dump.request")

const downloadedCrashDumpsMock: string[] = ["C:/MuditaOs/crash-dumps"]

const payload: CrashDump = {
  description: "",
  email: "",
}

const formattedDescription = `Hello

World
...
Bye`

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
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/await-thenable
      } = await mockStore.dispatch(
        downloadCrashDump(payload) as unknown as AnyAction
      )

      expect(mockStore.getActions()).toEqual([
        downloadCrashDump.pending(requestId, payload),
        downloadCrashDump.fulfilled(undefined, requestId, payload),
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
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/await-thenable
      } = await mockStore.dispatch(
        downloadCrashDump(payload) as unknown as AnyAction
      )

      expect(mockStore.getActions()).toEqual([
        downloadCrashDump.pending(requestId, payload),
        {
          type: Event.SetDownloadCrashDumpPath,
          payload: downloadedCrashDumpsMock,
        },
        downloadCrashDump.fulfilled(
          RequestResponseStatus.Ok,
          requestId,
          payload
        ),
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

    const errorMock = new AppError(
      CrashDumpError.Downloading,
      "Downloading process have been interrupted"
    )
    const {
      meta: { requestId },
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/await-thenable
    } = await mockStore.dispatch(
      downloadCrashDump(payload) as unknown as AnyAction
    )

    expect(mockStore.getActions()).toEqual([
      downloadCrashDump.pending(requestId, payload),
      downloadCrashDump.rejected(testError, requestId, payload, errorMock),
    ])
  })
})
test("description is properly formatted with `<br/>` tag", async () => {
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
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/await-thenable
  } = await mockStore.dispatch(
    downloadCrashDump({
      ...payload,
      description: "Hello\n\nWorld\n...\nBye",
    }) as unknown as AnyAction
  )

  expect(mockStore.getActions()).toEqual([
    downloadCrashDump.pending(requestId, {
      ...payload,
      description: formattedDescription,
    }),
    {
      type: Event.SetDownloadCrashDumpPath,
      payload: downloadedCrashDumpsMock,
    },
    downloadCrashDump.fulfilled(RequestResponseStatus.Ok, requestId, {
      ...payload,
      description: formattedDescription,
    }),
  ])

  expect(downloadCrashDumpRequest).toHaveBeenCalled()
})
