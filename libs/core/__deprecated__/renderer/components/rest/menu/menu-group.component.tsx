/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import * as React from "react"
import { DeviceType } from "device-protocol/models"
import {
  MenuElement,
  MenuElementItem,
} from "Core/__deprecated__/renderer/constants/menu-elements"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { View } from "Core/__deprecated__/renderer/constants/views"
import MenuHeader from "Core/__deprecated__/renderer/components/rest/menu/menu-header.component"
import MenuItem from "Core/__deprecated__/renderer/components/rest/menu/menu-item.component"

interface MenuGroupProps extends MenuElement {
  deviceType: DeviceType | null
  notifications: {
    [View.Messages]: boolean
  }
}

const filterMenuItems = (
  items: MenuElementItem[],
  deviceType: DeviceType | null
) => {
  return items.filter(({ hidden, visibleOn }) => {
    if (hidden) return false

    if (visibleOn && deviceType && !visibleOn.includes(deviceType)) {
      return false
    }

    return true
  })
}

const MenuGroup: FunctionComponent<MenuGroupProps> = ({
  label,
  items,
  icons,
  deviceType,
  notifications,
}) => {
  const filteredItems = filterMenuItems(items || [], deviceType)

  return (
    <>
      {label && (
        <MenuHeader label={label} icons={icons} deviceType={deviceType} />
      )}
      {filteredItems.map((item, index) => {
        const { disableWhenActive = true, ...restProps } = item
        const { viewKey } = item
        const badgeActive = viewKey === View.Messages && notifications[viewKey]
        return (
          <MenuItem
            key={index}
            badgeActive={badgeActive}
            disableWhenActive={disableWhenActive}
            {...restProps}
          />
        )
      })}
    </>
  )
}

export default MenuGroup
