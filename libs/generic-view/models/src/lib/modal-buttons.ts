/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

const dataValidator = z.undefined()

const configValidator = z
  .object({
    vertical: z.boolean().optional(),
  })
  .optional()

export type ModalButtonsConfig = z.infer<typeof configValidator>

export const modalButtons = {
  key: "modal.buttons",
  dataValidator,
  configValidator,
} as const
