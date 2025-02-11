/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"
import { RegisterOptions } from "react-hook-form"

const dataValidator = z.object({
  values: z.array(
    z.object({
      type: z.string(),
      value: z.string(),
    })
  ),
})

export type FormDynamicInputData = z.infer<typeof dataValidator>

const inputValidation: z.ZodType<
  Pick<
    RegisterOptions,
    "required" | "pattern" | "maxLength" | "minLength" | "deps" | "validate"
  >
> = z.object({
  required: z.string().or(z.boolean()).optional(),
  pattern: z.any().optional(),
  maxLength: z
    .number()
    .or(
      z.object({
        value: z.number(),
        message: z.string(),
      })
    )
    .optional(),
  minLength: z
    .number()
    .or(
      z.object({
        value: z.number(),
        message: z.string(),
      })
    )
    .optional(),
  deps: z.string().or(z.array(z.string())).optional(),
})

const configValidator = z.object({
  name: z.string(),
  options: z.array(z.string()).min(1),
  label: z.string(),
  type: z.enum(["text", "email", "tel", "url"]),
  validation: inputValidation.optional(),
})

export type FormDynamicInputConfig = z.infer<typeof configValidator>

export const formDynamicInput = {
  key: "form.dynamicInput",
  dataValidator,
  configValidator,
} as const
