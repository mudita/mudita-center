import * as React from "react"
import styled from "styled-components"

import FunctionComponent from "Renderer/types/function-component.interface"

import Menu from "Renderer/components/rest/menu/menu.component"

import { borderColor } from "Renderer/styles/theming/theme-getters"

const Layout = styled.div`
  display: flex;
  flex: 1;
  height: 100vh;
`

const MenuWrapper = styled.div`
  border-right: 1px solid ${borderColor("dark")};
`

const ViewWrapper = styled.div`
  flex: 1;
`

const Header = styled.div`
  border-bottom: 1px solid ${borderColor("dark")};
`

const LayoutDesktopWrapper: FunctionComponent = ({ children }) => {
  return (
    <Layout>
      <MenuWrapper>
        <Menu />
      </MenuWrapper>
      <ViewWrapper>
        <Header>Header</Header>
        {children}
      </ViewWrapper>
    </Layout>
  )
}

export default LayoutDesktopWrapper
