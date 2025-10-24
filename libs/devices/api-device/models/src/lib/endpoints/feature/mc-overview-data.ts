/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

const summaryAboutScheme = z.record(
  z.string().or(z.literal("serialNumber")).or(z.literal("deviceVersion")),
  z.object({
    text: z.string().optional(),
  })
)

const sectionItemScheme = z.object({
  text: z.string().optional(),
  subText: z.string().optional(),
  icon: z.string().optional(),
  show: z.boolean().optional(),
  badgeText: z.string().optional(),
})

export const McOverviewDataResponseValidator = z.object({
  summary: z
    .object({
      about: summaryAboutScheme.optional(),
    })
    .optional(),
  sections: z.record(z.string(), sectionItemScheme).optional(),
})

export type McOverviewDataResponse = z.output<
  typeof McOverviewDataResponseValidator
>
