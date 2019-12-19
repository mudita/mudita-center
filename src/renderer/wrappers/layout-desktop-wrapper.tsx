import * as React from "react"
import Tab from "Renderer/components/rest/header/tab.component"
import Tabs from "Renderer/components/rest/header/tabs.component"
import styled from "styled-components"

import FunctionComponent from "Renderer/types/function-component.interface"

import Menu from "Renderer/components/rest/menu/menu.component"

import Header from "Renderer/components/rest/header/header.component"
import { borderColor, width } from "Renderer/styles/theming/theme-getters"
import check from "Renderer/svg/check-icon.svg"

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
  overflow: auto;
`

const HeaderTabs = styled(Tabs)`
  margin: 0 auto;
`

const LayoutDesktopWrapper: FunctionComponent = ({ children }) => {
  return (
    <Layout>
      <MenuWrapper>
        <Menu />
      </MenuWrapper>
      <ViewWrapper>
        <Header
          middleComponent={
            <HeaderTabs>
              <Tab icon={check} tabText={"Phone"} />
              <Tab icon={check} tabText={"Calls"} />
              <Tab icon={check} tabText={"Dial"} />
            </HeaderTabs>
          }
        />
        {children}
      </ViewWrapper>
    </Layout>
  )
}

export default LayoutDesktopWrapper
