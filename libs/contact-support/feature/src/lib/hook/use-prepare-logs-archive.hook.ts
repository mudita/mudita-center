/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useCallback } from "react"
import { Device } from "devices/common/models"
import { AppFileSystem } from "app-utils/renderer"
import { useActiveDeviceQuery } from "devices/common/feature"
import { prepareLogsArchive } from "../actions/prepare-logs-archive"
import { AppFileSystemGuardOptions } from "app-utils/models"

export const usePrepareLogsArchiveHook = (): ((
  archiveCopyTargetPath: AppFileSystemGuardOptions
) => Promise<string | null>) => {
  const { data: activeDevice } = useActiveDeviceQuery<Device>()

  return useCallback(
    async (archiveCopyTargetPath) => {
      try {
        const prepareLogsArchiveResult = await prepareLogsArchive(activeDevice)
        if (!prepareLogsArchiveResult.ok) {
          throw new Error("PrepareLogsArchiveFailed")
        }

        const appFileSystemResult = await AppFileSystem.cp({
          scopeSourcePath: {
            scopeRelativePath: prepareLogsArchiveResult.data.path,
          },
          scopeDestinationPath: archiveCopyTargetPath,
        })

        if (!appFileSystemResult.ok) {
          throw new Error("CopyLogsFailed")
        }

        return prepareLogsArchiveResult?.data.path || null
      } catch (error) {
        console.error("Error preparing or copying logs:", error)
        return null
      }
    },
    [activeDevice]
  )
}
