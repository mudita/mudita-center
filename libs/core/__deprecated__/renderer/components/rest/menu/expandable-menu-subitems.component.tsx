/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { MenuElementItem } from "Core/__deprecated__/renderer/constants/menu-elements"
import MenuItemButton from "Core/__deprecated__/renderer/components/rest/menu-item-button.component"

interface Props {
  items: MenuElementItem[]
}

const ExpandableMenuSubitems: FunctionComponent<Props> = ({ items }) => {
  return (
    <>
      {items.map((item, index) => {
        return <MenuItemButton key={index} {...item} />
      })}
    </>
  )
}

export default ExpandableMenuSubitems
