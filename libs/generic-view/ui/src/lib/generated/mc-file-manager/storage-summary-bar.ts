/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Subview } from "generic-view/utils"
import { SegmentBarItem } from "generic-view/models"
import { color } from "./color"

const CONFIG_MAP: Record<string, SegmentBarItem> = {
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
    label: "Ebooks",
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

export const generateStorageSummaryBar = (entityTypes: string[]): Subview => {
  const dynamicSegments: SegmentBarItem[] = entityTypes.map(
    (entityType) => CONFIG_MAP[entityType]
  )
  const fixedSegments: SegmentBarItem[] = [
    CONFIG_MAP["otherFiles"],
    CONFIG_MAP["free"],
  ]

  return {
    storageSummaryBar: {
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
