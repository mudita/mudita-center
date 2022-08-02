/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcMain } from "electron-better-ipc"
import {
  DownloadFinished,
  DownloadListener,
} from "App/__deprecated__/renderer/interfaces/file-download.interface"
import { createDownloadChannels } from "App/__deprecated__/main/functions/create-download-listener-registrar"
import getAppSettingsMain from "App/__deprecated__/main/functions/get-app-settings"

export const PureOsDownloadChannels = createDownloadChannels("os")

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const registerPureOsDownloadListener = (
  registerDownloadListener: (
    params: DownloadListener
  ) => Promise<DownloadFinished>
) => {
  ipcMain.answerRenderer(
    PureOsDownloadChannels.start,
    async ({ url, fileName }: { url: string; fileName: string }) => {
      const { osDownloadLocation } = await getAppSettingsMain()

      return registerDownloadListener({
        url,
        fileName,
        savePath: osDownloadLocation,
        channels: PureOsDownloadChannels,
      })
    }
  )
}

export default registerPureOsDownloadListener
