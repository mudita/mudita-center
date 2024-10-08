/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"
import { IconType } from "generic-view/utils"
import { buttonActionsValidator } from "./common-validators"

const dataValidator = z.undefined()

const configValidator = z.object({
  text: z.string().optional(),
  icon: z.nativeEnum(IconType).optional(),
  actions: buttonActionsValidator,
  disabled: z.boolean().optional(),
})

export type ButtonPrimaryConfig = z.infer<typeof configValidator>

export const buttonPrimary = {
  key: "button-primary",
  dataValidator,
  configValidator,
} as const
