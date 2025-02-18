/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { memo } from "react"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { LinkWrapper } from "Core/__deprecated__/renderer/components/rest/menu/menu-group.styled"
import { NotificationBadge } from "Core/notification/components"
import { MenuElementItem } from "Core/__deprecated__/renderer/constants/menu-elements"
import MenuItemButton from "Core/__deprecated__/renderer/components/rest/menu-item-button.component"

export interface MenuItemProps extends MenuElementItem {
  badgeActive: boolean
}

const MenuItem: FunctionComponent<MenuItemProps> = (props) => {
  const { badgeActive, ...menuElementItem } = props

  return (
    <LinkWrapper>
      <NotificationBadge active={badgeActive}>
        <MenuItemButton {...menuElementItem} />
      </NotificationBadge>
    </LinkWrapper>
  )
}

export default memo(MenuItem)
