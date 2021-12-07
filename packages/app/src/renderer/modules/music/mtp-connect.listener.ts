/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Mtp from "./mtp"
// import * as fs from "fs"
import { ipcMain } from "electron-better-ipc"
import { IpcMusic } from "Renderer/modules/music/ipc-event.enum"
import logger from "App/main/utils/logger"

export interface FileInformation {
  id: string,
  fileName: string,
  size: number
}

const getFileInformation = async (mtp: Mtp, handleId: number): Promise<FileInformation> => {
  logger.info(`getFileInformation: ${handleId}`)
  const fileName = await mtp.getFileName(handleId)
  logger.info(`fileName: ${fileName}`)
  const size = await mtp.getFileSize(handleId)
  logger.info(`size: ${size}`)

  return {
    fileName,
    id: String(handleId),
    size: Number(size)
  }
}

export const registerMtpConnectListener = (): void => {
  ipcMain.answerRenderer(IpcMusic.MtpConnect, () => {
    console.log("mtp connect init: ")
    const files: FileInformation[] = []
    const mtp = new Mtp(13072, 256)

    return new Promise((resolve => {
      // @ts-ignore
      mtp.on("error", (error: any) => {
        resolve({status: 0, error})
      })

      // @ts-ignore
      mtp.on("ready", async () => {
        logger.info("ready: ")
        await mtp.openSession()
        logger.info("opened: ")

        const handles = await mtp.getObjectHandles()
        logger.info(`handles: ${handles}`)

        for await (const handleId of handles) {
          const fileInformation = await getFileInformation(mtp, handleId)
          files.push(fileInformation)
        }

        await mtp.close()

        resolve({status: 1, data: files})
      })
    }))
  })
}
