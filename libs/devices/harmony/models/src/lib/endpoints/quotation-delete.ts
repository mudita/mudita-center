/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

export const HarmonyDeleteQuotationRequestValidator = z.object({
  quoteID: z.number(),
})

export const HarmonyDeleteQuotationResponseValidator = z.undefined()

export type HarmonyDeleteQuotationRequest = z.infer<
  typeof HarmonyDeleteQuotationRequestValidator
>
