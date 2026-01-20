/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"
import { emptyBodySchema } from "../common"

const powerOffSchema = z.object({
  action: z.literal("power_off"),
})

const rebootSchema = z.object({
  action: z.literal("reboot"),
})

const lockSchema = z.object({
  action: z.literal("lock"),
})

const serialPortSetupSchema = z.object({
  action: z.literal("serial-port-setup"),
  chunkSizeInBytes: z.int().positive().optional().default(14336),
  outboxEventsCounter: z.int().positive().optional().default(100),
})

export const SystemPostRequestValidator = z.union([
  powerOffSchema,
  rebootSchema,
  lockSchema,
  serialPortSetupSchema,
])

export type SystemPostRequest = z.infer<typeof SystemPostRequestValidator>

export const SystemPostResponseValidator = emptyBodySchema
