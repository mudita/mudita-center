/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { Result, ResultObject } from "Core/core/builder"
import { AppError } from "Core/core/errors"
import { PureOsDownloadChannels } from "Core/__deprecated__/main/functions/register-pure-os-download-listener"
import {
  DownloadFinished,
  DownloadStatus,
} from "Core/__deprecated__/renderer/interfaces/file-download.interface"

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const cancelFileDownload = (interrupt = false) => {
  ipcRenderer.send(PureOsDownloadChannels.cancel, interrupt)
}

export const downloadFlashingFileRequest = async (
  props: {
    url: string
    fileName: string
  },
  signal: AbortSignal
): Promise<
  | ResultObject<DownloadFinished>
  | ResultObject<DownloadStatus.Cancelled | DownloadStatus.Interrupted>
> => {
  const abortHandler = () => {
    signal.removeEventListener("abort", abortHandler)
    cancelFileDownload(true)
  }
  signal.addEventListener("abort", abortHandler)

  const data: DownloadFinished = await ipcRenderer.callMain(
    PureOsDownloadChannels.start,
    props
  )

  return data.status === DownloadStatus.Completed
    ? Result.success(data)
    : Result.failed(new AppError("", ""), data.status)
}
