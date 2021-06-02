/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import MenuGroup from "Renderer/components/rest/menu/menu-group.component"
import { menuElements } from "Renderer/constants/menu-elements"
import { DevMode } from "App/dev-mode/store/dev-mode.interface"
import styled from "styled-components"
import {
  backgroundColor,
  textColor,
} from "Renderer/styles/theming/theme-getters"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import Icon from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import { intl } from "Renderer/utils/intl"

const MenuWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 0 3.2rem;
`

const LogoWrapper = styled.div`
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: ${backgroundColor("row")};
`

const SvgMuditaLogo = styled(Icon)`
  height: 2rem;
  width: 8.6rem;
  margin: 2rem 0 2.4rem;
`

const DevSign = styled.span`
  position: absolute;
  right: 0;
  top: 2rem;
  line-height: 2rem;
  color: ${textColor("secondary")};
`

interface Properties {
  pureFeaturesVisible?: boolean
  openHelpWindow?: () => void
  devModeEnabled?: DevMode["enabled"]
}
const simulatePhoneConnectionEnabled = process.env.simulatePhoneConnection

const Menu: FunctionComponent<Properties> = ({
  pureFeaturesVisible,
  devModeEnabled,
}) => {
  const links = menuElements
    .filter(({ connectedPhoneOnly }) =>
      pureFeaturesVisible ? true : !connectedPhoneOnly
    )
    .filter(({ devModeOnly }) => (devModeEnabled ? true : !devModeOnly))
    .filter(({ simulatePhoneConnection }) =>
      simulatePhoneConnectionEnabled ? true : !simulatePhoneConnection
    )
    .map(({ connectedPhoneOnly, ...props }, indexMenu) => {
      return <MenuGroup {...props} key={indexMenu} />
    })
  return (
    <MenuWrapper>
      <LogoWrapper>
        <SvgMuditaLogo type={Type.MuditaLogoWithText} />
        {devModeEnabled && (
          <DevSign>
            {intl.formatMessage({ id: "component.devModeHeader" })}
          </DevSign>
        )}
      </LogoWrapper>
      {links}
    </MenuWrapper>
  )
}

export default Menu
