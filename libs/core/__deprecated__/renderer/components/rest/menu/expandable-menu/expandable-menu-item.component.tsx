/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { useLocation } from "react-router"
import styled from "styled-components"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { MenuElementItem } from "Core/__deprecated__/renderer/constants/menu-elements"
import Button from "Core/__deprecated__/renderer/components/core/button/button.component"
import { DisplayStyle } from "Core/__deprecated__/renderer/components/core/button/button.config"
import { IconSize } from "Core/__deprecated__/renderer/components/core/icon/icon.component"
import ExpandableMenuSubitems from "Core/__deprecated__/renderer/components/rest/menu/expandable-menu/expandable-menu-subitems.component"
import { textColor } from "Core/core/styles/theming/theme-getters"

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

  const labelButtonMenuConfig = {
    ...(typeof button.label === "string"
      ? { label: button.label }
      : { labelMessage: button.label }),
  }

  return (
    <>
      <ExpandableMenuExpandButton
        nav={true}
        displayStyle={DisplayStyle.MenuLink}
        Icon={icon}
        iconSize={IconSize.Large}
        data-testid={testId}
        onClick={expandAndRedirect}
        isExpanded={isExpanded}
        {...labelButtonMenuConfig}
      />
      {isExpanded && <ExpandableMenuSubitems items={items} />}
    </>
  )
}

const ExpandableMenuExpandButton = styled(Button)<{ isExpanded: boolean }>`
  pointer-events: ${({ isExpanded }) => (isExpanded ? "none" : "auto")};

  svg,
  p {
    color: ${({ isExpanded }) =>
      isExpanded ? textColor("primary") : undefined};
    opacity: ${({ isExpanded }) => (isExpanded ? 1 : undefined)};
  }
`

export default ExpandableMenuItem
