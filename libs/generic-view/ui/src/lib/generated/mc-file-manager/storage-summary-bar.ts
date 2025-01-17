/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ComponentGenerator } from "generic-view/utils"
import { SegmentBarItem } from "generic-view/models"
import { color } from "./color"

// TODO: Implement getting this data from the API
export const SEGMENTS_CONFIG_MAP: Record<string, SegmentBarItem> = {
  audioFiles: {
    color: color.audioFiles,
    label: "Music",
    value: 0,
    minWidth: 24,
  },
  imageFiles: {
    color: color.imageFiles,
    label: "Photos",
    value: 0,
    minWidth: 24,
  },
  ebookFiles: {
    color: color.ebookFiles,
    label: "E-books",
    value: 0,
    minWidth: 24,
  },
  applicationFiles: {
    color: color.applicationFiles,
    label: "Apps",
    value: 0,
    minWidth: 24,
  },
  otherFiles: {
    color: color.otherFiles,
    label: "Other files",
    value: 0,
    minWidth: 24,
  },
  free: {
    color: color.free,
    label: "Free",
    value: 1,
    minWidth: 12,
  },
}

export const generateStorageSummaryBarKey = (key: string) => {
  return `${key}storageSummaryBar`
}

export const generateStorageSummaryBar: ComponentGenerator<string[]> = (
  key,
  entityTypes
) => {
  const dynamicSegments: SegmentBarItem[] = entityTypes.map(
    (entityType) => SEGMENTS_CONFIG_MAP[entityType]
  )
  const fixedSegments: SegmentBarItem[] = [
    SEGMENTS_CONFIG_MAP["otherFiles"],
    SEGMENTS_CONFIG_MAP["free"],
  ]

  return {
    [generateStorageSummaryBarKey(key)]: {
      component: "segment-bar",
      layout: {
        margin: "4px 0 0 0",
        gridPlacement: {
          row: 2,
          column: 1,
          width: 2,
          height: 1,
        },
      },
      config: {
        segments: [...dynamicSegments, ...fixedSegments],
      },
    },
  }
}
