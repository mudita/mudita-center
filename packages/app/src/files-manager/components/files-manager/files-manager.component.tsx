/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceType } from "@mudita/pure"
import React, { useEffect } from "react"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { FilesManagerContainer } from "App/files-manager/components/files-manager/files-manager.styled"
import FilesSummary from "App/files-manager/components/files-summary/files-summary.component"
import {
  DiskSpaceCategory,
  FilesManagerProps,
} from "App/files-manager/components/files-manager/files-manager.interface"
import { FilesManagerTestIds } from "App/files-manager/components/files-manager/files-manager-test-ids.enum"
import {
  DiskSpaceCategoryType,
  DeviceDirectory,
  filesSummaryElements,
} from "App/files-manager/constants"
import FilesStorage from "App/files-manager/components/files-storage/files-storage.component"

const FilesManager: FunctionComponent<FilesManagerProps> = ({
  memorySpace = {
    free: 0,
    full: 0,
    total: 0,
  },
  resultState,
  files,
  getFiles,
  deviceType,
}) => {
  const { free, total } = memorySpace
  const systemMemory = total - free

  const downloadFiles = () => {
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/await-thenable
    if (deviceType === DeviceType.MuditaPure) {
      getFiles(DeviceDirectory.Music)
    } else {
      getFiles(DeviceDirectory.Relaxation)
    }
  }
  useEffect(() => {
    if (deviceType) {
      void downloadFiles()
    }
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deviceType])

  const diskSpaceCategories: DiskSpaceCategory[] = filesSummaryElements.map(
    (element) => {
      if (element.type === DiskSpaceCategoryType.Free) {
        return {
          ...element,
          size: free,
        }
      }
      if (element.type === DiskSpaceCategoryType.UsedSpace) {
        return {
          ...element,
          size: systemMemory,
        }
      }
      return element
    }
  )

  return (
    <FilesManagerContainer data-testid={FilesManagerTestIds.Container}>
      <FilesSummary
        diskSpaceCategories={diskSpaceCategories}
        totalMemorySpace={total}
        systemMemory={systemMemory}
      />
      <FilesStorage resultState={resultState} files={files} />
    </FilesManagerContainer>
  )
}

export default FilesManager
