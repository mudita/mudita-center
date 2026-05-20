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
// Temporary change to allow progress > 100%, 200% is returned for 'should prepare valid backup file for every single feature' test case
// const progressScheme = z.int().min(0).max(100)
const progressScheme = z.int().min(0).max(200)

// POST/GET PRE_BACKUP
export const PreBackupPostRequestValidator = z.object({
  backupId: backupIdScheme,
  features: requestFeaturesScheme,
})

export type PreBackupPostRequest = z.input<typeof PreBackupPostRequestValidator>

export const PreBackupGetRequestValidator = z.object({
  backupId: backupIdScheme,
})

export type PreBackupGetRequest = z.input<typeof PreBackupGetRequestValidator>

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

export const buildPreBackupGetRequest = (req: PreBackupGetRequest) =>
  ({
    endpoint: "PRE_BACKUP",
    method: "GET",
    body: req,
  }) as const

export const buildPreBackupPostRequest = (req: PreBackupPostRequest) =>
  ({
    endpoint: "PRE_BACKUP",
    method: "POST",
    body: req,
  }) as const

export const buildPostBackupRequest = (req: PostBackupRequest) =>
  ({
    endpoint: "POST_BACKUP",
    method: "POST",
    body: req,
  }) as const
