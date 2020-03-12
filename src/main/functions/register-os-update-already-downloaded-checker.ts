import { ipcMain } from "electron-better-ipc"
import fs from "fs-extra"
import { Filename, Filesize } from "Renderer/interfaces/file-download.interface"
import { app } from "electron"
import { name } from "../../../package.json"

export const osUpdateAlreadyDownloadedChannel = "os-update-exists-check"

const registerOsUpdateAlreadyDownloadedCheck = () => {
  ipcMain.answerRenderer<{ fileName: Filename; fileSize: Filesize }, boolean>(
    osUpdateAlreadyDownloadedChannel,
    ({ fileName, fileSize }) => {
      const filePath = `${app.getPath("appData")}/${name}/pure-os/` + fileName
      return fs.existsSync(filePath) && fs.statSync(filePath).size === fileSize
    }
  )
}

export default registerOsUpdateAlreadyDownloadedCheck
