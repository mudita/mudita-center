/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { AnyAction } from "@reduxjs/toolkit"
import { pendingAction } from "App/__deprecated__/renderer/store/helpers"
import mockCreateFreshdeskTicket from "App/__deprecated__/renderer/utils/create-freshdesk-ticket/mock-create-freshdesk-ticket"
import createFile from "App/__deprecated__/renderer/utils/create-file/create-file"
import { sendCrashDumpData } from "App/crash-dump/actions/send-crash-dump-data.action"
import { testError } from "App/__deprecated__/renderer/store/constants"
import createFreshdeskTicket from "App/__deprecated__/renderer/utils/create-freshdesk-ticket/create-freshdesk-ticket"
import archiveFiles from "App/__deprecated__/renderer/requests/archive-files.request"
import { AppError } from "App/core/errors"
import { CrashDumpError } from "App/crash-dump/constants"
import { DeviceError } from "App/device/constants"
import { SendCrashDumpPayload } from "App/crash-dump/reducers/crash-dump.interface"

const crashDumpsMock: string[] = ["/pure/logs/crash-dumps/file.hex"]

const muditaOSLogs = new File([""], "MuditaOS.log", { type: "text/html" })
const logsFiles: File[] = [muditaOSLogs]

const payload: SendCrashDumpPayload = {
  description: "",
  email: "",
}

jest.mock(
  "App/__deprecated__/renderer/utils/create-freshdesk-ticket/create-freshdesk-ticket"
)
jest.mock("App/device-file-system", () => ({
  removeFile: jest.fn().mockReturnValue({
    type: pendingAction("DEVICE_FILE_SYSTEM_REMOVE"),
    payload: crashDumpsMock,
  }),
}))
jest.mock("App/__deprecated__/renderer/utils/create-file/create-file")
jest.mock("App/contact-support/helpers/downloading-logs", () => ({
  downloadingLogs: jest.fn().mockReturnValue(logsFiles),
}))
jest.mock("App/__deprecated__/renderer/requests/archive-files.request")

afterEach(() => {
  jest.clearAllMocks()
})

describe("when Crash dumps doesn't downloaded", () => {
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
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/await-thenable
    } = await mockStore.dispatch(
      sendCrashDumpData(payload) as unknown as AnyAction
    )

    expect(mockStore.getActions()).toEqual([
      sendCrashDumpData.pending(requestId, payload),
      sendCrashDumpData.fulfilled(undefined, requestId, payload),
    ])

    expect(createFile).not.toHaveBeenCalled()
  })
})

describe("when Crash dumps downloaded", () => {
  test("fire async `sendCrashDumpData` action and execute `rejected` event if serialNumber is equal to undefined", async () => {
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
    const errorMock = new AppError(
      DeviceError.Connection,
      "Device isn't connected"
    )

    const {
      meta: { requestId },
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/await-thenable
    } = await mockStore.dispatch(
      sendCrashDumpData(payload) as unknown as AnyAction
    )

    expect(mockStore.getActions()).toEqual([
      sendCrashDumpData.pending(requestId, payload),
      sendCrashDumpData.rejected(testError, requestId, payload, errorMock),
    ])

    expect(createFile).not.toHaveBeenCalled()
    expect(createFreshdeskTicket).not.toHaveBeenCalled()
  })

  test("fire async `sendCrashDumpData` triggers sending process", async () => {
    ;(createFile as jest.Mock).mockReturnValue(
      new File([new Buffer("hello world")], "hello.world")
    )
    ;(archiveFiles as jest.Mock).mockReturnValue(Buffer.from("hello world"))
    ;(createFreshdeskTicket as jest.Mock).mockImplementation((data) =>
      mockCreateFreshdeskTicket(data)
    )

    const mockStore = createMockStore([thunk])({
      device: {
        data: {
          serialNumber: "1234567890",
        },
      },
      crashDump: {
        data: {
          files: crashDumpsMock,
          downloadedFiles: crashDumpsMock,
        },
      },
    })

    const {
      meta: { requestId },
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/await-thenable
    } = await mockStore.dispatch(
      sendCrashDumpData(payload) as unknown as AnyAction
    )

    expect(mockStore.getActions()).toEqual([
      sendCrashDumpData.pending(requestId, payload),
      {
        payload: undefined,
        type: "DEVICE_FILE_SYSTEM_REMOVE/pending",
      },
      {
        payload: undefined,
        type: "RESET_CRASH_DUMP",
      },
      sendCrashDumpData.fulfilled(undefined, requestId, payload),
    ])

    expect(createFile).toHaveBeenCalledWith(crashDumpsMock[0])
    expect(createFreshdeskTicket).toHaveBeenCalled()
  })
})

describe("when `createFreshdeskTicket` returns `error` status", () => {
  test("fire async `sendCrashDumpData` action and execute `rejected` event", async () => {
    ;(createFile as jest.Mock).mockReturnValue(
      new File([new Buffer("hello world")], "hello.world")
    )
    ;(archiveFiles as jest.Mock).mockReturnValue(Buffer.from(""))
    ;(createFreshdeskTicket as jest.Mock).mockReturnValue(Promise.reject())

    const mockStore = createMockStore([thunk])({
      device: {
        data: {
          serialNumber: "1234567890",
        },
      },
      crashDump: {
        data: {
          files: crashDumpsMock,
          downloadedFiles: crashDumpsMock,
        },
      },
    })

    const errorMock = new AppError(
      CrashDumpError.Sending,
      "The error happened during crash dump sending process"
    )
    const {
      meta: { requestId },
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/await-thenable
    } = await mockStore.dispatch(
      sendCrashDumpData(payload) as unknown as AnyAction
    )

    expect(mockStore.getActions()).toEqual([
      sendCrashDumpData.pending(requestId, payload),
      sendCrashDumpData.rejected(testError, requestId, payload, errorMock),
    ])
    expect(createFile).toHaveBeenCalled()
    expect(createFreshdeskTicket).toHaveBeenCalled()
  })
})

describe("when logs downloaded", () => {
  test("fire async `sendCrashDumpData` action and execute `rejected` event if archive files buffer is equal to undefined", async () => {
    ;(archiveFiles as jest.Mock).mockReturnValue(undefined)

    const mockStore = createMockStore([thunk])({
      device: {
        data: {
          serialNumber: "1234567890",
        },
      },
      crashDump: {
        data: {
          files: crashDumpsMock,
          downloadedFiles: crashDumpsMock,
        },
      },
    })

    const errorMock = new AppError(
      CrashDumpError.Sending,
      "Create Crash Dump Ticket - ArchiveFiles error"
    )

    const {
      meta: { requestId },
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/await-thenable
    } = await mockStore.dispatch(
      sendCrashDumpData(payload) as unknown as AnyAction
    )

    expect(mockStore.getActions()).toEqual([
      sendCrashDumpData.pending(requestId, payload),
      sendCrashDumpData.rejected(testError, requestId, payload, errorMock),
    ])

    expect(createFile).not.toHaveBeenCalled()
    expect(createFreshdeskTicket).not.toHaveBeenCalled()
  })
})
