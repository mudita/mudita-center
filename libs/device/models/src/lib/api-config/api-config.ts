/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

const MCLangValidator = z.enum(["en-US"])

export type MCLang = z.infer<typeof MCLangValidator>

export const ApiConfigValidator = z.object({
  apiVersion: z.string(),
  lang: MCLangValidator.optional(),
  variant: z.string().optional(),
  productId: z.string(),
  vendorId: z.string(),
  serialNumber: z.string().optional(),
  features: z.array(z.string()).min(1),
})

export type ApiConfig = z.infer<typeof ApiConfigValidator>
