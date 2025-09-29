/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { sumBy } from "lodash"
import { HarmonyFile, HarmonyInfoResponse } from "devices/harmony/models"
import { FileManagerFileCategory } from "devices/common/ui"
import { formatBytes, ISegmentBarItem } from "app-theme/ui"
import {
  HARMONY_CATEGORIES_CONFIG_MAP,
  MARKETING_TOTAL_BYTES,
} from "./harmony-manage-files.config"
import { mapToFileManagerFileMap } from "./map-to-harmony-file-map"
import {
  FileCategoryId,
  FileManagerCategoryFileMap,
} from "./harmony-manage-files.types"
import { mapToSegment } from "./map-to-segment"

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

  const alarmFilesBytes = sumBy(alarmFiles, "fileSize")
  const relaxationFilesBytes = sumBy(relaxationFiles, "fileSize")

  const systemReservedSpace = config?.systemReservedSpace ?? 0
  const usedUserSpace = config?.usedUserSpace ?? 0

  const deviceSpaceTotal =
    config?.deviceSpaceTotal === undefined
      ? MARKETING_TOTAL_BYTES
      : config?.deviceSpaceTotal
  const marketingPaddingBytes = MARKETING_TOTAL_BYTES - deviceSpaceTotal
  const totalSpaceBytes = marketingPaddingBytes + deviceSpaceTotal

  const usedSpaceBytes =
    marketingPaddingBytes + systemReservedSpace + usedUserSpace

  const otherSpaceBytes =
    usedSpaceBytes - (alarmFilesBytes + relaxationFilesBytes)

  const freeSpaceBytes = totalSpaceBytes - usedSpaceBytes

  const segments: ISegmentBarItem[] = [
    mapToSegment(FileCategoryId.AlarmFiles, alarmFilesBytes),
    mapToSegment(FileCategoryId.RelaxationFiles, relaxationFilesBytes),
    mapToSegment("otherFiles", otherSpaceBytes),
    mapToSegment("free", freeSpaceBytes),
  ]

  const categoryFileMap: FileManagerCategoryFileMap = {
    AlarmFiles: mapToFileManagerFileMap(alarmFiles),
    RelaxationFiles: mapToFileManagerFileMap(relaxationFiles),
  }

  const categories = [
    {
      ...HARMONY_CATEGORIES_CONFIG_MAP.AlarmFiles,
      size: formatBytes(alarmFilesBytes, { minUnit: "KB" }),
      count: alarmFiles.length,
    },
    {
      ...HARMONY_CATEGORIES_CONFIG_MAP.RelaxationFiles,
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
