import { ipcMain } from "electron-better-ipc"
import fs from "fs-extra"
import { Filename, Filesize } from "Renderer/interfaces/file-download.interface"

export const osUpdateAlreadyDownloadedChannel = "os-update-exists-check"

const registerOsUpdateAlreadyDownloadedCheck = () => {
  ipcMain.answerRenderer<{ filePath: Filename; fileSize: Filesize }, boolean>(
    osUpdateAlreadyDownloadedChannel,
    ({ filePath, fileSize }) => {
      return fs.existsSync(filePath) && fs.statSync(filePath).size === fileSize
    }
  )
}

export default registerOsUpdateAlreadyDownloadedCheck
