/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { MenuElementItem } from "Core/__deprecated__/renderer/constants/menu-elements"
import {
  LastSubitemBranchMarker,
  LastSubitemBranchMarkerWrapper,
  SubitemBranchMarkerHorizontalLine,
  SubitemBranchMarkerVerticalLine,
  SubitemBranchMarkerWrapper,
  SubitemButton,
  SubitemEmptyBox,
  SubitemWrapper,
} from "Core/__deprecated__/renderer/components/rest/menu/expandable-menu/expandable-menu-subitems.styles"

const EmptySubitem = () => {
  return (
    <SubitemWrapper>
      <SubitemBranchMarkerWrapper>
        <SubitemBranchMarkerVerticalLine />
        <SubitemBranchMarkerHorizontalLine transparent />
      </SubitemBranchMarkerWrapper>
      <SubitemEmptyBox />
    </SubitemWrapper>
  )
}

const LastSubitem: FunctionComponent<MenuElementItem> = (props) => {
  return (
    <SubitemWrapper>
      <LastSubitemBranchMarkerWrapper>
        <LastSubitemBranchMarker />
      </LastSubitemBranchMarkerWrapper>
      <SubitemButton {...props} />
    </SubitemWrapper>
  )
}

const Subitem: FunctionComponent<MenuElementItem> = (props) => {
  return (
    <SubitemWrapper>
      <SubitemBranchMarkerWrapper>
        <SubitemBranchMarkerVerticalLine />
        <SubitemBranchMarkerHorizontalLine />
      </SubitemBranchMarkerWrapper>
      <SubitemButton {...props} />
    </SubitemWrapper>
  )
}

interface ExpandableMenuSubitemsProps {
  items: MenuElementItem[]
}

const ExpandableMenuSubitems: FunctionComponent<
  ExpandableMenuSubitemsProps
> = ({ items }) => {
  if (items.length === 0) {
    return null
  }

  if (items.length === 1) {
    return (
      <>
        <EmptySubitem />
        <LastSubitem {...items[0]} />
      </>
    )
  }

  const nonLastItems = items.slice(0, items.length - 1)
  const lastItem = items[items.length - 1]

  return (
    <>
      <EmptySubitem />
      {nonLastItems.map((item, index) => (
        <Subitem key={index} {...item} />
      ))}
      <LastSubitem {...lastItem} />
    </>
  )
}

export default ExpandableMenuSubitems
