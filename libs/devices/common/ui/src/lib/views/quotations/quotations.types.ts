/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export interface Quotation {
  id: string
  quote: string
  author?: string
}

export interface NewQuotation {
  quote: string
  author?: string
}

export const intervals = [
  ...(process.env.NODE_ENV === "development" ? [1] : []), // For testing purposes, add 1 minute interval in development
  ...Array.from({ length: 3 }, (_, i) => (i + 1) * 15), // 15, 30, 45
  ...Array.from({ length: 24 }, (_, i) => (i + 1) * 60), // 60, 120, ..., 1440)
  "AtMidnight",
]

export type Interval = (typeof intervals)[number]

export enum Source {
  Predefined = "Predefined",
  Custom = "Custom",
}

export interface QuotationSettings {
  interval: Interval
  group: Source
}
