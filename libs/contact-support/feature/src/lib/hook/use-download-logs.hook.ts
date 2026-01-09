/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useCallback } from "react"
import { Device } from "devices/common/models"
import { AppFileSystem } from "app-utils/renderer"
import { useActiveDeviceQuery } from "devices/common/feature"
import { downloadAndArchiveLogs } from "../actions/download-and-archive-logs"
import { AppFileSystemGuardOptions } from "app-utils/models"

export const useDownloadLogsHook = (): ((
  scopeDestinationPath: AppFileSystemGuardOptions
) => Promise<string | null>) => {
  const { data: activeDevice } = useActiveDeviceQuery<Device>()

  return useCallback(
    async (scopeDestinationPath) => {
      try {
        const downloadResult = await downloadAndArchiveLogs(activeDevice)
        if (!downloadResult.ok) {
          throw new Error("DownloadLogsFailed")
        }

        const appFileSystemResult = await AppFileSystem.cp({
          scopeSourcePath: {
            scopeRelativePath: downloadResult.data.path,
          },
          scopeDestinationPath,
        })

        if (!appFileSystemResult.ok) {
          throw new Error("CopyLogsFailed")
        }

        return downloadResult.data.path ?? null
      } catch (error) {
        console.error("Error downloading or copying logs:", error)
        return null
      }
    },
    [activeDevice]
  )
}
