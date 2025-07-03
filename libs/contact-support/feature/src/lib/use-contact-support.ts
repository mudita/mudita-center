/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { format } from "date-fns"
import logger from "electron-log/renderer"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AppFileSystem, AppHttp, AppLogger } from "app-utils/renderer"
import {
  AppError,
  AppFileSystemScopeOptions,
  AppHttpRequestConfig,
} from "app-utils/models"
import { delayUntilAtLeast } from "app-utils/common"
import {
  CustomerSupportCreateTicketPayload,
  FreshdeskTicketDataType,
  FreshdeskTicketProduct,
} from "contact-support/models"
import { ContactSupportFieldValues } from "contact-support/ui"
import { getActiveDevice } from "devices/common/feature"
import { contactSupportMutationKeys } from "./contact-support-mutation-keys"
import { contactSupportConfig } from "./contact-support-config"

interface CreateTicketRequestPayload
  extends Pick<AppHttpRequestConfig, "data" | "files"> {
  data: Record<string, string>
  files: Record<string, AppFileSystemScopeOptions>
}

enum SupportMetaErrorName {
  MkdirError = "mkdirError",
  AggregateAppLogsError = "aggregateAppLogsError",
  ArchiveError = "archiveError",
}

type MetaCreateTicketError = AppError<SupportMetaErrorName>

export const withMetaErrorsInDescription = (
  description: string,
  metaErrors?: MetaCreateTicketError[]
): string => {
  if (!metaErrors || metaErrors.length === 0) {
    return description
  }

  const metaMsg = [
    `[INFO][AUTOMATED META]`,
    ...metaErrors.map(
      (err, i) => `#${i + 1} TYPE: ${err.name} DETAILS: ${err.message}`
    ),
    `---`,
  ].join("\n")

  return `${metaMsg}\n${description}`
}

const createTicketRequest = async ({
  data,
  files,
}: CreateTicketRequestPayload) => {
  return await AppHttp.request({
    method: "POST",
    url: `${contactSupportConfig.apiUrl}/api/v2/tickets`,
    headers: {
      Authorization: `Basic ${contactSupportConfig.apiToken}`,
    },
    data,
    files,
  })
}

const mapToCreateTicketRequestPayload = (
  {
    type,
    email = "no_email@mudita.com",
    subject,
    description = "no text",
    serialNumber,
    deviceId,
    product,
  }: CustomerSupportCreateTicketPayload,
  scopeRelativePath: string,
  metaCreateTicketErrors: MetaCreateTicketError[]
): CreateTicketRequestPayload => {
  const data: Record<string, string> = {
    type,
    email,
    subject,
    description: withMetaErrorsInDescription(
      description,
      metaCreateTicketErrors
    ),
    status: "2",
    source: "100",
    priority: "1",
    "custom_fields[cf_product]": product,
  }

  if (serialNumber) {
    data["custom_fields[cf_serial_number_imei]"] = serialNumber
  }
  if (deviceId) {
    data["custom_fields[cf_deviceid]"] = deviceId
  }
  const files: Record<string, AppFileSystemScopeOptions> = {
    "attachments[]": { scopeRelativePath },
  }

  return { data, files }
}

const saveAppDeviceLogs = async (deviceId: string, destinationPath: string) => {
  logger.warn(
    `save app device logs for deviceId: ${deviceId} to path: ${destinationPath} is not implemented yet`
  )
}

const createTicket = async (
  actionPayload: CustomerSupportCreateTicketPayload
) => {
  const metaCreateTicketErrors: MetaCreateTicketError[] = []
  const todayFormatDate = format(new Date(), "yyyy-MM-dd")
  const tmpLogsScopeRelativePath = contactSupportConfig.tmpLogsScopeRelativePath

  const rmResult = await AppFileSystem.rm({
    scopeRelativePath: tmpLogsScopeRelativePath,
    options: { recursive: true, force: true },
  })

  if (!rmResult.ok) {
    logger.warn(`Failed to remove old logs: ${rmResult.error.message}`)
  }

  const mkdirResult = await AppFileSystem.mkdir({
    scopeRelativePath: tmpLogsScopeRelativePath,
    options: { recursive: true },
  })

  if (!mkdirResult.ok) {
    metaCreateTicketErrors.push(
      new AppError(mkdirResult.error.message, SupportMetaErrorName.MkdirError)
    )
  }

  if (actionPayload.deviceId) {
    await saveAppDeviceLogs(actionPayload.deviceId, tmpLogsScopeRelativePath)
  }

  const appLoggerFileName = `mc-${todayFormatDate}.txt`
  const appLoggerScopeRelativePath = `${tmpLogsScopeRelativePath}/${appLoggerFileName}`
  const aggregateLogsToFileResult = await AppLogger.aggregateLogsToFile({
    scopeRelativePath: appLoggerScopeRelativePath,
    maxSizeInBytes: 15000000,
  })

  if (!aggregateLogsToFileResult.ok) {
    metaCreateTicketErrors.push(
      new AppError(
        aggregateLogsToFileResult.error.message,
        SupportMetaErrorName.AggregateAppLogsError
      )
    )
  }

  const zippedLogsFileName = `mc-${todayFormatDate}.zip`
  const scopeDestinationPath = `${tmpLogsScopeRelativePath}/${zippedLogsFileName}`

  const archiveResult = await AppFileSystem.archive({
    scopeRelativePath: tmpLogsScopeRelativePath,
    scopeDestinationPath,
  })

  if (!archiveResult.ok) {
    metaCreateTicketErrors.push(
      new AppError(
        archiveResult.error.message,
        SupportMetaErrorName.ArchiveError
      )
    )
  }

  const requestPayload = mapToCreateTicketRequestPayload(
    actionPayload,
    scopeDestinationPath,
    metaCreateTicketErrors
  )
  const createTicketResult = await createTicketRequest(requestPayload)
  if (!createTicketResult.ok) {
    logger.error("Failed to create ticket", createTicketResult.error)
    throw new AppError(createTicketResult.error.message, "CreateTicketError")
  }

  return createTicketResult
}

export const useCreateTicket = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [contactSupportMutationKeys.createTicket],
    mutationFn: (data: ContactSupportFieldValues) => {
      const activeDevice = getActiveDevice(queryClient)
      const email = data.email
      const description = (data.description || "no text").replace(
        /\r\n|\r|\n/g,
        "<br/>"
      )
      const deviceId = activeDevice?.path || "unknown_device"
      const serialNumber = activeDevice?.serialNumber || "unknown_serial"
      const actionPayload = {
        email,
        description,
        serialNumber,
        deviceId,
        subject: `Error`,
        type: FreshdeskTicketDataType.Problem,
        product: FreshdeskTicketProduct.None,
      }

      return delayUntilAtLeast(() => createTicket(actionPayload), 500)
    },
  })
}
