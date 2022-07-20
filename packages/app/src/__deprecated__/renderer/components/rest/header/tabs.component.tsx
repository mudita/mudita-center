/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import * as React from "react"
import Tab from "App/__deprecated__/renderer/components/rest/header/tab.component"
import { tabElements } from "App/__deprecated__/renderer/constants/tab-elements"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import styled from "styled-components"

const TabsWrapper = styled.div`
  display: flex;
`

const NavTab = styled(Tab)`
  &:not(:last-child) {
    margin-right: 4rem;
  }
`

export interface TabsProps {
  currentLocation?: string
}

const Tabs: FunctionComponent<TabsProps> = ({ className, currentLocation }) => {
  const currentLocationTabs = tabElements.find(({ parentUrl }) =>
    currentLocation?.includes(parentUrl)
  )?.tabs

  const tabsList = currentLocationTabs
    ?.filter(({ hidden }) => !hidden)
    .map(({ label, icon, url }) => (
      <NavTab label={label} icon={icon} key={label.id} url={url} />
    ))

  return <TabsWrapper className={className}>{tabsList}</TabsWrapper>
}

export default Tabs
