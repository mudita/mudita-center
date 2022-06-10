/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import archiveFiles from "App/__deprecated__/renderer/requests/archive-files.request"
import createFreshdeskTicket from "App/__deprecated__/renderer/utils/create-freshdesk-ticket/create-freshdesk-ticket"
import {
  FreshdeskTicketData,
  FreshdeskTicketDataType,
} from "App/__deprecated__/renderer/utils/create-freshdesk-ticket/create-freshdesk-ticket.types"
import {
  downloadingLogs,
  attachedFileName,
} from "App/contact-support/helpers/downloading-logs"

export enum CreateBugTicketResponseStatus {
  Ok = "ok",
  Error = "error",
}

interface CreateBugTicketResponseError {
  message: string
  data?: unknown
}

export interface CreateBugTicketResponse {
  status: CreateBugTicketResponseStatus
  error?: CreateBugTicketResponseError
}

const sendTicketRequest = async (
  freshdeskTicketData: Omit<FreshdeskTicketData, "type" | "attachments">
): Promise<CreateBugTicketResponse> => {
  const files = await downloadingLogs()

  const buffer = await archiveFiles({ files })

  if (buffer === undefined) {
    return returnResponseError("Create Bug Ticket - ArchiveFiles error")
  }

  const attachments = [
    new File([buffer], attachedFileName, { type: "application/zip" }),
  ]

  const data = {
    attachments,
    ...freshdeskTicketData,
    type: FreshdeskTicketDataType.Problem,
  }

  try {
    await createFreshdeskTicket(data)
    return {
      status: CreateBugTicketResponseStatus.Ok,
    }
  } catch (e: any) {
    if (e?.response?.data) {
      const error = {
        message: e.response.data.description,
        data: e.response.data.errors,
      }
      return {
        error,
        status: CreateBugTicketResponseStatus.Error,
      }
    } else {
      return returnResponseError("Create Bug Ticket - Bad Request")
    }
  }
}

const returnResponseError = (
  message: string
): {
  status: CreateBugTicketResponseStatus.Error
  error: CreateBugTicketResponseError
} => {
  return {
    status: CreateBugTicketResponseStatus.Error,
    error: {
      message,
    },
  }
}

export default sendTicketRequest
