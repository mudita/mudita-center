/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"
import { IconType } from "generic-view/utils"

export enum FileManagerMarkerColor {
  audioFiles = "#E38577",
  imageFiles = "#0E7490",
  ebookFiles = "#A8DADC",
  applicationFiles = "#AEBEC9",
  otherFiles = "#3B3F42",
  free = "#F4F5F6",
}

const storageCategoryValidator = z.object({
  spaceUsedBytes: z.number().nonnegative(),
  spaceUsedString: z.string(),
  storageCategory: z.string(),
})

export const mcFileManagerData = z.object({
  storageInformation: z
    .array(
      z.object({
        path: z.string().endsWith("/"),
        totalSpaceBytes: z.number().nonnegative(),
        usedSpaceBytes: z.number().nonnegative(),
        freeSpaceBytes: z.number().nonnegative(),
        totalSpaceString: z.string(),
        usedSpaceString: z.string(),
        freeSpaceString: z.string(),
        categoriesSpaceInformation: z.record(
          z.string(),
          storageCategoryValidator
        ),
      })
    )
    .min(1),
})

export type McFileManagerData = z.infer<typeof mcFileManagerData>

const configValidator = z.object({
  storages: z
    .array(
      z.object({
        label: z.string(),
        path: z.string().endsWith("/"),
      })
    )
    .min(1),
  categories: z
    .array(
      z.object({
        icon: z.nativeEnum(IconType),
        markerColor: z.nativeEnum(FileManagerMarkerColor),
        label: z.string(),
        fileListEmptyStateDescription: z.string(),
        directoryPath: z.string().endsWith("/"),
        entityType: z.string(),
        supportedFileTypes: z.array(z.string()),
      })
    )
    .min(1),
})

export type McFileManagerConfig = z.infer<typeof configValidator>

export const mcFileManagerView = {
  key: "mc-file-manager-view",
  dataValidator: mcFileManagerData,
  configValidator,
} as const
