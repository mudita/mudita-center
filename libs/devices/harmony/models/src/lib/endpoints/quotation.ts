/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum HarmonyQuotationSettingsType {
  Group = "group",
  Interval = "interval",
}

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
