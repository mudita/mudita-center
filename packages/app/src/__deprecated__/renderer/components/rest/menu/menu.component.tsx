/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { DeviceType } from "@mudita/pure"
import { connect } from "react-redux"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import MenuGroup from "App/__deprecated__/renderer/components/rest/menu/menu-group.component"
import { menuElements } from "App/__deprecated__/renderer/constants/menu-elements"
import { DevMode } from "App/__deprecated__/dev-mode/store/dev-mode.interface"
import styled from "styled-components"
import {
  backgroundColor,
  textColor,
} from "App/__deprecated__/renderer/styles/theming/theme-getters"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import Icon from "App/__deprecated__/renderer/components/core/icon/icon.component"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import { SynchronizationState } from "App/data-sync/reducers"
import Loader from "App/__deprecated__/renderer/components/core/loader/loader.component"
import { LoaderType } from "App/__deprecated__/renderer/components/core/loader/loader.interface"
import Text, {
  TextDisplayStyle,
} from "App/__deprecated__/renderer/components/core/text/text.component"
import { MenuGroupTestIds } from "App/__deprecated__/renderer/components/rest/menu/menu-group-test-ids.enum"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"
import { View } from "App/__deprecated__/renderer/constants/views"
import { getUnreadThreads } from "App/messages/selectors"

const MenuWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 0 3.2rem;
  justify-content: space-between;
  min-height: 100%;
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
const SyncProgressWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 3.2rem;
  margin-top: 0.8rem;
`
const LoaderWrapper = styled.div`
  margin: 0 1.6rem;
`

interface Properties {
  deviceType: DeviceType | null
  deviceFeaturesVisible?: boolean
  openHelpWindow?: () => void
  devModeEnabled?: DevMode["enabled"]
  syncState?: SynchronizationState
  notifications: {
    [View.Messages]: boolean
  }
}
const simulatePhoneConnectionEnabled = process.env.simulatePhoneConnection

const Menu: FunctionComponent<Properties> = ({
  deviceType,
  deviceFeaturesVisible,
  devModeEnabled,
  syncState,
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
    <MenuWrapper>
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
      {syncState !== undefined &&
        (syncState === SynchronizationState.Loading ||
          syncState === SynchronizationState.Cache) && (
          <SyncProgressWrapper data-testid={MenuGroupTestIds.Sync}>
            <LoaderWrapper>
              <Loader type={LoaderType.Spinner} size={1.5} />
            </LoaderWrapper>
            <Text displayStyle={TextDisplayStyle.Paragraph1}>
              {intl.formatMessage({ id: "component.menuHeaderSync" })}
            </Text>
          </SyncProgressWrapper>
        )}
    </MenuWrapper>
  )
}

const mapDispatchToProps = (state: ReduxRootState) => ({
  deviceType: state.device.deviceType,
  notifications: {
    [View.Messages]: getUnreadThreads(state).length > 0,
  },
})

export default connect(mapDispatchToProps)(Menu)
