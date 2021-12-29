/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { AnyAction } from "@reduxjs/toolkit"
import { pendingAction } from "Renderer/store/helpers"
import mockCreateFreshdeskTicket from "Renderer/utils/create-freshdesk-ticket/mock-create-freshdesk-ticket"
import createFile from "Renderer/utils/create-file/create-file"
import { sendCrashDumpData } from "App/crash-dump/actions/send-crash-dump-data.action"
import { SendingCrashDumpError } from "App/crash-dump/errors"
import { DeviceConnectionError } from "App/device"
import { testError } from "App/renderer/store/constants"
import createFreshdeskTicket from "Renderer/utils/create-freshdesk-ticket/create-freshdesk-ticket"
import {
  sendTicket,
  SendTicketPayload,
} from "App/contact-support/actions/send-ticket.action"
import sendTicketRequest, {
  CreateBugTicketResponse,
  CreateBugTicketResponseStatus,
} from "App/contact-support/requests/send-ticket.request"

const crashDumpsMock: string[] = ["/pure/logs/crash-dumps/file.hex"]

jest.mock("Renderer/utils/create-freshdesk-ticket/create-freshdesk-ticket")
jest.mock("App/device-file-system", () => ({
  removeFile: jest.fn().mockReturnValue({
    type: pendingAction("DEVICE_FILE_SYSTEM_REMOVE"),
    payload: crashDumpsMock,
  }),
}))
jest.mock("Renderer/utils/create-file/create-file")
jest.mock("App/contact-support/requests/send-ticket.request")

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
    } = await mockStore.dispatch(sendCrashDumpData() as unknown as AnyAction)

    expect(mockStore.getActions()).toEqual([
      sendCrashDumpData.pending(requestId),
      sendCrashDumpData.fulfilled(undefined, requestId),
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
    const errorMock = new DeviceConnectionError("Device isn't connected")

    const {
      meta: { requestId },
    } = await mockStore.dispatch(sendCrashDumpData() as unknown as AnyAction)

    expect(mockStore.getActions()).toEqual([
      sendCrashDumpData.pending(requestId),
      sendCrashDumpData.rejected(testError, requestId, undefined, errorMock),
    ])

    expect(createFile).not.toHaveBeenCalled()
    expect(createFreshdeskTicket).not.toHaveBeenCalled()
    expect(sendTicketRequest).not.toHaveBeenCalled()
  })

  test("fire async `sendCrashDumpData` triggers sending process", async () => {
    ;(createFile as jest.Mock).mockReturnValue(
      new File([new Buffer("hello world")], "hello.world")
    )
    ;(createFreshdeskTicket as jest.Mock).mockImplementation((data) =>
      mockCreateFreshdeskTicket(data)
    )
    const successResponse: CreateBugTicketResponse = {
      status: CreateBugTicketResponseStatus.Ok,
    }

    const payload: SendTicketPayload = {
      description: "",
      email: "",
    }

    ;(sendTicketRequest as jest.Mock).mockReturnValue(successResponse)

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
    } = await mockStore.dispatch(sendCrashDumpData() as unknown as AnyAction)
    const {
      meta: { requestId: sendTicketRequestId },
    } = await mockStore.dispatch(sendTicket(payload) as unknown as AnyAction)

    expect(mockStore.getActions()).toEqual([
      sendCrashDumpData.pending(requestId),
      {
        payload: undefined,
        type: "DEVICE_FILE_SYSTEM_REMOVE/pending",
      },
      {
        payload: undefined,
        type: "RESET_CRASH_DUMP",
      },
      sendCrashDumpData.fulfilled(undefined, requestId),
      sendTicket.pending(sendTicketRequestId, payload),
      sendTicket.fulfilled(undefined, sendTicketRequestId, payload),
    ])

    expect(createFile).toHaveBeenCalledWith(crashDumpsMock[0])
    expect(createFreshdeskTicket).toHaveBeenCalled()
    expect(sendTicketRequest).toHaveBeenCalled()
  })
})

describe("when `createFreshdeskTicket` returns `error` status", () => {
  test("fire async `sendCrashDumpData` action and execute `rejected` event", async () => {
    ;(createFile as jest.Mock).mockReturnValue(
      new File([new Buffer("hello world")], "hello.world")
    )
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
    expect(createFile).toHaveBeenCalled()
    expect(createFreshdeskTicket).toHaveBeenCalled()
    expect(sendTicketRequest).toHaveBeenCalled()
  })
})
