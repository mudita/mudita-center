/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { EntityData } from "devices/api-device/models"
import { FileManagerFile } from "devices/common/ui"
import {
  AppFileManagerFile,
  FileManagerCategoryFileMap,
  isAppFileManagerFileAdditionalInfo,
} from "./device-manage-files.types"

type FileEntity = {
  id: string
  fileName: string
  filePath: string
  fileSize: number
  extension: string
  additionalInfo?: unknown
  mimeType: string
}

const isFileEntity = (value: unknown): value is FileEntity => {
  if (typeof value !== "object" || value === null) return false

  return (
    "id" in value &&
    "fileName" in value &&
    "filePath" in value &&
    typeof (value as Record<string, unknown>).id === "string" &&
    typeof (value as Record<string, unknown>).fileName === "string" &&
    typeof (value as Record<string, unknown>).filePath === "string"
  )
}

export const mapToCategoryFileMap = (
  entitiesData: Record<string, EntityData[]>,
  storagePath: string
): FileManagerCategoryFileMap =>
  Object.entries(entitiesData).reduce<FileManagerCategoryFileMap>(
    (acc, [entityType, entities]) => {
      acc[entityType] = (entities ?? [])
        .filter(isFileEntity)
        .filter((entity) => entity.filePath.startsWith(storagePath))
        .reduce<Record<string, FileManagerFile | AppFileManagerFile>>(
          (fileAcc, entity) => {
            fileAcc[entity.id] = {
              id: entity.id,
              name: entity.fileName,
              size: entity.fileSize,
              type: entity.extension,
              mimeType: entity.mimeType,
              path: entity.filePath,
            }

            if (isAppFileManagerFileAdditionalInfo(entity.additionalInfo)) {
              ;(fileAcc[entity.id] as AppFileManagerFile).additionalInfo =
                entity.additionalInfo
            }

            return fileAcc
          },
          {}
        )
      return acc
    },
    {}
  )
