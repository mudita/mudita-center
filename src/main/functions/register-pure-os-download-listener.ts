import fs from "fs-extra"
import { ipcMain } from "electron-better-ipc"
import { app } from "electron"
import { name } from "../../../package.json"
import {
  DownloadFinished,
  DownloadListener,
} from "Renderer/interfaces/file-download.interface"
import { createDownloadChannels } from "App/main/functions/create-download-listener-registrar"

export const PureOsDownloadChannels = createDownloadChannels("os")

const registerPureOsDownloadListener = (
  registerDownloadListener: (
    params: DownloadListener
  ) => Promise<DownloadFinished>
) => {
  ipcMain.answerRenderer(PureOsDownloadChannels.start, async (url: string) => {
    const { pureOsDownloadLocation } = await fs.readJSON(
      `${app.getPath("appData")}/${name}/settings.json`
    )

    return registerDownloadListener({
      url,
      path: pureOsDownloadLocation,
      channels: PureOsDownloadChannels,
    })
  })
}

export default registerPureOsDownloadListener
