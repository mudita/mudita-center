/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import * as React from "react"
import Button from "App/__deprecated__/renderer/components/core/button/button.component"
import Header from "App/__deprecated__/renderer/components/rest/header/header.component"
import Tabs from "App/__deprecated__/renderer/components/rest/header/tabs.component"
import Menu from "App/__deprecated__/renderer/components/rest/menu/menu.container"
import {
  backgroundColor,
  boxShadowColor,
  width,
  zIndex,
} from "App/__deprecated__/renderer/styles/theming/theme-getters"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import styled from "styled-components"
import { IconSize } from "App/__deprecated__/renderer/components/core/icon/icon.component"
import { Feature, flags } from "App/feature-flags"
import AlphaReleaseWarning from "App/__deprecated__/renderer/wrappers/components/alpha-release-warning.component"

const Layout = styled.div`
  display: grid;
  height: 100vh;
  grid-template-rows: 6rem calc(100vh - 6rem);
  grid-template-columns: 31.2rem 1fr;
  grid-template-areas: "Menu Header" "Menu View";
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

const HeaderWrapper = styled.div`
  grid-area: Header;
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

const LayoutDesktopWrapper: FunctionComponent = ({ children }) => {
  const [warningOpen, setWarningOpen] = React.useState<boolean>(true)
  const handleCloseWarning = () => setWarningOpen(false)
  return (
    <Layout>
      <MenuWrapper>
        <Menu />
      </MenuWrapper>
      <HeaderWrapper>
        <Header
          middleComponent={<Tabs />}
          button={
            <HeaderButton
              label={intl.formatMessage({
                id: "module.news.moreNewsButtonLabel",
              })}
              href={"https://www.mudita.com/#news"}
              target="_blank"
              iconSize={IconSize.Medium}
            />
          }
        />
      </HeaderWrapper>
      <ViewWrapper>
        {flags.get(Feature.AlphaRelaseWarning) && warningOpen && (
          <AlphaReleaseWarning onClose={handleCloseWarning} />
        )}
        {children}
      </ViewWrapper>
    </Layout>
  )
}

export default LayoutDesktopWrapper
