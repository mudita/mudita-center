/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  HarmonyQuotationSettingsGroup,
  HarmonyQuotationSettingsInterval,
  harmonyQuotationSettingsIntervals,
} from "devices/harmony/models"

export interface Quotation {
  id: string
  quote: string
  author?: string
}

export interface NewQuotation {
  quote: string
  author?: string
}

export type QuotationSettingsInterval = HarmonyQuotationSettingsInterval

export enum QuotationSettingsGroup {
  Predefined = HarmonyQuotationSettingsGroup.Predefined,
  Custom = HarmonyQuotationSettingsGroup.Custom,
}

export const quotationSettingsIntervals = harmonyQuotationSettingsIntervals

export interface QuotationSettings {
  interval: QuotationSettingsInterval
  group: QuotationSettingsGroup
}
