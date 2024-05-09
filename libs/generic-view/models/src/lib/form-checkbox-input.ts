/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"
import { RegisterOptions } from "react-hook-form"

const dataValidator = z.undefined()

const inputValidation: z.ZodType<Pick<RegisterOptions, "required">> = z.object({
  required: z.string().or(z.boolean()).optional(),
})

const configValidator = z.object({
  name: z.string(),
  value: z.string(),
  checked: z.boolean().optional(),
  label: z.string().optional(),
  validation: inputValidation.optional(),
  disabled: z.boolean().optional(),
})

export type FormCheckboxInputConfig = z.infer<typeof configValidator>

export const formCheckboxInput = {
  key: "form.checkboxInput",
  dataValidator,
  configValidator,
} as const
