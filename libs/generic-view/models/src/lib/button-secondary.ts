/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"
import { buttonPrimary } from "./button-primary"

const dataValidator = buttonPrimary.dataValidator

const configValidator = buttonPrimary.configValidator

export type ButtonSecondaryConfig = z.infer<typeof configValidator>

export const buttonSecondary = {
  key: "button-secondary",
  dataValidator,
  configValidator,
} as const
