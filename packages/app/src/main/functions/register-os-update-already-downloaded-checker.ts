import { ipcMain } from "electron-better-ipc"
import fs from "fs-extra"
import { Release } from "App/main/functions/register-pure-os-update-listener"
import path from "path"
import getAppSettingsMain from "App/main/functions/get-app-settings"

export const osUpdateAlreadyDownloadedChannel = "os-update-exists-check"

const registerOsUpdateAlreadyDownloadedCheck = () => {
  ipcMain.answerRenderer<Release["file"], boolean>(
    osUpdateAlreadyDownloadedChannel,
    async ({ url, size }) => {
      const fileName = url.split("/").pop() as string
      const { pureOsDownloadLocation } = await getAppSettingsMain()
      const filePath = path.join(pureOsDownloadLocation, fileName)

      return fs.existsSync(filePath) && fs.statSync(filePath).size === size
    }
  )
}

export default registerOsUpdateAlreadyDownloadedCheck
