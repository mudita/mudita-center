import * as React from "react"
import Tabs from "Renderer/components/rest/header/tabs.component"
import styled from "styled-components"
import FunctionComponent from "Renderer/types/function-component.interface"
import MenuContainer from "Renderer/components/rest/menu/menu.container"
import Header from "Renderer/components/rest/header/header.component"
import {
  backgroundColor,
  boxShadowColor,
  width,
} from "Renderer/styles/theming/theme-getters"

const Layout = styled.div`
  display: flex;
  flex: 1;
  height: 100vh;
  max-width: ${width("viewWidth")};
  margin: 0 auto;
`

const MenuWrapper = styled.div`
  box-shadow: 0 0.2rem 3rem 0 ${boxShadowColor("app")};
  width: ${width("menuWidth")};
  overflow: auto;
  background-color: ${backgroundColor("light")};
  z-index: 1;
`

const ViewWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: auto;
`

const HeaderTabs = styled(Tabs)`
  margin: 0 auto;
`

const LayoutDesktopWrapper: FunctionComponent = ({ children }) => {
  return (
    <Layout>
      <MenuWrapper>
        <MenuContainer />
      </MenuWrapper>
      <ViewWrapper>
        <Header middleComponent={<HeaderTabs />} />
        {children}
      </ViewWrapper>
    </Layout>
  )
}

export default LayoutDesktopWrapper
