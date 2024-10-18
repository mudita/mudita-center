/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

const dataValidator = z.undefined()

const configValidator = z.object({
  formFieldName: z.string(),
  renderIfFalse: z.boolean().optional(),
})

export type FormConditionalRendererConfig = z.infer<typeof configValidator>

export const formConditionalRenderer = {
  key: "form.conditionalRenderer",
  dataValidator,
  configValidator,
} as const
