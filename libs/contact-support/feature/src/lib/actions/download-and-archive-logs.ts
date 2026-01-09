/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Device } from "devices/common/models"
import { format } from "date-fns"
import { sliceSegments } from "app-utils/common"
import { AppError, AppResult, AppResultFactory } from "app-utils/models"
import {
  Harmony,
  HarmonyLogsFileList,
  HarmonyLogsResponse,
} from "devices/harmony/models"
import { SerialPortDeviceType } from "app-serialport/models"
import { AppFileSystem, AppLogger, AppPath } from "app-utils/renderer"
import logger from "electron-log/renderer"
import {
  downloadFileFromHarmony,
  getHarmonyLogs,
} from "devices/harmony/feature"
import { contactSupportConfig } from "../contact-support-config"
import {
  MetaCreateTicketError,
  SupportMetaErrorName,
} from "../use-contact-support.types"

const isHarmonyDevice = (device?: Device): device is Harmony => {
  return device?.deviceType === SerialPortDeviceType.Harmony
}

const saveAppDeviceLogs = async (
  destinationPath: string,
  metaCreateTicketErrors: MetaCreateTicketError[],
  device?: Device
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
      } catch {
        metaCreateTicketErrors.push(
          new AppError(
            `Failed to download log file ${filePath} from Harmony device.`,
            SupportMetaErrorName.DownloadLogsError
          )
        )
      }
    }
  }
}

interface DownloadAndArchiveLogsData {
  path: string
  failed?: MetaCreateTicketError[]
}

export const downloadAndArchiveLogs = async (
  device?: Device
): Promise<AppResult<DownloadAndArchiveLogsData, SupportMetaErrorName>> => {
  const metaCreateTicketErrors: MetaCreateTicketError[] = []
  const todayFormatDate = format(new Date(), "yyyy-MM-dd")
  const { tmpLogsScopePath, tmpLogsDirScopePath } = contactSupportConfig

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
    return AppResultFactory.failed(
      new AppError(mkdirResult.error.message, SupportMetaErrorName.MkdirError)
    )
  }

  await saveAppDeviceLogs(tmpLogsDirScopePath, metaCreateTicketErrors, device)

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
    return AppResultFactory.failed(
      new AppError(
        archiveResult.error.message,
        SupportMetaErrorName.ArchiveError
      )
    )
  }

  return AppResultFactory.success({
    path: zipFileScopePath,
    failed: metaCreateTicketErrors.length ? metaCreateTicketErrors : undefined,
  })
}
