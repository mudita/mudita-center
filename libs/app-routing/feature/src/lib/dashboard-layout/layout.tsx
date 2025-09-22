/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { Outlet } from "react-router"
import styled from "styled-components"
import { DashboardMenu } from "./menu"
import { DashboardHeader } from "./header/header"
import { Drawer } from "./drawer"

export const DashboardLayout: FunctionComponent = () => {
  return (
    <Wrapper>
      <Header />
      <Menu />
      <Content>
        <Outlet />
        <Drawer />
      </Content>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: grid;
  grid-template-columns: 31.2rem 1fr;
  grid-template-rows: 5.6rem 1fr;
  grid-template-areas:
    "menu header"
    "menu content";
`

const Header = styled(DashboardHeader)`
  grid-area: header;
`

const Menu = styled(DashboardMenu)`
  grid-area: menu;
  display: flex;
`

const Content = styled.main`
  grid-area: content;
  overflow-y: auto;
`
