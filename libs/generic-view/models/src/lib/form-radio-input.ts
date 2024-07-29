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
  label: z.string(),
  value: z.string(),
  validation: inputValidation.optional(),
})

export type FormRadioInputConfig = z.infer<typeof configValidator>

export const formRadioInput = {
  key: "form.radioInput",
  dataValidator,
  configValidator,
} as const
