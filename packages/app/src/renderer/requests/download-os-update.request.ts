/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { PureOsDownloadChannels } from "App/main/functions/register-pure-os-download-listener"
import {
  DownloadFinished,
  DownloadStatus,
} from "Renderer/interfaces/file-download.interface"

export const cancelOsDownload = (interrupt = false) => {
  ipcRenderer.send(PureOsDownloadChannels.cancel, interrupt)
}

const downloadOsUpdateRequest = async (props: {
  url: string
  fileName: string
}): Promise<DownloadFinished> => {
  const data: DownloadFinished = await ipcRenderer.callMain(
    PureOsDownloadChannels.start,
    props
  )
  if (data.status === DownloadStatus.Completed) {
    return data
  } else {
    throw new Error("There was a problem when downloading OS update")
  }
}

export default downloadOsUpdateRequest
