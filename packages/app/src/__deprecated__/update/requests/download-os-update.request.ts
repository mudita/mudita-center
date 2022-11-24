/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Result, ResultObject } from "App/core/builder"
import { AppError } from "App/core/errors"
import { PureOsDownloadChannels } from "App/__deprecated__/main/functions/register-pure-os-download-listener"
import {
  DownloadFinished,
  DownloadStatus,
} from "App/__deprecated__/renderer/interfaces/file-download.interface"
import { ipcRenderer } from "electron-better-ipc"

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const cancelOsDownload = (interrupt = false) => {
  ipcRenderer.send(PureOsDownloadChannels.cancel, interrupt)
}

export const downloadOsUpdateRequest = async (props: {
  url: string
  fileName: string
}): Promise<
  | ResultObject<DownloadFinished>
  | ResultObject<DownloadStatus.Cancelled | DownloadStatus.Interrupted>
> => {
  const data: DownloadFinished = await ipcRenderer.callMain(
    PureOsDownloadChannels.start,
    props
  )

  return data.status === DownloadStatus.Completed
    ? Result.success(data)
    : Result.failed(new AppError("", ""), data.status)
}
