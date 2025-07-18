/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ResponseStatus } from "Core/device"
import { APIEndpoints, APIMethods } from "device/models"
import { z } from "zod"

export const addKompaktValidator = z.object({
  path: z.string().min(1),
  serialNumber: z.string().min(1),
})

const MatchConfigValidator = z.object({
  expected: z.object({}).passthrough(),
  options: z
    .object({
      id: z.string().optional(),
    })
    .optional(),
})

export type MatchConfig = z.infer<typeof MatchConfigValidator>

export type AddKompakt = z.infer<typeof addKompaktValidator>

export const addKompaktResponseValidator = z.object({
  path: z.string().min(1),
  endpoint: z.enum(APIEndpoints),
  method: z.enum(APIMethods),
  status: z.nativeEnum(ResponseStatus),
  body: z.object({}).passthrough(),
  match: MatchConfigValidator.optional(),
  delay: z.number().int().min(0).optional(),
})

export type AddKompaktResponse = z.infer<typeof addKompaktResponseValidator>

export const addKompaktResponsesValidator = z.array(addKompaktResponseValidator)

export const restoreDefaultResponsesValidator = z.object({
  path: z.string().min(1),
  requests: z
    .array(
      z.object({
        endpoint: z.enum(APIEndpoints),
        method: z.enum(APIMethods),
      })
    )
    .optional(),
})

export type RestoreDefaultResponses = z.infer<
  typeof restoreDefaultResponsesValidator
>
