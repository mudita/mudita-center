/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IconType } from "app-theme/models"

export interface MenuItem {
  title: string
  icon: IconType
  items?: MenuItem[]
  index?: number
  path: string
}

export interface MenuGroup {
  index: number
  title?: string
  items?: MenuItem[]
}

export interface AppMenuReducer {
  groups: MenuGroup[]
}
