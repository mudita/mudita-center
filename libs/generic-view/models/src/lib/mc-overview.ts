/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"
import { IconType } from "generic-view/utils"
import { backupCreate } from "./backup-create"
import { backupRestore } from "./backup-restore"

const dataValidator = z
  .object({
    text: z.string().optional(),
  })
  .optional()

export type McOverviewData = z.infer<typeof dataValidator>

const detailListModalConfigValidator = z.object({
  dataKey: z.string().min(1),
  type: z.literal("detail-list-modal"),
  title: z.string().min(1),
  buttonText: z.string().min(1),
})

const detailListTextConfigValidator = z.object({
  dataKey: z.string().min(1),
  type: z.literal("detail-list-text"),
  title: z.string().min(1),
})

const detailsListFieldConfigValidator = z.union([
  detailListModalConfigValidator,
  detailListTextConfigValidator,
])

const iconTextRowConfigValidator = z.object({
  dataKey: z.string().min(1),
  type: z.literal("icon-text"),
})

const backupTileConfigValidator = z.object({
  type: z.literal("mc-overview-backup"),
  title: z.string().min(1),
  dataKey: z.string().min(1),
  backupFeatures: backupCreate.configValidator.shape.features.optional(),
  restoreFeatures: backupRestore.configValidator.shape.features.optional(),
})

const dataSyncKeyConfigValidator = z.enum(["currentDateISO", "timezone"])

const dataSyncTileConfigValidator = z.object({
  type: z.literal("mc-overview-sync"),
  title: z.string().min(1),
  buttonText: z.string().min(1),
  fieldsToSync: z.array(dataSyncKeyConfigValidator).min(1),
})

const updateTileConfigValidator = z.object({
  dataKey: z.string().min(1),
  type: z.literal("mc-overview-update"),
  title: z.string().min(1),
  currentVersionKey: z.string().min(1),
  showBadge: z.boolean(),
  versionLabel: z.string().min(1),
})

const tileListConfigValidator = z.object({
  title: z.string().optional(),
  type: z.literal("tile-list"),
  dataKey: z.string().min(1),
  fields: z.array(iconTextRowConfigValidator),
})

export type McOverviewTileListConfig = z.infer<typeof tileListConfigValidator>

const sectionsValidator = z.union([
  tileListConfigValidator,
  updateTileConfigValidator,
  dataSyncTileConfigValidator,
  backupTileConfigValidator,
])

const configValidator = z.object({
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
    aboutFields: z.array(detailsListFieldConfigValidator).optional(),
  }),
  sections: z.array(sectionsValidator).optional(),
})

export type McOverviewConfig = z.infer<typeof configValidator>

export const mcOverview = {
  key: "mc-overview",
  dataValidator,
  configValidator,
} as const
