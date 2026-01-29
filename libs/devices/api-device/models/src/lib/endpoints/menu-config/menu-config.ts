/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"
import { IconType } from "app-theme/models"
import { MCLangValidator } from "../api-config/api-config"

export const MenuConfigRequestValidator = z.object({
  lang: MCLangValidator,
})

export type MenuConfigRequest = z.infer<typeof MenuConfigRequestValidator>

const MenuItemConfigValidator = z.object({
  feature: z.string(),
  displayName: z.string(),
  icon: z.enum(IconType),
  submenu: z
    .array(
      z.object({
        displayName: z.string(),
        feature: z.string(),
      })
    )
    .optional(),
})

export const MenuConfigResponseValidator = z.object({
  title: z.string().optional(),
  menuItems: z.array(MenuItemConfigValidator).min(1),
})

export type MenuConfig = z.infer<typeof MenuConfigResponseValidator>

export const buildMenuConfigRequest = (req: MenuConfigRequest) => {
  return {
    endpoint: "MENU_CONFIGURATION",
    method: "GET",
    body: req
  } as const
}