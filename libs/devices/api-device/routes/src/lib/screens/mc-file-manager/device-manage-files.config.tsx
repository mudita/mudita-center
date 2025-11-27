/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ManageFilesViewProps } from "devices/common/ui"
import { ISegmentBarItem } from "app-theme/ui"
import { formatMessage } from "app-localize/utils"
import { SegmentId } from "./device-manage-files.types"
import { deviceManageFilesMessages } from "./device-manage-files.messages"
import { StorageInformation } from "devices/api-device/models"

export enum FileManagerMarkerColor {
  otherFiles = "#3B3F42",
  free = "#F4F5F6",
}

export const DEVICE_SEGMENTS_CONFIG_MAP: Record<SegmentId, ISegmentBarItem> = {
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

export const OTHER_FILES_LABEL_TEXTS: ManageFilesViewProps["otherFiles"] = [
  { name: formatMessage(deviceManageFilesMessages.otherFilesSystemLabelText) },
  { name: formatMessage(deviceManageFilesMessages.otherFilesOtherLabelText) },
]

export const EMPTY_STORAGE_INFO: StorageInformation = {
  categoriesSpaceInformation: {},
  path: "",
  freeSpaceBytes: 0,
  usedSpaceBytes: 0,
  totalSpaceBytes: 0,
  freeSpaceString: "0",
  usedSpaceString: "0",
  totalSpaceString: "0",
}

export const PROGRESS_MAIN_PROCESS_PHASE_RATIO = 0.9
export const PROGRESS_REFETCH_PHASE_RATIO = 0.1
