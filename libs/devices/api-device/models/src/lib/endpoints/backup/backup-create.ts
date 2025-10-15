/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"
import {
  emptyBodySchema,
  response200Schema,
  response202Schema,
} from "../common"

const backupIdScheme = z.int().positive()
const requestFeaturesScheme = z.array(z.string().min(1)).min(1)
const responseFeaturesScheme = z.record(z.string().min(1), z.string().min(1))
const progressScheme = z.int().min(0).max(100)

// POST/GET PRE_BACKUP
export const PreBackupPostRequestValidator = z.object({
  backupId: backupIdScheme,
  features: requestFeaturesScheme,
})

export const PreBackupGetRequestValidator = z.object({
  backupId: backupIdScheme,
})

export const PreBackupResponseValidator202 = response202Schema.extend({
  backupId: backupIdScheme,
  progress: progressScheme,
})

export const PreBackupResponseValidator200 = response200Schema.extend({
  backupId: backupIdScheme,
  features: responseFeaturesScheme,
  progress: progressScheme,
})

export type PreBackupRequest = z.input<typeof PreBackupPostRequestValidator>
export type PreBackupResponse202 = z.infer<typeof PreBackupResponseValidator202>
export type PreBackupResponse200 = z.infer<typeof PreBackupResponseValidator200>

// POST POST_BACKUP
export const PostBackupRequestValidator = z.object({
  backupId: backupIdScheme,
})

export const PostBackupResponseValidator = emptyBodySchema

export type PostBackupRequest = z.input<typeof PostBackupRequestValidator>
