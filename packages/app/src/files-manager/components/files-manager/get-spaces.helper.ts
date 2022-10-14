/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MemorySpace } from "App/files-manager/components/files-manager/files-manager.interface"
import { File } from "App/files-manager/dto"

export interface Spaces {
  reservedSpace: number
  freeSpace: number
  usedMemorySpace: number
  totalMemorySpace: number
  otherSpace: number
  musicSpace: number
}

/***
* logic with the `isSizeCorrupt` property should be simplified after fix a issue in os side
* OS issue url https://appnroll.atlassian.net/browse/MOS-744
***/

export const getSpaces = (files: File[], memorySpace: MemorySpace): Spaces => {
  const { reservedSpace, usedUserSpace, total } = memorySpace
  const totalUsedSpace = reservedSpace + usedUserSpace
  const totalAndTotalUsedSpaceDifference = total - totalUsedSpace
  const isSizeCorrupt = totalAndTotalUsedSpaceDifference < 0
  const usedMemorySpace = isSizeCorrupt ? total : totalUsedSpace
  const freeSpace = !isSizeCorrupt ? totalAndTotalUsedSpaceDifference : 0
  const musicSpace = files.reduce((a, b) => a + b.size, 0)

  const otherSpace = !isSizeCorrupt
    ? usedUserSpace - musicSpace
    : usedUserSpace - musicSpace + totalAndTotalUsedSpaceDifference

  return {
    reservedSpace,
    freeSpace,
    usedMemorySpace,
    otherSpace,
    musicSpace,
    totalMemorySpace: total
  }
}
