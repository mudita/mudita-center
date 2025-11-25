/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FileManagerFile } from "devices/common/ui"
import { FeatureId } from "devices/api-device/feature"

export type FileCategoryId = string
export type SegmentId = FileCategoryId | "otherFiles" | "free"

interface AppFileManagerFileAdditionalInfo {
  installationStatus: "NOT_INSTALLED" | "INSTALLED" | "UPDATE_AVAILABLE"
  apkVersion: string
  installedVersion?: string
}

export const isAppFileManagerFileAdditionalInfo = (
  value: unknown
): value is AppFileManagerFileAdditionalInfo => {
  if (typeof value !== "object" || value === null) return false

  return (
    "installationStatus" in value &&
    "apkVersion" in value &&
    typeof (value as Record<string, unknown>).installationStatus === "string" &&
    typeof (value as Record<string, unknown>).apkVersion === "string"
  )
}

export interface AppFileManagerFile extends FileManagerFile {
  additionalInfo: AppFileManagerFileAdditionalInfo
}

export const isAppFileManagerFile = (
  file?: FileManagerFile | AppFileManagerFile
): file is AppFileManagerFile => {
  return (file as AppFileManagerFile).additionalInfo !== undefined
}

export type FileManagerFileMap = Record<
  string,
  FileManagerFile | AppFileManagerFile
>

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
