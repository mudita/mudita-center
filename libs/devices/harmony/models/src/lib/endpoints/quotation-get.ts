/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

export enum HarmonyQuotationSettingsType {
  Group = "group",
  Interval = "interval",
}

export const HarmonyGetGroupQuotationRequestValidator = z.object({
  settings: z
    .string()
    .refine((val) => val === HarmonyQuotationSettingsType.Group, {
      message: "Invalid settings type",
    }),
})

export type HarmonyGetGroupQuotationRequest = z.infer<
  typeof HarmonyGetGroupQuotationRequestValidator
>

export enum HarmonyQuotationSettingsGroup {
  Predefined = "Predefined",
  Custom = "Custom",
}

export const harmonyQuotationSettingsIntervals = [
  ...(process.env.NODE_ENV === "development" ? [1] : []), // For testing purposes, add 1 minute interval in development
  ...Array.from({ length: 3 }, (_, i) => (i + 1) * 15), // 15, 30, 45
  ...Array.from({ length: 24 }, (_, i) => (i + 1) * 60), // 60, 120, ..., 1440)
  "AtMidnight",
]
export type HarmonyQuotationSettingsInterval =
  (typeof harmonyQuotationSettingsIntervals)[number]

export const HarmonyGetGroupQuotationResponseValidator = z.object({
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

export type HarmonyGetGroupQuotationResponse = z.infer<
  typeof HarmonyGetGroupQuotationResponseValidator
>

export const HarmonyGetIntervalQuotationRequestValidator = z.object({
  settings: z
    .string()
    .refine((val) => val === HarmonyQuotationSettingsType.Interval, {
      message: "Invalid settings type",
    }),
})

export type HarmonyGetIntervalQuotationRequest = z.infer<
  typeof HarmonyGetIntervalQuotationRequestValidator
>

export const HarmonyGetIntervalQuotationResponseValidator = z.object({
  interval: z
    .string()
    .transform((val) => {
      const num = Number(val)
      return isNaN(num) ? val : num
    })
    .refine(
      (val) =>
        harmonyQuotationSettingsIntervals.includes(
          val as HarmonyQuotationSettingsInterval
        ),
      {
        message: "Invalid interval",
      }
    ),
})

export type HarmonyGetIntervalQuotationResponse = z.infer<
  typeof HarmonyGetIntervalQuotationResponseValidator
>
