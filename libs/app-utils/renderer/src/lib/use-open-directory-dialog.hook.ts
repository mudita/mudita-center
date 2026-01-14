/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useCallback, useEffect, useRef } from "react"

import {
  AppFileSystemGuardOptions,
  OpenDialogOptionsLite,
} from "app-utils/models"
import { AppFileSystem } from "./app-file-system"
import { AppActions } from "./app-actions"

interface OpenDirectoryDialogOptions {
  defaultPath?: AppFileSystemGuardOptions
}

const defaultPathOptions: AppFileSystemGuardOptions = {
  scopeRelativePath: "",
  scope: "downloads",
}

export const useOpenDirectoryDialogHook = (
  options?: OpenDirectoryDialogOptions
) => {
  const defaultPathRef = useRef<string | null>(null)

  useEffect(() => {
    ;(async () => {
      const res = await AppFileSystem.getPath(
        options?.defaultPath ?? defaultPathOptions
      )

      if (res.ok) {
        defaultPathRef.current = res.data
      }
    })()
  }, [options?.defaultPath])

  return useCallback(
    async (options: OpenDialogOptionsLite): Promise<string | null> => {
      const nextOptions = {
        ...options,
        defaultPath:
          options.defaultPath ?? defaultPathRef.current ?? undefined,
      }

      const directories = await AppActions.openFileDialog(nextOptions)
      return directories[0] ?? null
    },
    []
  )
}
