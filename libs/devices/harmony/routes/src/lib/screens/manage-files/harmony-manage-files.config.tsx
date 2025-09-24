/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IconType } from "app-theme/models"
import { HarmonyDirectory } from "devices/harmony/models"
import { FileManagerFileCategory } from "devices/common/ui"
import { ISegmentBarItem } from "app-theme/ui"
import { FileCategoryId, SegmentId } from "./harmony-manage-files.types"

export enum FileManagerMarkerColor {
  alarmFiles = "#0E7490",
  relaxationFiles = "#A8DADC",
  otherFiles = "#3B3F42",
  free = "#F4F5F6",
}

export const HARMONY_SEGMENTS_CONFIG_MAP: Record<SegmentId, ISegmentBarItem> = {
  AlarmFiles: {
    color: FileManagerMarkerColor.alarmFiles,
    label: "Alarms",
    value: 0,
    minWidth: 24,
  },
  RelaxationFiles: {
    color: FileManagerMarkerColor.relaxationFiles,
    label: "Relaxations",
    value: 0,
    minWidth: 24,
  },
  otherFiles: {
    color: FileManagerMarkerColor.otherFiles,
    label: "Other files",
    value: 0,
    minWidth: 24,
  },
  free: {
    color: FileManagerMarkerColor.free,
    label: "Free",
    value: 0,
    minWidth: 12,
  },
}

export const HARMONY_CATEGORIES_CONFIG_MAP: Record<
  FileCategoryId,
  FileManagerFileCategory & { id: FileCategoryId }
> = {
  [FileCategoryId.AlarmFiles]: {
    id: FileCategoryId.AlarmFiles,
    icon: IconType.Bell,
    markerColor: FileManagerMarkerColor.alarmFiles,
    label: "Alarms",
    directoryPath: HarmonyDirectory.Alarm,
    fileListEmptyStateDescription: "Add alarm files from your computer and they’ll transfer to your device automatically.",
    supportedFileTypes: ["mp3", "wav", "flac"],
    size: "0 KB",
    count: 0,
  },
  [FileCategoryId.RelaxationFiles]: {
    id: FileCategoryId.RelaxationFiles,
    icon: IconType.MuditaLogo,
    markerColor: FileManagerMarkerColor.relaxationFiles,
    label: "Relaxations",
    directoryPath: HarmonyDirectory.Relaxation,
    fileListEmptyStateDescription: "Add relaxation files from your computer and they’ll transfer to your device automatically.",
    supportedFileTypes: ["mp3", "wav", "flac"],
    size: "0 KB",
    count: 0,
  },
}

export const MARKETING_TOTAL_BYTES = 4_000_000_000
