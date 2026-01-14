/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useCallback, useState } from "react"
import { AppResult } from "app-utils/models"
import { FileManagerFile } from "../manage-files/manage-files.types"

export interface UseAppInstallationFlowArgs {
  install: (params: {
    appFile: FileManagerFile
    onProgress: (progress: {
      progress: number
      item: {
        name: string
      }
    }) => void
  }) => Promise<AppResult<void>>
}

export const useAppInstallationFlow = ({
  install,
}: UseAppInstallationFlowArgs): {
  runInstall: (appFile: FileManagerFile) => Promise<AppResult<void>>
  progress: number
  currentItem: { name: string } | null
} => {
  const [progress, setProgress] = useState(0)
  const [currentItem, setCurrentItem] = useState<{ name: string } | null>(null)

  const runInstall = useCallback(
    async (appFile: FileManagerFile) => {
      setProgress(0)
      setCurrentItem(null)
      return await install({
        appFile,
        onProgress: ({ progress, item }) => {
          setProgress(progress)
          setCurrentItem(item)
        },
      })
    },
    [install]
  )

  return {
    runInstall,
    progress,
    currentItem,
  }
}
