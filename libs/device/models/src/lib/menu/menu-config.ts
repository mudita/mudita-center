/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IconType } from "generic-view/utils"

export interface MenuItemConfig {
  feature: string
  displayName?: string
  icon?: IconType
}

export interface MenuConfig {
  title?: string
  menuItems: MenuItemConfig[]
}
