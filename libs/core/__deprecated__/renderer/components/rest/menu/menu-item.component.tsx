/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import * as React from "react"
import Button from "Core/__deprecated__/renderer/components/core/button/button.component"
import { DisplayStyle } from "Core/__deprecated__/renderer/components/core/button/button.config"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { IconSize } from "Core/__deprecated__/renderer/components/core/icon/icon.component"
import { View } from "Core/__deprecated__/renderer/constants/views"
import { LinkWrapper } from "Core/__deprecated__/renderer/components/rest/menu/menu-group.styled"
import { NotificationBadge } from "Core/notification/components"
import { MenuElementItem } from "Core/__deprecated__/renderer/constants/menu-elements"

export interface MenuItemProps extends MenuElementItem {
  notifications: {
    [View.Messages]: boolean
  }
}

const MenuItem: FunctionComponent<MenuItemProps> = ({
  button,
  icon,
  testId,
  viewKey,
  notifications,
  disableWhenActive,
}) => {
  const buttonMenuConfig = {
    nav: true,
    displayStyle: DisplayStyle.MenuLink,
    Icon: icon,
    iconSize: IconSize.Large,
    ...(typeof button.label === "string"
      ? { label: button.label }
      : { labelMessage: button.label }),
    disableWhenActive,
  }

  return (
    <LinkWrapper>
      <NotificationBadge
        active={Boolean(
          viewKey && viewKey === View.Messages && notifications[viewKey]
        )}
      >
        <Button {...buttonMenuConfig} to={button.url} data-testid={testId} />
      </NotificationBadge>
    </LinkWrapper>
  )
}

export default MenuItem
