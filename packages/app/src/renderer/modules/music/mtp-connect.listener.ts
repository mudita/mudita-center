/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Mtp from "./mtp"
import * as fs from "fs"
import { ipcMain } from "electron-better-ipc"
import { IpcMusic } from "Renderer/modules/music/ipc-event.enum"

export const registerMtpConnectListener = (): void => {
  ipcMain.answerRenderer(IpcMusic.MtpConnect, () => {
    console.log("mtp connect init: ")
    const mtp = new Mtp(13072, 256)

    // @ts-ignore
    mtp.on("error", (err: any) => console.log("Error", err))

    // @ts-ignore
    mtp.on("ready", async () => {
      console.log("ready: ")
      await mtp.openSession()
      console.log("opened: ")

      const handles = await mtp.getObjectHandles()
      console.log("handles: ", handles)

      const objectHandle = Math.max(...handles)
      console.log("objectHandle: ", objectHandle)

      const fileName = await mtp.getFileName(objectHandle)
      console.log("fileName: ", fileName)

      const array = await mtp.getFile(objectHandle, fileName)
      fs.writeFileSync(fileName, array)

      await mtp.close()
    })

    return
  })
}
