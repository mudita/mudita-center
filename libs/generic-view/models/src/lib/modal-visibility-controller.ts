/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

const dataValidator = z
  .object({
    visible: z.boolean().optional().default(true),
  })
  .optional()

export type ModalVisibilityControllerData = z.infer<typeof dataValidator>

const configValidator = dataValidator

export type ModalVisibilityControllerConfig = z.infer<typeof configValidator>

export const modalVisibilityController = {
  key: "modal.visibilityController",
  dataValidator,
  configValidator,
} as const
