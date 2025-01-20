/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

export const formatMessageFieldsSchema = z.record(
  z.string(),
  z.union([z.string(), z.number()])
)

const dataValidator = z.object({
  fields: formatMessageFieldsSchema,
})

export type FormatMessageData = z.infer<typeof dataValidator>

const configValidator = z.object({
  messageTemplate: z.string(),
  fields: formatMessageFieldsSchema.optional(),
})

export type FormatMessageConfig = z.infer<typeof configValidator>

export const formatMessage = {
  key: "format-message",
  dataValidator,
  configValidator,
} as const

export const isValidFormatMessageConfig = (
  config: unknown
): config is FormatMessageConfig => {
  const result = configValidator.safeParse(config)
  return result.success
}

export const isValidFormatMessageData = (
  data: unknown
): data is FormatMessageData => {
  const result = dataValidator.safeParse(data)
  return result.success
}
