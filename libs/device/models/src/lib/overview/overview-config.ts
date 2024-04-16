/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IconType } from "generic-view/utils"
import { z } from "zod"

export const DetailListTextConfigValidator = z.object({
  dataKey: z.string().min(1),
  type: z.literal("detail-list-text"),
  title: z.string().min(1),
})

export type DetailListTextConfig = z.infer<typeof DetailListTextConfigValidator>

export const DetailListModalConfigValidator = z.object({
  dataKey: z.string().min(1),
  type: z.literal("detail-list-modal"),
  title: z.string().min(1),
  buttonText: z.string().min(1),
})

export type DetailListModalConfig = z.infer<
  typeof DetailListModalConfigValidator
>

const DetailListFieldConfigValidator = z.union([
  DetailListModalConfigValidator,
  DetailListTextConfigValidator,
])

export type DetailListFieldConfig = z.infer<
  typeof DetailListFieldConfigValidator
>

export const UpdateTileConfigValidator = z.object({
  dataKey: z.string().min(1),
  type: z.literal("mc-overview-update"),
  title: z.string().min(1),
  currentVersionKey: z.string().min(1),
  showBadge: z.boolean(),
  versionLabel: z.string().min(1),
})

export type UpdateTileConfig = z.infer<typeof UpdateTileConfigValidator>

const DataSyncKeyValidator = z.enum(["currentDateISO", "timezone"])

export type DataSyncKey = z.infer<typeof DataSyncKeyValidator>

export const DataSyncTileConfigValidator = z.object({
  type: z.literal("mc-overview-sync"),
  title: z.string().min(1),
  buttonText: z.string().min(1),
  fieldsToSync: z.array(DataSyncKeyValidator).min(1),
})

export type DataSyncTileConfig = z.infer<typeof DataSyncTileConfigValidator>

const restoreFeatureValidator = z.object({
  label: z.string().min(1),
  feature: z.string().min(1),
  keys: z.array(z.string()).min(1),
})

export type RestoreFeature = z.infer<typeof restoreFeatureValidator>

// TODO: Implement proper validation
export const BackupTileConfigValidator = z.object({
  type: z.literal("mc-overview-backup"),
  title: z.string().min(1),
  dataKey: z.string().min(1),
  backupFeatures: z
    .array(
      z.object({
        label: z.string().min(1),
        key: z.string().min(1),
      })
    )
    .optional(),
  restoreFeatures: z.array(restoreFeatureValidator).optional(),
})

export type BackupTileConfig = z.infer<typeof BackupTileConfigValidator>

export const IconTextRowConfigValidator = z.object({
  dataKey: z.string().min(1),
  type: z.literal("icon-text"),
})

export type IconTextRowConfig = z.infer<typeof IconTextRowConfigValidator>

const TileListFieldConfigValidator = IconTextRowConfigValidator

type TileListFieldConfig = z.infer<typeof TileListFieldConfigValidator>

export const TileListConfigValidator = z.object({
  title: z.string().optional(),
  type: z.literal("tile-list"),
  dataKey: z.string().min(1),
  fields: z.array(TileListFieldConfigValidator),
})

export type TileListConfig = z.infer<typeof TileListConfigValidator>

const OverviewSectionsConfigValidator = z.union([
  TileListConfigValidator,
  UpdateTileConfigValidator,
  DataSyncTileConfigValidator,
  BackupTileConfigValidator,
])

export type OverviewSectionsConfig = z.infer<
  typeof OverviewSectionsConfigValidator
>

export const OverviewConfigValidator = z.object({
  title: z.string().min(1),
  summary: z.object({
    show: z.boolean().optional(),
    showImg: z.boolean().optional(),
    imgVariant: z.string().optional(),
    showSerialNumber: z.boolean().optional(),
    serialNumberLabel: z.string().optional(),
    showAbout: z.boolean().optional(),
    aboutTitle: z.string().optional(),
    aboutSubtitle: z.string().optional(),
    aboutIcon: z.nativeEnum(IconType).optional(),
    aboutFields: z.array(DetailListFieldConfigValidator).optional(),
  }),
  sections: z.array(OverviewSectionsConfigValidator).optional(),
})

export type OverviewConfig = z.infer<typeof OverviewConfigValidator>

export const ComponentsWithDataKey = [
  DetailListTextConfigValidator.shape.type.value,
  DetailListModalConfigValidator.shape.type.value,
  UpdateTileConfigValidator.shape.type.value,
  IconTextRowConfigValidator.shape.type.value,
  TileListConfigValidator.shape.type.value,
]
