/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useState } from "react"
import { formatDate } from "Renderer/modules/overview/format-date"
import {
  FreshdeskTicketData,
  FreshdeskTicketDataType,
} from "Renderer/modules/overview/create-freshdesk-ticket/create-freshdesk-ticket"
import { DependencyUseCreateBugTicket } from "Renderer/modules/overview/use-create-bug-ticket/use-create-bug-ticket"

export enum CreateBugTicketResponseStatus {
  Ok = "ok",
  Error = "error",
}

interface CreateBugTicketResponse {
  status: CreateBugTicketResponseStatus
  error?: {
    message: string
    data?: unknown
  }
}

export interface CreateBugTicket {
  sendRequest: (
    data: Omit<FreshdeskTicketData, "type" | "attachments">
  ) => Promise<CreateBugTicketResponse>
  error: Pick<CreateBugTicketResponse, "error"> | null
}

const todayFormatDate = formatDate(new Date())
export const attachedFileName = `tmp-${todayFormatDate}.zip`

const useCreateBugTicketBuilder = ({
  getAppPath,
  writeFile,
  getAppLogs,
  getDeviceLogs,
  createFile,
  createFreshdeskTicket,
}: DependencyUseCreateBugTicket) => (): CreateBugTicket => {
  const [error, setError] = useState(null)
  const sendRequest = async ({
    email,
    subject,
    description,
  }: Omit<
    FreshdeskTicketData,
    "type" | "attachments"
  >): Promise<CreateBugTicketResponse> => {
    // TODO: bugs handle
    const appLogs = await getAppLogs()
    const { data: deviceLogs = "test" } = await getDeviceLogs()
    const filePath = `${getAppPath()}/tmp-${todayFormatDate}`

    const mcFileName = `mc-${todayFormatDate}.txt`
    await writeFile({
      filePath,
      data: appLogs,
      fileName: mcFileName,
    })

    const pureFileName = `pure-${todayFormatDate}.txt`
    await writeFile({
      filePath,
      data: deviceLogs,
      fileName: pureFileName,
    })

    const data = {
      email,
      subject,
      description,
      type: FreshdeskTicketDataType.Problem,
      attachments: [
        createFile(`${filePath}/${mcFileName}`),
        createFile(`${filePath}/${pureFileName}`),
      ],
    }

    try {
      await createFreshdeskTicket(data)
      return {
        status: CreateBugTicketResponseStatus.Ok,
      }
    } catch (error) {
      setError(error)
      if (error?.response?.data) {
        return {
          status: CreateBugTicketResponseStatus.Error,
          error: {
            message: error.response.data.description,
            data: error.response.data.errors,
          },
        }
      } else {
        return {
          status: CreateBugTicketResponseStatus.Error,
          error: {
            message: "Create Bug Ticket - Bad Request",
          },
        }
      }
    }
  }
  return { sendRequest, error }
}

export default useCreateBugTicketBuilder
