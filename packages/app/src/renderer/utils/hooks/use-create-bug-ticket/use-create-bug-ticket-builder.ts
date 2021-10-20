/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useState } from "react"
import { formatDate } from "Renderer/utils/format-date"
import {
  FreshdeskTicketData,
  FreshdeskTicketDataType,
} from "App/renderer/utils/create-freshdesk-ticket/create-freshdesk-ticket"
import { DependencyUseCreateBugTicket } from "Renderer/utils/hooks/use-create-bug-ticket/use-create-bug-ticket"
import { DeviceFileDeprecated } from "Backend/device-file-system-service/device-file-system-service"

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

export type CreateBugTicket = [
  (
    data: Omit<FreshdeskTicketData, "type" | "attachments">
  ) => Promise<CreateBugTicketResponse>,
  boolean,
  CreateBugTicketResponseError | undefined
]

const todayFormatDate = formatDate(new Date())
export const attachedFileName = `${todayFormatDate}.zip`

const useCreateBugTicketBuilder =
  ({
    getAppLogs,
    getDeviceLogFiles,
    archiveFiles,
    createFreshdeskTicket,
  }: DependencyUseCreateBugTicket) =>
  (): CreateBugTicket => {
    const [error, setError] = useState<CreateBugTicketResponseError>()
    const [load, setLoad] = useState(false)

    const sendRequest = async (
      freshdeskTicketData: Omit<FreshdeskTicketData, "type" | "attachments">
    ): Promise<CreateBugTicketResponse> => {
      setLoad(true)

      const mcFileName = `mc-${todayFormatDate}.txt`
      const appLogs = await getAppLogs()
      const appLogFile: DeviceFileDeprecated = {
        data: appLogs,
        name: mcFileName,
      }

      const { data: deviceLogFiles = [] } = await getDeviceLogFiles()

      const buffer = await archiveFiles({
        files: [...deviceLogFiles, appLogFile],
      })

      if (buffer === undefined) {
        const response = returnResponseError(
          "Create Bug Ticket - ArchiveFiles error"
        )
        setError(response.error)
        setLoad(false)
        return response
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
      } catch (e) {
        if (e?.response?.data) {
          const error = {
            message: e.response.data.description,
            data: e.response.data.errors,
          }

          setError(error)
          return {
            error,
            status: CreateBugTicketResponseStatus.Error,
          }
        } else {
          const response = returnResponseError(
            "Create Bug Ticket - Bad Request"
          )
          setError(response.error)
          return response
        }
      } finally {
        setLoad(false)
      }
    }

    return [sendRequest, load, error]
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

export default useCreateBugTicketBuilder
