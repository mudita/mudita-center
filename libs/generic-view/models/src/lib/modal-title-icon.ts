/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"
import { iconTypeValidator } from "./icon"

const dataValidator = z.undefined()

const configValidator = iconTypeValidator

export type ModalTitleIconConfig = z.infer<typeof configValidator>

export const modalTitleIcon = {
  key: "modal.titleIcon",
  dataValidator,
  configValidator,
} as const
