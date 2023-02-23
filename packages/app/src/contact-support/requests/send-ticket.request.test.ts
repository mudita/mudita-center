/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import sendTicketRequest, {
  CreateBugTicketResponseStatus,
} from "App/contact-support/requests/send-ticket.request"
import getAppLogs from "App/__deprecated__/renderer/requests/get-app-logs.request"
import archiveFiles from "App/__deprecated__/renderer/requests/archive-files.request"
import { getDeviceLogFiles } from "App/device-log/requests/get-device-log-files.request"
import { downloadDeviceFiles } from "App/device-file-system/requests/download-device-file.request"
import createFreshdeskTicket from "App/__deprecated__/renderer/utils/create-freshdesk-ticket/create-freshdesk-ticket"
import mockCreateFreshdeskTicket from "App/__deprecated__/renderer/utils/create-freshdesk-ticket/mock-create-freshdesk-ticket"
import { FreshdeskTicketData } from "App/__deprecated__/renderer/utils/create-freshdesk-ticket/create-freshdesk-ticket.types"
import { DeviceFile } from "App/device-file-system/dto"
import {
  RequestResponse,
  RequestResponseStatus,
} from "App/core/types/request-response.interface"

const successGetDeviceUpdaterLogResponse: RequestResponse<DeviceFile[]> = {
  status: RequestResponseStatus.Ok,
}

const successGetDeviceLogsResponse: RequestResponse<DeviceFile[]> = {
  status: RequestResponseStatus.Ok,
  data: [],
}
const errorResponse: RequestResponse<DeviceFile[]> = {
  status: RequestResponseStatus.Error,
}

jest.mock("App/__deprecated__/renderer/requests/get-app-logs.request")
jest.mock("App/__deprecated__/renderer/requests/archive-files.request")
jest.mock("App/device-log/requests/get-device-log-files.request")
jest.mock("App/device-file-system/requests/download-device-file.request")
jest.mock(
  "App/__deprecated__/renderer/utils/create-freshdesk-ticket/create-freshdesk-ticket"
)

const data: Omit<FreshdeskTicketData, "type" | "attachments"> = {
  description: "",
  subject: "",
  email: "",
  serialNumber: "",
}

afterEach(() => {
  jest.resetAllMocks()
})

describe("`sendTicketRequest` request", () => {
  describe("when each dependencies return success", () => {
    test("request return status OK", async () => {
      ;(getAppLogs as jest.Mock).mockReturnValue("")
      ;(archiveFiles as jest.Mock).mockReturnValue(Buffer.from(""))
      ;(getDeviceLogFiles as jest.Mock).mockReturnValue(
        successGetDeviceLogsResponse
      )
      ;(downloadDeviceFiles as jest.Mock).mockReturnValue(
        successGetDeviceUpdaterLogResponse
      )
      ;(createFreshdeskTicket as jest.Mock).mockImplementation((data) =>
        mockCreateFreshdeskTicket(data)
      )

      const response = await sendTicketRequest(data)
      expect(response).toMatchObject({
        status: CreateBugTicketResponseStatus.Ok,
      })
      expect(getAppLogs).toHaveBeenCalled()
      expect(getDeviceLogFiles).toHaveBeenCalled()
      expect(downloadDeviceFiles).toHaveBeenCalled()
      expect(archiveFiles).toHaveBeenCalled()
      expect(createFreshdeskTicket).toHaveBeenCalled()
    })
  })
  describe("when `getDeviceLogFiles` return error", () => {
    test("request return status OK", async () => {
      ;(getAppLogs as jest.Mock).mockReturnValue("")
      ;(archiveFiles as jest.Mock).mockReturnValue(Buffer.from(""))
      ;(getDeviceLogFiles as jest.Mock).mockReturnValue(errorResponse)
      ;(downloadDeviceFiles as jest.Mock).mockReturnValue(
        successGetDeviceUpdaterLogResponse
      )
      ;(createFreshdeskTicket as jest.Mock).mockImplementation((data) =>
        mockCreateFreshdeskTicket(data)
      )

      const response = await sendTicketRequest(data)

      expect(response).toMatchObject({
        status: CreateBugTicketResponseStatus.Ok,
      })
      expect(getAppLogs).toHaveBeenCalled()
      expect(getDeviceLogFiles).toHaveBeenCalled()
      expect(downloadDeviceFiles).toHaveBeenCalled()
      expect(archiveFiles).toHaveBeenCalled()
      expect(createFreshdeskTicket).toHaveBeenCalled()
    })
  })
  describe("when `downloadDeviceFile` return error", () => {
    test("request return status OK", async () => {
      ;(getAppLogs as jest.Mock).mockReturnValue("")
      ;(archiveFiles as jest.Mock).mockReturnValue(Buffer.from(""))
      ;(getDeviceLogFiles as jest.Mock).mockReturnValue(
        successGetDeviceLogsResponse
      )
      ;(downloadDeviceFiles as jest.Mock).mockReturnValue(errorResponse)
      ;(createFreshdeskTicket as jest.Mock).mockImplementation((data) =>
        mockCreateFreshdeskTicket(data)
      )

      const response = await sendTicketRequest(data)

      expect(response).toMatchObject({
        status: CreateBugTicketResponseStatus.Ok,
      })
      expect(getAppLogs).toHaveBeenCalled()
      expect(getDeviceLogFiles).toHaveBeenCalled()
      expect(downloadDeviceFiles).toHaveBeenCalled()
      expect(archiveFiles).toHaveBeenCalled()
      expect(createFreshdeskTicket).toHaveBeenCalled()
    })
  })
  describe("when `archiveFiles` return error", () => {
    test("request return error", async () => {
      ;(getAppLogs as jest.Mock).mockReturnValue("")
      ;(archiveFiles as jest.Mock).mockReturnValue(undefined)
      ;(getDeviceLogFiles as jest.Mock).mockReturnValue(errorResponse)
      ;(downloadDeviceFiles as jest.Mock).mockReturnValue(
        successGetDeviceUpdaterLogResponse
      )

      const response = await sendTicketRequest(data)

      expect(response).toMatchInlineSnapshot(`
    Object {
      "error": Object {
        "message": "Create Bug Ticket - ArchiveFiles error",
      },
      "status": "error",
    }
  `)
      expect(getAppLogs).toHaveBeenCalled()
      expect(getDeviceLogFiles).toHaveBeenCalled()
      expect(downloadDeviceFiles).toHaveBeenCalled()
      expect(archiveFiles).toHaveBeenCalled()
      expect(createFreshdeskTicket).not.toHaveBeenCalled()
    })
  })
  describe("when `createFreshdeskTicket` return error", () => {
    test("request return error", async () => {
      ;(getAppLogs as jest.Mock).mockReturnValue("")
      ;(archiveFiles as jest.Mock).mockReturnValue(Buffer.from(""))
      ;(getDeviceLogFiles as jest.Mock).mockReturnValue(
        successGetDeviceLogsResponse
      )
      ;(downloadDeviceFiles as jest.Mock).mockReturnValue(
        successGetDeviceUpdaterLogResponse
      )
      ;(createFreshdeskTicket as jest.Mock).mockReturnValue(Promise.reject())

      const response = await sendTicketRequest(data)

      expect(response).toMatchInlineSnapshot(`
    Object {
      "error": Object {
        "message": "Create Bug Ticket - Bad Request",
      },
      "status": "error",
    }
  `)
      expect(getAppLogs).toHaveBeenCalled()
      expect(getDeviceLogFiles).toHaveBeenCalled()
      expect(downloadDeviceFiles).toHaveBeenCalled()
      expect(archiveFiles).toHaveBeenCalled()
      expect(createFreshdeskTicket).toHaveBeenCalled()
    })
  })
})
