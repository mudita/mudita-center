/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"
import { IconType } from "generic-view/utils"
import { buttonActionsValidator } from "./common-validators"
import { iconSize } from "./icon"

const dataValidator = z.undefined()

const configValidator = z.object({
  icon: z.nativeEnum(IconType),
  iconSize: iconSize.optional(),
  actions: buttonActionsValidator,
  modifiers: z.array(z.enum(["link", "hover-background"])).optional(),
})

export type ButtonIconConfig = z.infer<typeof configValidator>

export const buttonIcon = {
  key: "button-icon",
  dataValidator,
  configValidator,
} as const
