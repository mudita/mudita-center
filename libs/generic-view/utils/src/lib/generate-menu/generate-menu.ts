/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MenuElement } from "Core/__deprecated__/renderer/constants/menu-elements"
import { MenuConfig } from "Root/demo-data/demo-menu"

export const generateMenu = (config: MenuConfig): MenuElement[] => {
  return [
    {
      label: config.title,
      items: config.menuItems
        .filter((item) => item.displayName)
        .map((item) => ({
          icon: item.icon,
          label: item.displayName as string,
          button: {
            label: item.displayName as string,
            url: `/generic/${item.feature}`,
          },
        })),
    },
  ]
}
