/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { IconType } from "Core/__deprecated__/renderer/components/core/icon/icon-type"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { menuElements } from "Core/__deprecated__/renderer/constants/menu-elements"
import MenuGroup from "Core/__deprecated__/renderer/components/rest/menu/menu-group.component"
import styled from "styled-components"
import {
  backgroundColor,
  textColor,
} from "Core/core/styles/theming/theme-getters"
import Icon from "Core/__deprecated__/renderer/components/core/icon/icon.component"
import { DeviceType } from "Core/device"
import { DevMode } from "Core/__deprecated__/dev-mode/store/dev-mode.interface"
import { View } from "Core/__deprecated__/renderer/constants/views"

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

const simulatePhoneConnectionEnabled = process.env.simulatePhoneConnection

interface Props {
  deviceType: DeviceType | null
  deviceFeaturesVisible?: boolean
  openHelpWindow?: () => void
  devModeEnabled?: DevMode["enabled"]
  notifications: {
    [View.Messages]: boolean
  }
}

const MenuTop: FunctionComponent<Props> = ({
  deviceType,
  deviceFeaturesVisible,
  devModeEnabled,
  notifications,
}) => {
  const links = menuElements
    .filter(({ connectedPhoneOnly }) =>
      deviceFeaturesVisible ? true : !connectedPhoneOnly
    )
    .filter(({ devModeOnly }) => (devModeEnabled ? true : !devModeOnly))
    .filter(({ simulatePhoneConnection }) =>
      simulatePhoneConnectionEnabled ? true : !simulatePhoneConnection
    )
    .filter(({ visibleOn }) =>
      deviceType && visibleOn ? visibleOn.includes(deviceType) : true
    )
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .map(({ connectedPhoneOnly, ...props }, indexMenu) => {
      return (
        <MenuGroup
          {...props}
          deviceType={deviceType}
          key={indexMenu}
          notifications={notifications}
        />
      )
    })

  return (
    <div>
      <LogoWrapper>
        <SvgMuditaLogo type={IconType.MuditaLogoWithText} />
        {devModeEnabled && (
          <DevSign>
            {intl.formatMessage({ id: "component.devModeHeader" })}
          </DevSign>
        )}
      </LogoWrapper>
      {links}
    </div>
  )
}

export default MenuTop
