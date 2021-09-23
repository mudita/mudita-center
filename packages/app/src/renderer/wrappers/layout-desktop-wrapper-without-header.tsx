/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import * as React from "react"
import Button from "Renderer/components/core/button/button.component"
import Tabs from "Renderer/components/rest/header/tabs.component"
import Menu from "Renderer/components/rest/menu/menu.container"
import {
  backgroundColor,
  boxShadowColor,
  width,
  zIndex,
} from "Renderer/styles/theming/theme-getters"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import styled from "styled-components"

const Layout = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 30.5rem 1fr;
  grid-template-areas: "Menu View";
  max-width: ${width("viewWidth")};
  margin: 0 auto;
`

const MenuWrapper = styled.div`
  box-shadow: 0 0.2rem 3rem 0 ${boxShadowColor("full")};
  overflow: auto;
  background-color: ${backgroundColor("row")};
  z-index: ${zIndex("menu")};
  grid-area: Menu;
`

export const HeaderTabs = styled(Tabs)`
  margin: 0 auto;
`

export const HeaderButton = styled(Button)`
  align-self: center;
  justify-self: right;
  margin-right: 3rem;
  svg {
    height: 1.4rem;
    width: 1.4rem;
  }
`

const ViewWrapper = styled.div`
  grid-area: View;
  display: flex;
  flex-direction: column;
  overflow: auto;
`

const LayoutDesktopWrapperWithoutHeader: FunctionComponent = ({ children }) => {
  return (
    <Layout>
      <MenuWrapper>
        <Menu />
      </MenuWrapper>
      <ViewWrapper>{children}</ViewWrapper>
    </Layout>
  )
}

export default LayoutDesktopWrapperWithoutHeader
