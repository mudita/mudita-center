/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { formatDate } from "Renderer/utils/format-date"
import { ArchiveFile } from "App/main/functions/register-archive-files-listener"
import getAppLogs from "Renderer/requests/get-app-logs.request"
import downloadDeviceFile from "Renderer/requests/download-device-file.request"
import getDeviceLogFiles from "Renderer/requests/get-device-log-files.request"
import { DiagnosticsFilePath } from "@mudita/pure"

export const todayFormatDate = formatDate(new Date())
export const attachedFileName = `${todayFormatDate}.zip`

export const downloadingLogs = async () => {
  const mcFileName = `mc-${todayFormatDate}.txt`
  const appLogs = await getAppLogs()
  const appLogFile: ArchiveFile = {
    data: appLogs,
    name: mcFileName,
  }

  const { data: deviceLogFiles = [] } = await getDeviceLogFiles()

  const { data: deviceUpdaterLogFile } = await downloadDeviceFile(
    DiagnosticsFilePath.UPDATER_LOG
  )

  const files = [...deviceLogFiles, appLogFile]

  if (deviceUpdaterLogFile !== undefined) {
    files.push(deviceUpdaterLogFile)
  }

  return files
}
