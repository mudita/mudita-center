/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import styled from "styled-components"
import { DeviceType } from "device-protocol/models"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { IconType } from "Core/__deprecated__/renderer/components/core/icon/icon-type"
import {
  baseMenuElements,
  centerMenuElements,
  deviceMenuElements,
  MenuElement,
} from "Core/__deprecated__/renderer/constants/menu-elements"
import MenuGroup from "Core/__deprecated__/renderer/components/rest/menu/menu-group.component"
import { backgroundColor } from "Core/core/styles/theming/theme-getters"
import Icon from "Core/__deprecated__/renderer/components/core/icon/icon.component"
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

const simulatePhoneConnectionEnabled = process.env.simulatePhoneConnection

interface Props {
  deviceType: DeviceType | null
  deviceFeaturesVisible?: boolean
  openHelpWindow?: () => void
  notifications: {
    [View.Messages]: boolean
  }
  genericMenuElements?: MenuElement[]
}

const MenuTop: FunctionComponent<Props> = ({
  deviceType,
  deviceFeaturesVisible,
  notifications,
  genericMenuElements,
}) => {
  const links = [
    ...baseMenuElements,
    ...(genericMenuElements || []),
    ...deviceMenuElements,
    ...centerMenuElements,
  ]
    .filter(({ connectedPhoneOnly }) =>
      deviceFeaturesVisible ? true : !connectedPhoneOnly
    )
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
      </LogoWrapper>
      {links}
    </div>
  )
}

export default MenuTop
