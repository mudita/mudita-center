/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FileManagerFile } from "devices/common/ui"
import { FeatureId } from "devices/api-device/feature"

export type FileCategoryId = string
export type SegmentId = FileCategoryId | "otherFiles" | "free"

interface AppFileManagerFileAdditionalInfo {
  installationStatus: "NOT_INSTALLED" | "INSTALLED" | "UNKNOWN"
  apkVersion: string
  installedVersion?: string
}

export interface AppFileManagerFile extends FileManagerFile {
  additionalInfo: AppFileManagerFileAdditionalInfo
}

export const isAppFileManagerFile = (
  file?: FileManagerFile | AppFileManagerFile
): file is AppFileManagerFile => {
  return (file as AppFileManagerFile).additionalInfo !== undefined
}

export const DeviceManageFileFeature = {
  Internal: "mc-file-manager-internal",
  External: "mc-file-manager-external",
} as const satisfies Record<string, FeatureId>

export type DeviceManageFileFeatureId =
  (typeof DeviceManageFileFeature)[keyof typeof DeviceManageFileFeature]
