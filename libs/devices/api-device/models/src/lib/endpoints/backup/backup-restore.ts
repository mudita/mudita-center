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

const restoreIdScheme = z.int().positive()
const requestFeaturesScheme = z
  .array(
    z.object({
      feature: z.string().min(1),
      key: z.string().min(1),
    })
  )
  .min(1)
const responseFeaturesScheme = z.record(z.string().min(1), z.string().min(1))
const progressScheme = z.int().min(0).max(100)

// POST PRE_RESTORE
export const PreRestoreRequestValidator = z.object({
  restoreId: restoreIdScheme,
  features: requestFeaturesScheme,
})

export const PreRestoreResponseValidator = z.object({
  restoreId: restoreIdScheme,
  features: responseFeaturesScheme,
})

export type PreRestoreRequest = z.input<typeof PreRestoreRequestValidator>

// GET/POST RESTORE
export const RestoreRequestValidator = z.object({
  restoreId: restoreIdScheme,
})

const RestoreResponseValidator202 = response202Schema.extend({
  progress: progressScheme,
  message: z.string().min(1).optional(),
})

const RestoreResponseValidator200 = response200Schema.extend({
  progress: progressScheme.optional(),
  rebootRequired: z.boolean().optional(),
  message: z.string().min(1).optional(),
})

export const RestoreResponseValidator = z.union([
  RestoreResponseValidator202,
  RestoreResponseValidator200,
])

export type RestoreRequest = z.input<typeof RestoreRequestValidator>
export type RestoreResponse202 = z.infer<typeof RestoreResponseValidator202>
export type RestoreResponse200 = z.infer<typeof RestoreResponseValidator200>

// DELETE RESTORE
export const DeleteRestoreRequestValidator = z.object({
  restoreId: restoreIdScheme,
})

export const DeleteRestoreResponseValidator = emptyBodySchema

export type DeleteRestoreRequest = z.input<typeof DeleteRestoreRequestValidator>