/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IconType } from "Core/__deprecated__/renderer/components/core/icon/icon-type"

interface MenuItemConfig {
  feature: string
  displayName?: string
  icon?: IconType
}

export interface MenuConfig {
  title?: string
  menuItems: MenuItemConfig[]
}

export const menuConfig: MenuConfig = {
  title: "Your phone",
  menuItems: [
    {
      feature: "mc-overview",
      displayName: "Overview",
      icon: IconType.MenuOverview,
    },
    {
      feature: "api-connection-demo",
      displayName: "connection demo",
      icon: IconType.MenuOverview,
    },
    {
      feature: "mc-demo",
      displayName: "Demo",
      icon: IconType.MenuOverview,
    }
  ],
}
