/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"
import { modalSizeValidator } from "./common-validators"

const dataValidator = z.undefined()

const configValidator = z.object({
  size: modalSizeValidator,
})

export type ModalSizeControllerConfig = z.infer<typeof configValidator>

export const modalSizeController = {
  key: "modal.sizeController",
  dataValidator,
  configValidator,
} as const
