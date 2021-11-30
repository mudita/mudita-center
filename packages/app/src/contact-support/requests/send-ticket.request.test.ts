/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"
import sendTicketRequest, {
  CreateBugTicketResponseStatus,
} from "App/contact-support/requests/send-ticket.request"
import getAppLogs from "Renderer/requests/get-app-logs.request"
import archiveFiles from "Renderer/requests/archive-files.request"
import getDeviceLogFiles from "Renderer/requests/get-device-log-files.request"
import createFreshdeskTicket from "Renderer/utils/create-freshdesk-ticket/create-freshdesk-ticket"
import mockCreateFreshdeskTicket from "Renderer/utils/create-freshdesk-ticket/mock-create-freshdesk-ticket"
import { FreshdeskTicketData } from "Renderer/utils/create-freshdesk-ticket/create-freshdesk-ticket.types"
import { DeviceFileDeprecated } from "Backend/device-file-system-service/device-file-system-service"

const successGetDeviceLogsResponse: DeviceResponse<DeviceFileDeprecated[]> = {
  status: DeviceResponseStatus.Ok,
  data: [],
}
const errorGetDeviceLogsResponse: DeviceResponse<DeviceFileDeprecated[]> = {
  status: DeviceResponseStatus.Error,
}

jest.mock("Renderer/requests/get-app-logs.request")
jest.mock("Renderer/requests/archive-files.request")
jest.mock("Renderer/requests/get-device-log-files.request")
jest.mock("Renderer/utils/create-freshdesk-ticket/create-freshdesk-ticket")

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
      ;(archiveFiles as jest.Mock).mockReturnValue(new Buffer(""))
      ;(getDeviceLogFiles as jest.Mock).mockReturnValue(
        successGetDeviceLogsResponse
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
      expect(archiveFiles).toHaveBeenCalled()
      expect(createFreshdeskTicket).toHaveBeenCalled()
    })
  })
  describe("when `getDeviceLogFiles` return error", () => {
    test("request return status OK", async () => {
      ;(getAppLogs as jest.Mock).mockReturnValue("")
      ;(archiveFiles as jest.Mock).mockReturnValue(new Buffer(""))
      ;(getDeviceLogFiles as jest.Mock).mockReturnValue(
        errorGetDeviceLogsResponse
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
      expect(archiveFiles).toHaveBeenCalled()
      expect(createFreshdeskTicket).toHaveBeenCalled()
    })
  })
  describe("when `archiveFiles` return error", () => {
    test("request return error", async () => {
      ;(getAppLogs as jest.Mock).mockReturnValue("")
      ;(archiveFiles as jest.Mock).mockReturnValue(undefined)
      ;(getDeviceLogFiles as jest.Mock).mockReturnValue(
        errorGetDeviceLogsResponse
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
      expect(archiveFiles).toHaveBeenCalled()
      expect(createFreshdeskTicket).not.toHaveBeenCalled()
    })
  })
  describe("when `createFreshdeskTicket` return error", () => {
    test("request return error", async () => {
      ;(getAppLogs as jest.Mock).mockReturnValue("")
      ;(archiveFiles as jest.Mock).mockReturnValue(new Buffer(""))
      ;(getDeviceLogFiles as jest.Mock).mockReturnValue(
        successGetDeviceLogsResponse
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
      expect(archiveFiles).toHaveBeenCalled()
      expect(createFreshdeskTicket).toHaveBeenCalled()
    })
  })
})
