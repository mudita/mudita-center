/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useEffect, useState } from "react"
import { DiskSpaceCategory } from "Core/files-manager/components/files-manager/files-manager.interface"
import {
  DiskSpaceCategoryType,
  filesSummaryElements,
} from "Core/files-manager/constants"
import { Spaces } from "Core/files-manager/components/files-manager/use-spaces/spaces.interface"
import { File } from "Core/files-manager/dto"

const useDiskSpaceCategories = (
  files: File[] | null,
  { freeSpace, musicSpace, otherSpace, reservedSpace }: Spaces
): DiskSpaceCategory[] | null => {
  const [diskSpaceCategories, setDiskSpaceCategories] = useState<
    DiskSpaceCategory[] | null
  >(null)

  useEffect(() => {
    const getDiskSpaceCategories = (
      element: DiskSpaceCategory
    ): DiskSpaceCategory => {
      const elements = {
        [DiskSpaceCategoryType.Free]: { ...element, size: freeSpace },
        [DiskSpaceCategoryType.System]: { ...element, size: reservedSpace },
        [DiskSpaceCategoryType.Music]: {
          ...element,
          size: musicSpace,
          filesAmount: files?.length ?? 0,
        },
        [DiskSpaceCategoryType.OtherSpace]: { ...element, size: otherSpace },
      }

      return elements[element.type] as DiskSpaceCategory
    }

    if (files && typeof otherSpace !== "undefined") {
      const spaceCategories = filesSummaryElements.map(getDiskSpaceCategories)
      setDiskSpaceCategories(spaceCategories)
    }
  }, [files, freeSpace, musicSpace, otherSpace, reservedSpace])


  return diskSpaceCategories
}

export default useDiskSpaceCategories
