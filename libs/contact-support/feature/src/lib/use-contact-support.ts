/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { format } from "date-fns"
import logger from "electron-log/renderer"
import { useMutation } from "@tanstack/react-query"
import { AppFileSystem, AppHttp, AppLogger } from "app-utils/renderer"
import { AppHttpRequestConfig } from "app-utils/models"
import { contactSupportMutationKeys } from "./contact-support-mutation-keys"
import { contactSupportConfig } from "./contact-support-config"
import { CustomerSupportCreateTicketPayload } from "contact-support/models"

interface CreateTicketRequestPayload
  extends Pick<AppHttpRequestConfig, "data" | "files"> {
  data: Record<string, string>
  files: Record<string, string>
}

const createTicketRequest = async ({
  data,
  files,
}: CreateTicketRequestPayload) => {
  await AppHttp.request({
    method: "POST",
    url: `${contactSupportConfig.apiUrl}/api/v2/tickets`,
    headers: {
      Authorization: `Basic ${contactSupportConfig.apiToken}`,
    },
    data,
    files,
  })
}

const mapToCreateTicketRequestPayload = ({
  type,
  email = "no_email@mudita.com",
  subject,
  description = "no text",
  serialNumber,
  deviceId,
  product,
}: CustomerSupportCreateTicketPayload): CreateTicketRequestPayload => {
  const data: Record<string, string> = {
    type,
    email,
    subject,
    description,
    status: "2",
    source: "100",
    priority: "1",
    "custom_fields[cf_product]": product,
  }

  if (serialNumber) {
    data["custom_fields[cf_serial_number_imei]"] = serialNumber
  }
  if (deviceId) {
    data["custom_fields[cf_device_id]"] = deviceId
  }
  const files = {
    "attachments[]": contactSupportConfig.tmpLogsScopeRelativePath,
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
    throw mkdirResult.error
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
    throw aggregateLogsToFileResult.error
  }

  const zippedLogsFileName = `mc-${todayFormatDate}.zip`
  const scopeDestinationPath = `${tmpLogsScopeRelativePath}/${zippedLogsFileName}`

  const archiveResult = await AppFileSystem.archive({
    scopeRelativePath: tmpLogsScopeRelativePath,
    scopeDestinationPath,
  })

  if (!archiveResult.ok) {
    throw archiveResult.error
  }

  const requestPayload = mapToCreateTicketRequestPayload(actionPayload)
  return await createTicketRequest(requestPayload)
}

export const useCreateTicket = () => {
  return useMutation({
    mutationKey: [contactSupportMutationKeys.createTicket],
    mutationFn: createTicket,
  })
}
