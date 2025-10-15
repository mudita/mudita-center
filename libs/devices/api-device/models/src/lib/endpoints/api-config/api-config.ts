/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

export const MCLangValidator = z.enum(["en-US"])

export const ApiConfigRequestValidator = z.undefined().optional()

export const ApiConfigResponseValidator = z.object({
  apiVersion: z.string(),
  osVersion: z.string(),
  lang: MCLangValidator.optional(),
  variant: z.string().optional(),
  productId: z.string(),
  vendorId: z.string(),
  serialNumber: z.string().optional(),
  features: z.array(z.string()).min(1),
  entityTypes: z.array(z.string()).min(1).optional(),
  otaApiConfig: z
    .object({
      otaApiKey: z.string(),
      osVersionTimestamp: z.number(),
    })
    .optional(),
})

export type ApiConfig = z.infer<typeof ApiConfigResponseValidator>
