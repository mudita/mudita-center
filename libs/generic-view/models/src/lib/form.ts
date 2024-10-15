/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"
import { UseFormProps } from "react-hook-form"

const dataValidator = z.undefined()

interface Config {
  formOptions?: Pick<UseFormProps, "mode" | "reValidateMode" | "defaultValues">
  defaultFields?: Record<string, unknown>
}

const configValidator: z.ZodType<Config | undefined> = z
  .object({
    formOptions: z.object({
      mode: z
        .enum(["onBlur", "onChange", "onSubmit", "onTouched", "all"])
        .optional(),
      reValidateMode: z.enum(["onChange", "onBlur", "onSubmit"]).optional(),
      defaultValues: z.record(z.string(), z.any()).optional(),
    }),
    defaultFields: z.record(z.string(), z.any()).optional(),
  })
  .optional()

export type FormConfig = z.infer<typeof configValidator>

export const form = {
  key: "form",
  dataValidator,
  configValidator,
} as const
