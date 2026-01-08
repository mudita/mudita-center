/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { format } from "date-fns"
import logger from "electron-log/renderer"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Device } from "devices/common/models"
import {
  Harmony,
  HarmonyLogsFileList,
  HarmonyLogsResponse,
} from "devices/harmony/models"
import {
  CustomerSupportCreateTicketPayload,
  FreshdeskTicketDataType,
  FreshdeskTicketProduct,
} from "contact-support/models"
import { SerialPortDeviceType } from "app-serialport/models"
import { AppFileSystem, AppHttp, AppLogger, AppPath } from "app-utils/renderer"
import {
  AppError,
  AppFileSystemGuardOptions,
  AppHttpRequestConfig,
} from "app-utils/models"
import { delayUntilAtLeast, sliceSegments } from "app-utils/common"
import { ContactSupportFieldValues } from "contact-support/ui"
import { getActiveDevice } from "devices/common/feature"
import {
  downloadFileFromHarmony,
  getHarmonyLogs,
} from "devices/harmony/feature"
import { contactSupportMutationKeys } from "./contact-support-mutation-keys"
import { contactSupportConfig } from "./contact-support-config"

interface CreateTicketRequestPayload extends Pick<
  AppHttpRequestConfig,
  "data" | "files"
> {
  data: Record<string, string>
  files: Record<string, AppFileSystemGuardOptions>
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
  return AppHttp.request({
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
  const files: Record<string, AppFileSystemGuardOptions> = {
    "attachments[]": { scopeRelativePath },
  }

  return { data, files }
}

const isHarmonyDevice = (device: Device | null): device is Harmony => {
  return device?.deviceType === SerialPortDeviceType.Harmony
}

const saveAppDeviceLogs = async (
  destinationPath: string,
  device: Device | null
) => {
  if (isHarmonyDevice(device)) {
    const crashDumpsResult = await getHarmonyLogs(device, {
      fileList: HarmonyLogsFileList.CrashDumps,
    })

    const systemLogsResult = await getHarmonyLogs(device, {
      fileList: HarmonyLogsFileList.SystemLogs,
    })

    const crashDumpFiles: string[] =
      (crashDumpsResult.body as HarmonyLogsResponse)?.files || []
    const filesToDownload: string[] =
      (systemLogsResult.body as HarmonyLogsResponse)?.files || []

    for (const filePath of [...crashDumpFiles, ...filesToDownload]) {
      const fileName = sliceSegments(filePath, -1)
      try {
        await downloadFileFromHarmony({
          device,
          fileLocation: {
            scopeRelativePath: await AppPath.join(destinationPath, fileName),
          },
          targetPath: filePath,
        })
      } catch (error) {
        console.warn("Failed to download log file from Harmony:", error)
      }
    }
  }
}

const createTicket = async (
  actionPayload: CustomerSupportCreateTicketPayload,
  device: Device | null
) => {
  const metaCreateTicketErrors: MetaCreateTicketError[] = []
  const todayFormatDate = format(new Date(), "yyyy-MM-dd")
  const tmpLogsScopePath = contactSupportConfig.tmpLogsScopeRelativePath
  const tmpLogsDirScopePath = `${tmpLogsScopePath}/logs`

  const rmResult = await AppFileSystem.rm({
    scopeRelativePath: tmpLogsScopePath,
    options: { recursive: true, force: true },
  })

  if (!rmResult.ok) {
    logger.warn(`Failed to remove old logs: ${rmResult.error.message}`)
  }

  const mkdirResult = await AppFileSystem.mkdir({
    scopeRelativePath: tmpLogsDirScopePath,
    options: { recursive: true },
  })

  if (!mkdirResult.ok) {
    metaCreateTicketErrors.push(
      new AppError(mkdirResult.error.message, SupportMetaErrorName.MkdirError)
    )
  }

  await saveAppDeviceLogs(tmpLogsDirScopePath, device)

  const appLogsFileName = `mc-${todayFormatDate}.txt`
  const appLogsFileScopePath = `${tmpLogsDirScopePath}/${appLogsFileName}`
  const aggregateLogsToFileResult = await AppLogger.aggregateLogsToFile({
    scopeRelativePath: appLogsFileScopePath,
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
  const zipFileScopePath = `${tmpLogsScopePath}/${zippedLogsFileName}`

  const archiveResult = await AppFileSystem.archive({
    scopeRelativePath: tmpLogsDirScopePath,
    scopeDestinationPath: zipFileScopePath,
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
    zipFileScopePath,
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

      return delayUntilAtLeast(
        () => createTicket(actionPayload, activeDevice),
        500
      )
    },
  })
}
