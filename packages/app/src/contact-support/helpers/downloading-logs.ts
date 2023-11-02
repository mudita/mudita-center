/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { formatDate } from "App/__deprecated__/renderer/utils/format-date"
import { ArchiveFile } from "App/__deprecated__/main/functions/register-archive-files-listener"
import getAppLogs from "App/__deprecated__/renderer/requests/get-app-logs.request"
import { downloadDeviceFiles } from "App/device-file-system/requests/download-device-file.request"
import { getDeviceLogFiles } from "App/device-log/requests"
import { DiagnosticsFilePath } from "App/device/constants"
import { DeviceFile } from "App/device-file-system/dto"

export const todayFormatDate = formatDate(new Date())
export const attachedFileName = `${todayFormatDate}.zip`

export const downloadingLogs = async (): Promise<
  (ArchiveFile | DeviceFile)[]
> => {
  const mcFileName = `mc-${todayFormatDate}.txt`
  const appLogs = await getAppLogs(15000000)

  const appLogFile: ArchiveFile = {
    data: appLogs,
    name: mcFileName,
  }

  const getDeviceLogsFilesResult = await getDeviceLogFiles()

  const downloadDeviceFilesResult = await downloadDeviceFiles([
    DiagnosticsFilePath.UPDATER_LOG,
  ])

  const deviceLogFiles = getDeviceLogsFilesResult.ok
    ? getDeviceLogsFilesResult.data
    : []
  const deviceUpdaterLogFile = downloadDeviceFilesResult.ok
    ? downloadDeviceFilesResult.data
    : []

  let files = [...deviceLogFiles, appLogFile]

  if (deviceUpdaterLogFile !== undefined) {
    files = files.concat(deviceUpdaterLogFile)
  }

  return files
}
