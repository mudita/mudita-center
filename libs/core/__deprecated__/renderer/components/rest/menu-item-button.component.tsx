/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import * as React from "react"
import Button from "Core/__deprecated__/renderer/components/core/button/button.component"
import { DisplayStyle } from "Core/__deprecated__/renderer/components/core/button/button.config"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { IconSize } from "Core/__deprecated__/renderer/components/core/icon/icon.component"
import { MenuElementItem } from "Core/__deprecated__/renderer/constants/menu-elements"

interface Props extends MenuElementItem {}

const MenuItemButton: FunctionComponent<Props> = ({
  button,
  icon,
  testId,
  ...props
}) => {
  const labelButtonMenuConfig = {
    ...(typeof button.label === "string"
      ? { label: button.label }
      : { labelMessage: button.label }),
  }

  return (
    <Button
      nav={true}
      displayStyle={DisplayStyle.MenuLink}
      Icon={icon}
      iconSize={IconSize.Large}
      to={button.url}
      data-testid={testId}
      {...props}
      {...labelButtonMenuConfig}
    />
  )
}

export default MenuItemButton
