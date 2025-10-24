/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"
import { IconType } from "app-theme/models"

export enum FileManagerMarkerColor {
  audioFiles = "#E38577",
  imageFiles = "#0E7490",
  ebookFiles = "#A8DADC",
  applicationFiles = "#AEBEC9",
  otherFiles = "#3B3F42",
  free = "#F4F5F6",
}

export const McFileManagerConfigValidator = z.object({
  features: z.array(z.string()).optional(),
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
        icon: z.enum(IconType),
        markerColor: z.enum(FileManagerMarkerColor),
        label: z.string(),
        fileListEmptyStateDescription: z.string(),
        directoryPath: z.string().endsWith("/"),
        entityType: z.string(),
        supportedFileTypes: z.array(z.string()),
      })
    )
    .min(1),
})

export type McFileManagerConfig = z.output<typeof McFileManagerConfigValidator>

export const McFileManagerConfigResponseValidator = z.object({
  main: z.object({
    screenTitle: z.string().min(1),
    component: z.literal("mc-file-manager-view"),
    config: McFileManagerConfigValidator,
  }),
})

export type McFileManagerConfigResponse = z.output<
  typeof McFileManagerConfigResponseValidator
>
