/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

const fieldsSchema = z.record(z.string(), z.union([z.string(), z.number()]))

const dataValidator = z.object({
  fields: fieldsSchema,
})

export type FormatMessageData = z.infer<typeof dataValidator>

const configValidator = z.object({
  messageTemplate: z.string(),
  fields: fieldsSchema.optional(),
})

export type FormatMessageConfig = z.infer<typeof configValidator>

export const formatMessage = {
  key: "format-message",
  dataValidator,
  configValidator,
} as const
