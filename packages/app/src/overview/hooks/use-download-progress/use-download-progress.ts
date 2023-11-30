/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useEffect, useState } from "react"
import { IpcRendererEvent } from "electron/renderer"
import {
  registerDownloadProgressListener,
  removeDownloadProgressListener,
} from "App/overview/listeners/download-progress.listener"
import { cancelOsDownload } from "App/update/requests"
import {
  DownloadProgress,
  DownloadStatus,
} from "App/__deprecated__/renderer/interfaces/file-download.interface"

interface Result {
  downloadProgress: DownloadProgress | undefined
  resetDownloadProgress: () => void
}

export const useDownloadProgress = (): Result => {
  const [downloadProgress, setDownloadProgress] = useState<
    DownloadProgress | undefined
  >()

  useEffect(() => {
    const downloadListener = (_event: IpcRendererEvent, progress: DownloadProgress) => {
      const { status } = progress
      setDownloadProgress(progress)
      if (status === DownloadStatus.Interrupted) {
        cancelOsDownload(true)
      }
    }

    registerDownloadProgressListener(downloadListener)

    return () => {
      removeDownloadProgressListener(downloadListener)
    }
  }, [])

  const resetDownloadProgress = () => {
    setDownloadProgress(undefined)
  }

  return {
    downloadProgress,
    resetDownloadProgress,
  }
}
