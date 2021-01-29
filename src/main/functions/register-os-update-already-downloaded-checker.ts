import { ipcMain } from "electron-better-ipc"
import fs from "fs-extra"
import { Release } from "App/main/functions/register-pure-os-update-listener"
import { app } from "electron"
import path from "path"
import { name } from "../../../package.json"

export const osUpdateAlreadyDownloadedChannel = "os-update-exists-check"

const registerOsUpdateAlreadyDownloadedCheck = () => {
  ipcMain.answerRenderer<Release["file"], boolean>(
    osUpdateAlreadyDownloadedChannel,
    async ({ url, size }) => {
      const fileName = url.split("/").pop() as string
      const { pureOsDownloadLocation } = await fs.readJSON(
        `${app.getPath("appData")}/${name}/settings.json`
      )
      const filePath = path.join(pureOsDownloadLocation, fileName)

      return fs.existsSync(filePath) && fs.statSync(filePath).size === size
    }
  )
}

export default registerOsUpdateAlreadyDownloadedCheck
