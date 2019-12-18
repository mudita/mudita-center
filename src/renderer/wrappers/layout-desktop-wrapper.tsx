import * as React from "react"
import styled from "styled-components"

import FunctionComponent from "Renderer/types/function-component.interface"

import Menu from "Renderer/components/rest/menu/menu.component"

import { borderColor, width } from "Renderer/styles/theming/theme-getters"

const Layout = styled.div`
  display: flex;
  flex: 1;
  height: 100vh;
  max-width: ${width("viewWidth")};
  margin: 0 auto;
  border-left: 0.1rem solid ${borderColor("dark")};
  border-right: 0.1rem solid ${borderColor("dark")};
`

const MenuWrapper = styled.div`
  border-right: 0.1rem solid ${borderColor("dark")};
  width: ${width("menuWidth")};
`

const ViewWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

const Header = styled.div`
  border-bottom: 0.1rem solid ${borderColor("dark")};
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
