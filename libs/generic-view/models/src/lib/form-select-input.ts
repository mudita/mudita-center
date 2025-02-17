/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"
import { RegisterOptions } from "react-hook-form"

const dataValidator = z
  .object({
    option: z.string(),
  })
  .optional()

export type FormSelectInputData = z.infer<typeof dataValidator>

const inputValidation: z.ZodType<Pick<RegisterOptions, "required">> = z.object({
  required: z.string().or(z.boolean()).optional(),
})

const configValidator = z.object({
  name: z.string(),
  options: z.array(z.string()).min(1),
  label: z.string().optional(),
  disabled: z.boolean().optional(),
  validation: inputValidation.optional(),
})

export type FormSelectInputConfig = z.infer<typeof configValidator>

export const formSelectInput = {
  key: "form.selectInput",
  dataValidator,
  configValidator,
} as const
