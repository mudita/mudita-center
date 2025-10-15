/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

export const HarmonyPostQuotationRequestValidator = z.object({
  quote: z.string().min(1),
  author: z.string().min(1).optional(),
})

export const HarmonyPostQuotationResponseValidator = z.object({
  quoteID: z.number(),
})

export type HarmonyPostQuotationRequest = z.infer<
  typeof HarmonyPostQuotationRequestValidator
>

export type HarmonyPostQuotationResponse = z.infer<
  typeof HarmonyPostQuotationResponseValidator
>
