/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { CSSProperties, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { useLocation } from "react-router"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { MenuElementItem } from "Core/__deprecated__/renderer/constants/menu-elements"
import Button from "Core/__deprecated__/renderer/components/core/button/button.component"
import { DisplayStyle } from "Core/__deprecated__/renderer/components/core/button/button.config"
import { IconSize } from "Core/__deprecated__/renderer/components/core/icon/icon.component"
import ExpandableMenuSubitems from "Core/__deprecated__/renderer/components/rest/menu/expandable-menu-subitems.component"

interface Props extends MenuElementItem {
  items: MenuElementItem[]
}

const ExpandableMenuItem: FunctionComponent<Props> = ({
  button,
  icon,
  testId,
  items,
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const location = useLocation()
  const history = useHistory()

  useEffect(() => {
    if (!items.some((item) => item.button.url === location.pathname)) {
      setIsExpanded(false)
    }
  }, [location, items])

  const expandAndRedirect = () => {
    setIsExpanded(true)
    history.push(items[0].button.url)
  }

  const buttonMenuConfig = {
    nav: true,
    displayStyle: DisplayStyle.MenuLink,
    Icon: icon,
    iconSize: IconSize.Large,
    ...(typeof button.label === "string"
      ? { label: button.label }
      : { labelMessage: button.label }),
  }
  const buttonStyle: CSSProperties = isExpanded ? { pointerEvents: "none" } : {}

  return (
    <>
      <Button
        {...buttonMenuConfig}
        data-testid={testId}
        onClick={expandAndRedirect}
        style={buttonStyle}
      />
      {isExpanded && <ExpandableMenuSubitems items={items} />}
    </>
  )
}

export default ExpandableMenuItem
