/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"
import {
  HarmonyQuotationSettingsGroup,
  HarmonyQuotationSettingsInterval,
  harmonyQuotationSettingsIntervals,
} from "./quotation"

export const HarmonyPutGroupQuotationRequestValidator = z.object({
  group: z
    .string()
    .refine(
      (val) =>
        Object.values(HarmonyQuotationSettingsGroup).includes(
          val as HarmonyQuotationSettingsGroup
        ),
      {
        message: "Invalid group",
      }
    ),
})

export type HarmonyPutGroupQuotationRequest = z.infer<
  typeof HarmonyPutGroupQuotationRequestValidator
>

export const HarmonyPutGroupQuotationResponseValidator = z.undefined()

export const HarmonyPutIntervalQuotationRequestValidator = z.object({
  interval: z.string().refine(
    (val) => {
      if (val === "AtMidnight") return true

      const trimmed = val.trim()

      const num = Number(trimmed)

      if (!Number.isFinite(num)) return false

      return harmonyQuotationSettingsIntervals.includes(
        num as HarmonyQuotationSettingsInterval
      )
    },
    { message: "Invalid interval" }
  ),
})

export type HarmonyPutIntervalQuotationRequest = z.infer<
  typeof HarmonyPutIntervalQuotationRequestValidator
>

export const HarmonyPutIntervalQuotationResponseValidator = z.undefined()
