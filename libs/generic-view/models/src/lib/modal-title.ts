/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

const dataValidator = z.undefined()

const configValidator = z
  .object({
    text: z.string(),
  })
  .optional()

export type ModalTitleConfig = z.infer<typeof configValidator>

export const modalTitle = {
  key: "modal.title",
  dataValidator,
  configValidator,
} as const
