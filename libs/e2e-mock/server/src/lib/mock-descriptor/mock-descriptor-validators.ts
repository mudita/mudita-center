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

export type AddKompakt = z.infer<typeof addKompaktValidator>

export const addKompaktResponseValidator = z.object({
  path: z.string().min(1),
  endpoint: z.enum(APIEndpoints),
  method: z.enum(APIMethods),
  status: z.nativeEnum(ResponseStatus),
  body: z.object({}).passthrough(),
})

export type AddKompaktResponse = z.infer<typeof addKompaktResponseValidator>
