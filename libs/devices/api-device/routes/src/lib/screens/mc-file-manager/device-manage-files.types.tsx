/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FileManagerFileMap } from "devices/common/ui"
import { FeatureId } from "devices/api-device/feature"

export type FileCategoryId = string
export type SegmentId = FileCategoryId | "otherFiles" | "free"

export type FileManagerCategoryFileMap = Record<
  FileCategoryId,
  FileManagerFileMap
>

export const DeviceManageFileFeature = {
  Internal: "mc-file-manager-internal",
  External: "mc-file-manager-external",
} as const satisfies Record<string, FeatureId>

export type DeviceManageFileFeatureId =
  (typeof DeviceManageFileFeature)[keyof typeof DeviceManageFileFeature]
