/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"
import { buttonActionsValidator } from "./common-validators"

const dataValidator = z.undefined()

const configValidator = z.object({
  actions: buttonActionsValidator,
})

export type ButtonPlainConfig = z.infer<typeof configValidator>

export const buttonPlain = {
  key: "button-plain",
  dataValidator,
  configValidator,
} as const
