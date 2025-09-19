/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useMutation } from "@tanstack/react-query"
import { HarmonyOsUpdateInfoFile } from "./use-harmony-os-update-info.query"
import { AppHttp } from "app-utils/renderer"
import { useCallback, useEffect, useRef, useState } from "react"
import { sum } from "lodash"
import { theme } from "app-theme/utils"
import { AppFileSystemScopeOptions } from "app-utils/models"
import { HarmonyOSUpdateError } from "devices/harmony/models"

export const getHarmonyOsDownloadLocation = (
  fileName: string
): AppFileSystemScopeOptions => {
  return {
    scopeRelativePath: ["os-updates", "harmony", fileName],
    scope: "userData",
  }
}

const mutationFn = async (
  updateInfo: HarmonyOsUpdateInfoFile[],
  onProgress: (progress: number) => void,
  abortController: AbortController
) => {
  const totalSizes = updateInfo.map((info) => info.size)
  const downloadedSize: Record<string, number> = {}

  const responses = await Promise.all(
    updateInfo.map(async (file) => {
      const promise = AppHttp.request({
        url: file.url,
        method: "GET",
        responseType: "arraybuffer",
        savePath: getHarmonyOsDownloadLocation(file.name).scopeRelativePath,
        onDownloadProgress: (progress) => {
          downloadedSize[file.name] = progress.loaded
          onProgress(
            Math.floor(
              (sum(Object.values(downloadedSize)) / sum(totalSizes)) * 100
            )
          )
        },
      })
      abortController.signal?.addEventListener("abort", () => {
        promise?.abort()
      })
      return (await promise).data
    })
  )
  if (abortController.signal.aborted) {
    return null
  }
  if (responses.some((res) => !res)) {
    throw HarmonyOSUpdateError.DownloadFailed
  }
  return responses
}

export const useHarmonyOsDownloadMutation = () => {
  const abortControllerRef = useRef(new AbortController())

  const [progress, setProgress] = useState(0)

  const mutation = useMutation<
    unknown[] | null,
    HarmonyOSUpdateError,
    HarmonyOsUpdateInfoFile[],
    void
  >({
    mutationFn: (updateInfo: HarmonyOsUpdateInfoFile[]) => {
      return mutationFn(
        updateInfo,
        (progress) => {
          setProgress(progress)
        },
        abortControllerRef.current
      )
    },
    onMutate: () => {
      if (!navigator.onLine) {
        throw HarmonyOSUpdateError.DownloadFailed
      }
      setProgress(0)
    },
  })

  const abort = useCallback(() => {
    abortControllerRef.current.abort()
    abortControllerRef.current = new AbortController()
    mutation.reset()
    setTimeout(() => {
      setProgress(0)
    }, theme.app.constants.modalTransitionDuration)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    return () => {
      abort()
    }
  }, [abort])

  return {
    ...mutation,
    abort,
    progress,
  }
}
