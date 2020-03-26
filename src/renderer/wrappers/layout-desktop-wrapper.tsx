import * as React from "react"
import Tabs from "Renderer/components/rest/header/tabs.component"
import styled from "styled-components"
import FunctionComponent from "Renderer/types/function-component.interface"
import Menu from "Renderer/components/rest/menu/menu.container"
import Header from "Renderer/components/rest/header/header.component"
import {
  backgroundColor,
  boxShadowColor,
  width,
} from "Renderer/styles/theming/theme-getters"
import Button from "Renderer/components/core/button/button.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import { intl } from "Renderer/utils/intl"

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

const LayoutDesktopWrapper: FunctionComponent = ({ children }) => {
  return (
    <Layout>
      <MenuWrapper>
        <Menu />
      </MenuWrapper>
      <ViewWrapper>
        <Header
          middleComponent={<HeaderTabs />}
          button={
            <HeaderButton
              Icon={Type.More}
              label={intl.formatMessage({
                id: "view.name.news.moreNewsButtonLabel",
              })}
              href={"https://www.mudita.com/"}
              target="_blank"
            />
          }
        />
        {children}
      </ViewWrapper>
    </Layout>
  )
}

export default LayoutDesktopWrapper
