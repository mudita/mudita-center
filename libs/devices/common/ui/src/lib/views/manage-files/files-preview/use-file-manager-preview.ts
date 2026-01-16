/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useMemo } from "react"
import { FilePreviewErrorCode, FilePreviewFile } from "app-theme/ui"
import { QueryFunctionContext, useQuery } from "@tanstack/react-query"
import { DevicesQueryKeys } from "devices/common/models"
import { SerialPortDeviceInfo } from "app-serialport/models"
import { resizeImage } from "./resize-image"
import { AppResult } from "app-utils/models"

const STALE_TIME = 15 * 60 * 1000 // 15 minutes

const verifyImage = async (dataUrl: string) => {
  return new Promise<boolean>((resolve) => {
    const img = new Image()
    img.src = dataUrl
    img.onload = () => resolve(true)
    img.onerror = () => resolve(false)
  })
}

export type FilesManagerFilePreviewDownload = (payload: {
  file: FilePreviewFile
  abortController: AbortController
}) => Promise<AppResult<string>>

interface QueryParams {
  abortSignal: AbortSignal
  file?: FilePreviewFile
  callback?: FilesManagerFilePreviewDownload
}

const queryFn = async ({ abortSignal, file, callback }: QueryParams) => {
  if (!callback) {
    throw FilePreviewErrorCode.Unknown
  }

  if (!file) {
    throw FilePreviewErrorCode.NotFound
  }

  if (
    file.extension.toLowerCase() === "heic" ||
    file.extension.toLowerCase() === "heif"
  ) {
    throw FilePreviewErrorCode.UnsupportedFileType
  }

  try {
    const abortController = new AbortController()
    abortSignal.addEventListener("abort", () => {
      abortController.abort()
    })

    const base64Response = await callback({ file, abortController })

    if (!base64Response.ok) {
      throw FilePreviewErrorCode.Unknown
    }

    let dataUrl = `data:${file.type};base64,${base64Response.data}`

    if (abortSignal.aborted) {
      throw FilePreviewErrorCode.Unknown
    }

    if (file.type.startsWith("image/")) {
      dataUrl = resizeImage({ dataUrl, maxWidth: 960, maxHeight: 640 })
      const isImageCorrect = await verifyImage(dataUrl)
      if (!isImageCorrect) {
        throw FilePreviewErrorCode.UnsupportedFileType
      }
    }

    if (abortSignal.aborted) {
      throw FilePreviewErrorCode.Unknown
    }

    return {
      ...file,
      dataUrl,
    }
  } catch {
    throw FilePreviewErrorCode.Unknown
  }
}

export const useFileManagerPreviewQuery = (
  deviceId?: SerialPortDeviceInfo["id"],
  currentFile?: FilePreviewFile,
  onPreviewDownload?: FilesManagerFilePreviewDownload
) => {
  const placeholderData = useMemo(() => {
    if (!currentFile) {
      return undefined
    }
    return {
      ...currentFile,
      dataUrl: "",
    }
  }, [currentFile])

  return useQuery<FilePreviewFile, FilePreviewErrorCode>({
    queryKey: useFileManagerPreviewQuery.queryKey(currentFile?.id, deviceId),
    queryFn: ({ signal }: QueryFunctionContext) => {
      if (!currentFile) {
        throw FilePreviewErrorCode.Unknown
      }
      return queryFn({
        abortSignal: signal,
        file: currentFile,
        callback: onPreviewDownload,
      })
    },
    select: (data) => {
      return data ?? undefined
    },
    placeholderData,
    enabled: false,
    networkMode: "offlineFirst",
    staleTime: STALE_TIME,
    gcTime: STALE_TIME,
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })
}
useFileManagerPreviewQuery.queryKey = (itemId?: string, deviceId?: string) => {
  return [
    DevicesQueryKeys.All,
    deviceId,
    "filesPreview",
    ...(itemId ? [itemId] : []),
  ]
}
useFileManagerPreviewQuery.queryFn = queryFn
