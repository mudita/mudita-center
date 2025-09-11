/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { HarmonyFile, HarmonyInfoResponse } from "devices/harmony/models"
import { FileManagerFileCategory } from "devices/common/ui"
import { formatBytes, ISegmentBarItem } from "app-theme/ui"
import {
  HARMONY_CATEGORIES_CONFIG_MAP,
  HARMONY_SEGMENTS_CONFIG_MAP,
  MARKETING_TOTAL_BYTES,
} from "./harmony-manage-files.config"
import { mapToFileManagerFileMap } from "./map-to-harmony-file-map"
import {
  FileCategoryId,
  FileManagerCategoryFileMap,
} from "./harmony-manage-files.types"
import { mebiToBytes, sumFileSizes } from "./map-to-harmony.utils"

export interface HarmonyManageFilesData {
  categories: (FileManagerFileCategory & { id: FileCategoryId })[]
  segments: ISegmentBarItem[]
  categoryFileMap: FileManagerCategoryFileMap
  freeSpaceBytes: number
  usedSpaceBytes: number
  otherSpaceBytes: number
}

export const mapHarmonyToManageFiles = (
  payload: {
    config?: HarmonyInfoResponse
    alarmFiles?: HarmonyFile[]
    relaxationFiles?: HarmonyFile[]
  } = {}
): HarmonyManageFilesData => {
  const { config, alarmFiles = [], relaxationFiles = [] } = payload

  const alarmFilesBytes = sumFileSizes(alarmFiles)
  const relaxationFilesBytes = sumFileSizes(relaxationFiles)

  const marketingPaddingBytes =
    MARKETING_TOTAL_BYTES - mebiToBytes(config?.deviceSpaceTotal)

  const totalSpaceBytes =
    marketingPaddingBytes + mebiToBytes(config?.deviceSpaceTotal)

  const usedSpaceBytes =
    marketingPaddingBytes +
    mebiToBytes(config?.systemReservedSpace) +
    mebiToBytes(config?.usedUserSpace)

  const otherSpaceBytes =
    usedSpaceBytes - (alarmFilesBytes + relaxationFilesBytes)

  const freeSpaceBytes = totalSpaceBytes - usedSpaceBytes

  const segments: ISegmentBarItem[] = [
    { ...HARMONY_SEGMENTS_CONFIG_MAP.alarmFiles, value: alarmFilesBytes },
    {
      ...HARMONY_SEGMENTS_CONFIG_MAP.relaxationFiles,
      value: relaxationFilesBytes,
    },
    { ...HARMONY_SEGMENTS_CONFIG_MAP.otherFiles, value: otherSpaceBytes },
    { ...HARMONY_SEGMENTS_CONFIG_MAP.free, value: freeSpaceBytes },
  ]

  const categoryFileMap: FileManagerCategoryFileMap = {
    alarmFiles: mapToFileManagerFileMap(alarmFiles),
    relaxationFiles: mapToFileManagerFileMap(relaxationFiles),
  }

  const categories = [
    {
      ...HARMONY_CATEGORIES_CONFIG_MAP.alarmFiles,
      size: formatBytes(alarmFilesBytes, { minUnit: "KB" }),
      count: alarmFiles.length,
    },
    {
      ...HARMONY_CATEGORIES_CONFIG_MAP.relaxationFiles,
      size: formatBytes(relaxationFilesBytes, { minUnit: "KB" }),
      count: relaxationFiles.length,
    },
  ]

  return {
    categories,
    segments,
    categoryFileMap,
    freeSpaceBytes,
    usedSpaceBytes,
    otherSpaceBytes,
  }
}
