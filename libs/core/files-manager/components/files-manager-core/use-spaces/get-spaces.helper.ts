/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MemorySpace } from "Core/files-manager/components/files-manager-core/files-manager.interface"
import { File } from "Core/files-manager/dto"
import { Spaces } from "Core/files-manager/components/files-manager-core/use-spaces/spaces.interface"

/***
 * logic with the `isSizeCorrupt` property should be simplified after fix a issue in os side
 * OS issue url https://appnroll.atlassian.net/browse/MOS-744
 ***/

export const getSpaces = (
  files: File[] | null,
  memorySpace: MemorySpace
): Spaces => {
  const { reservedSpace, usedUserSpace, total } = memorySpace
  const usedMemorySpace = reservedSpace + usedUserSpace
  const freeSpace = total - usedMemorySpace
  const musicSpace = files?.reduce((a, b) => a + b.size, 0) ?? 0
  const otherSpace = usedUserSpace - musicSpace

  return {
    reservedSpace,
    freeSpace,
    usedMemorySpace,
    otherSpace,
    musicSpace,
    totalMemorySpace: total,
  }
}
