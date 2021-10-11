/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import fs from "fs"
import { ipcMain } from "electron-better-ipc"
import { DeviceFileDeprecated } from "Backend/device-file-system-service/device-file-system-service"
import writeFile from "App/main/utils/write-file"
import writeGzip from "App/main/utils/write-gzip"
import getAppPath from "App/main/utils/get-app-path"
import rmdir from "App/main/utils/rmdir"
import { formatDate } from "Renderer/utils/format-date"

export enum ArchiveFilesEvents {
  Archive = "archive-files",
}

export interface ArchiveFilesData {
  files: DeviceFileDeprecated[]
}

const todayFormatDate = formatDate(new Date())
const filePath = `${getAppPath()}/archive-tmp-${todayFormatDate}`
const gzipFilePath = `${filePath}.zip`

const registerArchiveFilesListener = (): void => {
  ipcMain.answerRenderer<ArchiveFilesData, Promise<Buffer | undefined>>(
    ArchiveFilesEvents.Archive,
    async ({ files }) => {
      let buffer: Buffer | undefined

      const removeTmpFiles = (filePath: string): boolean => {
        return rmdir({ filePath, options: { recursive: true } })
      }

      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const writeFileSuccess = await writeFile({
          filePath,
          data: file.data,
          fileName: file.name,
        })

        if (!writeFileSuccess) {
          return undefined
        }
      }
      const writeGzipSuccess = await writeGzip({ filePath })
      if (writeGzipSuccess) {
        buffer = fs.readFileSync(gzipFilePath)
      }

      await removeTmpFiles(filePath)

      return buffer
    }
  )
}

export default registerArchiveFilesListener
