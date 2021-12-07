/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Mtp from "./mtp"
import { ipcMain } from "electron-better-ipc"
import { IpcMusic } from "Renderer/modules/music/ipc-event.enum"
import logger from "App/main/utils/logger"
import writeFile from "App/main/utils/write-file"

export const registerDownloadFileListener = (): void => {
  ipcMain.answerRenderer(
    IpcMusic.DownloadFile,
    ({ id, path: filePath }: { id: string; path: string }) => {
      console.log("mtp connect init: ")
      const mtp = new Mtp(13072, 256)

      return new Promise((resolve) => {
        // @ts-ignore

        // @ts-ignore
        mtp.on("error", (error: any) => {
          resolve({ status: 0, error })
        })

        mtp.on("ready", async () => {
          logger.info("ready: ")
          await mtp.openSession()

          const fileName = await mtp.getFileName(Number(id))
          logger.info("fileName: ", fileName)

          const data = await mtp.getFile(Number(id), fileName)
          logger.info("getFile finish: ")

          const writeResponse = writeFile({ data, filePath, fileName })
          await mtp.close()

          if (writeResponse) {
            resolve({ status: 1 })
          } else {
            resolve({ status: 0 })
          }
        })
      })
    }
  )
}
