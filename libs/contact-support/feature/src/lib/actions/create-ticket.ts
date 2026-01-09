/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import logger from "electron-log/renderer"
import { CustomerSupportCreateTicketPayload } from "contact-support/models"
import { Device } from "devices/common/models"
import { AppError, AppFileSystemGuardOptions } from "app-utils/models"
import { MetaCreateTicketError } from "../use-contact-support.types"
import {
  createTicketRequest,
  CreateTicketRequestPayload,
} from "../api/create-ticket.request"
import { downloadAndArchiveLogs } from "./download-and-archive-logs"

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
  scopeRelativePath?: string,
  metaCreateTicketErrors: MetaCreateTicketError[] = []
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

  if (!scopeRelativePath) {
    return { data }
  }

  const files: Record<string, AppFileSystemGuardOptions> = {
    "attachments[]": { scopeRelativePath },
  }

  return { data, files }
}
export const createTicket = async (
  actionPayload: CustomerSupportCreateTicketPayload,
  logsZipScopePath?: string,
  device?: Device
) => {
  let resolvedLogsZipScopePath: string | undefined
  let metaCreateTicketErrors: MetaCreateTicketError[] | undefined

  if (logsZipScopePath) {
    resolvedLogsZipScopePath = logsZipScopePath
  } else {
    const downloadAndArchiveLogsResult = await downloadAndArchiveLogs(device)

    resolvedLogsZipScopePath = downloadAndArchiveLogsResult.ok
      ? downloadAndArchiveLogsResult.data.path
      : undefined
    metaCreateTicketErrors = downloadAndArchiveLogsResult.ok
      ? downloadAndArchiveLogsResult.data.failed
      : undefined
  }

  const requestPayload = mapToCreateTicketRequestPayload(
    actionPayload,
    resolvedLogsZipScopePath,
    metaCreateTicketErrors
  )

  const createTicketResult = await createTicketRequest(requestPayload)
  if (!createTicketResult.ok) {
    logger.error("Failed to create ticket", createTicketResult.error)
    throw new AppError(createTicketResult.error.message, "CreateTicketError")
  }

  return createTicketResult
}
