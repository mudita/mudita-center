import { ipcRenderer } from "electron-better-ipc"
import { osUpdateAlreadyDownloadedChannel } from "App/main/functions/register-os-update-already-downloaded-checker"
import { Filename, Filesize } from "Renderer/interfaces/file-download.interface"

const osUpdateAlreadyDownloadedCheck = (
  fileName: Filename,
  fileSize: Filesize
): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await ipcRenderer.callMain<
        { fileName: Filename; fileSize: Filesize },
        boolean
      >(osUpdateAlreadyDownloadedChannel, { fileName, fileSize })
      resolve(data)
    } catch (error) {
      reject(error)
    }
  })
}

export default osUpdateAlreadyDownloadedCheck
