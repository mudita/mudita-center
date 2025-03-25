/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"
import { LegacyIconType } from "app-theme/models"

const MenuItemConfigValidator = z.object({
  feature: z.string(),
  displayName: z.string(),
  icon: z.nativeEnum(LegacyIconType),
  submenu: z
    .array(
      z.object({
        displayName: z.string(),
        feature: z.string(),
      })
    )
    .optional(),
})

export type MenuItemConfig = z.infer<typeof MenuItemConfigValidator>

export const MenuConfigValidator = z.object({
  title: z.string().optional(),
  menuItems: z.array(MenuItemConfigValidator).min(1),
})

export type MenuConfig = z.infer<typeof MenuConfigValidator>
