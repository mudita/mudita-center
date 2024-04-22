/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"
import { buttonActionValidator } from "./common-validators"

const dataValidator = z.undefined()

const configValidator = z
  .object({
    action: buttonActionValidator.optional(),
  })
  .optional()

export type ModalCloseButtonConfig = z.infer<typeof configValidator>

export const modalCloseButton = {
  key: "modal.closeButton",
  dataValidator,
  configValidator,
} as const
