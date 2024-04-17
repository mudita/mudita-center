/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"
import { modalActionValidator } from "./common-validators"

const dataValidator = z.undefined()

const configValidator = z
  .object({
    closeButtonAction: modalActionValidator.optional(),
    width: z.string().or(z.number()).optional(),
  })
  .optional()

export type TextModalConfig = z.infer<typeof configValidator>

export const textModal = {
  key: "text-modal",
  dataValidator,
  configValidator,
} as const
