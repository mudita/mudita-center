/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { PureOsDownloadChannels } from "App/__deprecated__/main/functions/register-pure-os-download-listener"
import {
  DownloadFinished,
  DownloadStatus,
} from "App/__deprecated__/renderer/interfaces/file-download.interface"

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const cancelOsDownload = (interrupt = false) => {
  ipcRenderer.send(PureOsDownloadChannels.cancel, interrupt)
}

export const downloadOsUpdateRequest = async (props: {
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
