/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { AnyAction } from "@reduxjs/toolkit"
import { uploadFileRequest } from "App/uploader"
import readFile from "App/files-system/requests/read-file.request"
import { sendCrashDumpData } from "App/crash-dump/actions/send-crash-dump-data.action"
import { SendingCrashDumpError } from "App/crash-dump/errors"
import { DeviceConnectionError } from "App/device"
import { testError } from "App/renderer/store/constants"

jest.mock("App/uploader")
jest.mock("App/files-system/requests/read-file.request")

const crashDumpsMock: string[] = ["/pure/logs/crash-dumps/file.hex"]

describe("Crash dumps doesn't downloaded", () => {
  test("fire async `sendCrashDumpData` returns `undefined`", async () => {
    const mockStore = createMockStore([thunk])({
      crashDump: {
        data: {
          downloadedFiles: [],
        },
      },
    })

    const {
      meta: { requestId },
    } = await mockStore.dispatch(sendCrashDumpData() as unknown as AnyAction)

    expect(mockStore.getActions()).toEqual([
      sendCrashDumpData.pending(requestId),
      sendCrashDumpData.fulfilled(undefined, requestId),
    ])

    expect(readFile).not.toHaveBeenCalled()
  })
})

describe("Crash dumps downloaded", () => {
  test("fire async `sendCrashDumpData` action and execute `rejected` event is serialNumber is equal to undefined", async () => {
    const mockStore = createMockStore([thunk])({
      device: {
        data: {
          serialNumber: undefined,
        },
      },
      crashDump: {
        data: {
          downloadedFiles: crashDumpsMock,
        },
      },
    })

    const errorMock = new DeviceConnectionError("Device isn't connected")

    const {
      meta: { requestId },
    } = await mockStore.dispatch(sendCrashDumpData() as unknown as AnyAction)

    expect(mockStore.getActions()).toEqual([
      sendCrashDumpData.pending(requestId),
      sendCrashDumpData.rejected(testError, requestId, undefined, errorMock),
    ])

    expect(readFile).not.toHaveBeenCalled()
    expect(uploadFileRequest).not.toHaveBeenCalled()
  })

  test("fire async `sendCrashDumpData` triggers sending process", async () => {
    ;(readFile as jest.Mock).mockReturnValue(new Buffer("hello world"))

    const mockStore = createMockStore([thunk])({
      device: {
        data: {
          serialNumber: "1234567890",
        },
      },
      crashDump: {
        data: {
          downloadedFiles: crashDumpsMock,
        },
      },
    })

    const {
      meta: { requestId },
    } = await mockStore.dispatch(sendCrashDumpData() as unknown as AnyAction)

    expect(mockStore.getActions()).toEqual([
      sendCrashDumpData.pending(requestId),
      sendCrashDumpData.fulfilled(undefined, requestId),
    ])

    expect(readFile).toHaveBeenCalledWith(crashDumpsMock[0])
    expect(uploadFileRequest).toHaveBeenCalled()
  })
})

describe("Upload Data To FTP Request returns `error` status", () => {
  test("fire async `sendCrashDumpData` action and execute `rejected` event", async () => {
    ;(readFile as jest.Mock).mockReturnValue(new Buffer("hello world"))
    ;(uploadFileRequest as jest.Mock).mockRejectedValue(new Error("Some error"))

    const mockStore = createMockStore([thunk])({
      device: {
        data: {
          serialNumber: "1234567890",
        },
      },
      crashDump: {
        data: {
          downloadedFiles: crashDumpsMock,
        },
      },
    })

    const errorMock = new SendingCrashDumpError(
      "The error happened during crash dump sending process"
    )
    const {
      meta: { requestId },
    } = await mockStore.dispatch(sendCrashDumpData() as unknown as AnyAction)

    expect(mockStore.getActions()).toEqual([
      sendCrashDumpData.pending(requestId),
      sendCrashDumpData.rejected(testError, requestId, undefined, errorMock),
    ])
  })
})

describe("Create Freshdesk Ticket returns `error` status", () => {
  test("fire async `sendCrashDumpData` action and execute `rejected` event", async () => {
    ;(readFile as jest.Mock).mockReturnValue(new Buffer("hello world"))

    const mockStore = createMockStore([thunk])({
      device: {
        data: {
          serialNumber: "1234567890",
        },
      },
      crashDump: {
        data: {
          downloadedFiles: crashDumpsMock,
        },
      },
    })

    const errorMock = new SendingCrashDumpError(
      "The error happened during crash dump sending process"
    )
    const {
      meta: { requestId },
    } = await mockStore.dispatch(sendCrashDumpData() as unknown as AnyAction)

    expect(mockStore.getActions()).toEqual([
      sendCrashDumpData.pending(requestId),
      sendCrashDumpData.rejected(testError, requestId, undefined, errorMock),
    ])
  })
})
