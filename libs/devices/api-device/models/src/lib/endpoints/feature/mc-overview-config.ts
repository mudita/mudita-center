/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"
import { IconType } from "app-theme/models"

const detailListModalScheme = z.object({
  dataKey: z.string().min(1),
  type: z.literal("detail-list-modal"),
  title: z.string().min(1),
  buttonText: z.string().min(1),
})

const detailListTextScheme = z.object({
  dataKey: z.string().min(1),
  type: z.literal("detail-list-text"),
  title: z.string().min(1),
})

const updateTileScheme = z.object({
  dataKey: z.string().min(1),
  type: z.literal("mc-overview-update"),
  title: z.string().min(1),
  currentVersionKey: z.string().min(1),
  showBadge: z.boolean(),
  versionLabel: z.string().min(1),
})

const detailListFieldScheme = z.union([
  detailListModalScheme,
  detailListTextScheme,
])

const backupFeatureValidator = z.object({
  label: z.string(),
  key: z.string(),
})

const restoreFeatureValidator = z.object({
  label: z.string().min(1),
  feature: z.string().min(1),
  keys: z.array(z.string()).min(1),
})

const backupTileScheme = z.object({
  type: z.literal("mc-overview-backup"),
  title: z.string().min(1),
  dataKey: z.string().min(1),
  backupFeatures: z.array(backupFeatureValidator).optional(),
  restoreFeatures: z.array(restoreFeatureValidator).optional(),
})
export type BackupSectionConfig = z.infer<typeof backupTileScheme>

const iconTextRowScheme = z.object({
  type: z.literal("icon-text"),
  dataKey: z.string().min(1),
})

const tileListScheme = z.object({
  type: z.literal("tile-list"),
  title: z.string().min(1),
  dataKey: z.string().min(1),
  fields: z.array(iconTextRowScheme),
})

const sectionsScheme = z.union([
  tileListScheme,
  updateTileScheme,
  backupTileScheme,
])

const summaryScheme = z.object({
  show: z.boolean().optional(),
  showImg: z.boolean().optional(),
  imgVariant: z.string().optional(),
  showSerialNumber: z.boolean().optional(),
  serialNumberLabel: z.string().optional(),
  showDeviceVersion: z.boolean().optional(),
  deviceVersionLabel: z.string().optional(),
  showAbout: z.boolean().optional(),
  aboutTitle: z.string().optional(),
  aboutSubtitle: z.string().optional(),
  aboutIcon: z.enum(IconType).optional(),
  aboutFields: z.array(detailListFieldScheme).optional(),
})

export const McOverviewConfigResponseValidator = z.object({
  title: z.string().min(1),
  summary: summaryScheme,
  sections: z.array(sectionsScheme).optional(),
})

export type McOverviewConfigResponse = z.output<
  typeof McOverviewConfigResponseValidator
>
