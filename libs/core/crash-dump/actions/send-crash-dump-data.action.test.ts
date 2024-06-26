/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { AnyAction } from "@reduxjs/toolkit"
import { pendingAction } from "Core/__deprecated__/renderer/store/helpers"
import mockCreateFreshdeskTicket from "Core/__deprecated__/renderer/utils/create-freshdesk-ticket/mock-create-freshdesk-ticket"
import createFile from "Core/__deprecated__/renderer/utils/create-file/create-file"
import { sendCrashDumpData } from "Core/crash-dump/actions/send-crash-dump-data.action"
import { testError } from "Core/__deprecated__/renderer/store/constants"
import createFreshdeskTicket from "Core/__deprecated__/renderer/utils/create-freshdesk-ticket/create-freshdesk-ticket"
import archiveFiles from "Core/__deprecated__/renderer/requests/archive-files.request"
import { AppError } from "Core/core/errors"
import { CrashDumpError } from "Core/crash-dump/constants"
import { DeviceError } from "Core/device/constants"
import { CrashDump } from "Core/crash-dump/dto"

const crashDumpsMock: string[] = ["/pure/logs/crash-dumps/file.hex"]

const muditaOSLogs = new File([""], "MuditaOS.log", { type: "text/html" })
const logsFiles: File[] = [muditaOSLogs]

const payload: CrashDump = {
  description: "",
  email: "",
}

jest.mock(
  "Core/__deprecated__/renderer/utils/create-freshdesk-ticket/create-freshdesk-ticket"
)
jest.mock("Core/device-file-system", () => ({
  removeFile: jest.fn().mockImplementation(() => ({
    type: pendingAction("DEVICE_FILE_SYSTEM_REMOVE"),
    payload: crashDumpsMock,
  })),
}))
jest.mock("Core/__deprecated__/renderer/utils/create-file/create-file")
jest.mock("Core/contact-support/helpers/downloading-logs", () => ({
  downloadingLogs: jest.fn().mockImplementation(() => logsFiles),
}))
jest.mock("Core/__deprecated__/renderer/requests/archive-files.request")

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
  test("fire async `sendCrashDumpData` action and execute `rejected` event if batteryLevel is equal to undefined", async () => {
    const mockStore = createMockStore([thunk])({
      device: {
        data: {
          batteryLevel: undefined,
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
          batteryLevel: 50,
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
        payload: ["/pure/logs/crash-dumps/file.hex"],
        type: "DEVICE_FILE_SYSTEM_REMOVE/pending",
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
      new File([Buffer.from("hello world")], "hello.world")
    )
    ;(archiveFiles as jest.Mock).mockReturnValue(Buffer.from(""))
    ;(createFreshdeskTicket as jest.Mock).mockReturnValue(Promise.reject())

    const mockStore = createMockStore([thunk])({
      device: {
        data: {
          serialNumber: "1234567890",
          batteryLevel: 50,
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
          batteryLevel: 50,
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

describe("when serialNumber is undefined", () => {
  test("freshdesk ticket contains info about unknown serial number", async () => {
    ;(createFile as jest.Mock).mockReturnValue(
      new File([Buffer.alloc(11, "hello world")], "hello.world")
    )
    ;(archiveFiles as jest.Mock).mockReturnValue(Buffer.from("hello world"))
    ;(createFreshdeskTicket as jest.Mock).mockImplementation((data) =>
      mockCreateFreshdeskTicket(data)
    )

    const mockStore = createMockStore([thunk])({
      device: {
        data: {
          serialNumber: undefined,
          batteryLevel: 50,
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
        payload: ["/pure/logs/crash-dumps/file.hex"],
        type: "DEVICE_FILE_SYSTEM_REMOVE/pending",
      },
      sendCrashDumpData.fulfilled(undefined, requestId, payload),
    ])

    expect(createFile).toHaveBeenCalledWith(crashDumpsMock[0])
    expect(createFreshdeskTicket).toHaveBeenCalledWith(
      expect.objectContaining({
        serialNumber: "Unknown serial number",
      })
    )
  })
})
