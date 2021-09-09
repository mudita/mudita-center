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
export const attachedFileName = `tmp-${todayFormatDate}.zip`

const useCreateBugTicketBuilder =
  ({
    getAppPath,
    writeFile,
    getAppLogs,
    getDeviceLogFiles,
    createFile,
    rmdir,
    writeGzip,
    createFreshdeskTicket,
  }: DependencyUseCreateBugTicket) =>
  (): CreateBugTicket => {
    const [error, setError] = useState<CreateBugTicketResponseError>()
    const [load, setLoad] = useState(false)

    const removeTmpFiles = (filePath: string): Promise<boolean> => {
      return rmdir({ filePath, options: { recursive: true } })
    }

    const sendRequest = async (
      freshdeskTicketData: Omit<FreshdeskTicketData, "type" | "attachments">
    ): Promise<CreateBugTicketResponse> => {
      setLoad(true)
      const appLogs = await getAppLogs()
      const filePath = `${getAppPath()}/tmp-${todayFormatDate}`

      const mcFileName = `mc-${todayFormatDate}.txt`
      const mcWriteResponse = await writeFile({
        filePath,
        data: appLogs,
        fileName: mcFileName,
      })

      if (!mcWriteResponse) {
        const response = returnResponseError(
          "Create Bug Ticket - WriteFileSync error"
        )
        setError(response.error)
        setLoad(false)
        return response
      }

      const { data: deviceLogFiles = [] } = await getDeviceLogFiles()

      for (let i = 0; i < deviceLogFiles.length; i++) {
        const deviceLogFile = deviceLogFiles[i]
        const pureWriteSuccess = await writeFile({
          filePath,
          data: deviceLogFile.data,
          fileName: deviceLogFile.name,
        })

        if (!pureWriteSuccess) {
          const response = returnResponseError(
            "Create Bug Ticket - WriteFileSync error"
          )
          setError(response.error)
          setLoad(false)
          return response
        }
      }

      const writeGzipResponse = await writeGzip({ filePath })
      const gzipFilePath = `${filePath}.zip`

      if (!writeGzipResponse) {
        await removeTmpFiles(filePath)
        const response = returnResponseError(
          "Create Bug Ticket - writeGzip error"
        )
        setError(response.error)
        setLoad(false)
        return response
      }

      let attachments = []
      try {
        attachments = [createFile(gzipFilePath, { type: "application/zip" })]
      } catch {
        await removeTmpFiles(gzipFilePath)
        await removeTmpFiles(filePath)
        const response = returnResponseError(
          "Create Bug Ticket - bug in creates attachments"
        )
        setError(response.error)
        setLoad(false)
        return response
      }

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
        await removeTmpFiles(gzipFilePath)
        await removeTmpFiles(filePath)
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
