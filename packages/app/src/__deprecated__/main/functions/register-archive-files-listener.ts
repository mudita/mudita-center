/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import fs from "fs"
import { ipcMain } from "electron-better-ipc"
import writeFile from "App/__deprecated__/main/utils/write-file"
import writeGzip from "App/__deprecated__/main/utils/write-gzip"
import getAppPath from "App/__deprecated__/main/utils/get-app-path"
import rmdir from "App/__deprecated__/main/utils/rmdir"
import { formatDate } from "App/__deprecated__/renderer/utils/format-date"

export interface ArchiveFile extends Pick<File, "name"> {
  data: string | NodeJS.ArrayBufferView
}

export enum ArchiveFilesEvents {
  Archive = "archive-files",
}

export interface ArchiveFilesData {
  files: ArchiveFile[]
}

const todayFormatDate = formatDate(new Date())
const cwd = `${getAppPath()}/archive-tmp-${todayFormatDate}`
const gzipFilePath = `${cwd}.zip`

const registerArchiveFilesListener = (): void => {
  ipcMain.answerRenderer<ArchiveFilesData, Promise<Buffer | undefined>>(
    ArchiveFilesEvents.Archive,
    async ({ files }) => {
      let buffer: Buffer | undefined

      const removeTmpFiles = (cwd: string): boolean => {
        return rmdir({ cwd, options: { recursive: true } })
      }

      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const writeFileSuccess = writeFile({
          cwd,
          data: file.data,
          fileName: file.name,
        })

        if (!writeFileSuccess) {
          return undefined
        }
      }
      const writeGzipSuccess = await writeGzip({ cwd })
      if (writeGzipSuccess) {
        buffer = fs.readFileSync(gzipFilePath)
      }

      removeTmpFiles(cwd)

      return buffer
    }
  )
}

export default registerArchiveFilesListener
