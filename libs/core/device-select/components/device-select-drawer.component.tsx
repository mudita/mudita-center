/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import * as React from "react"
import { useSelector, useDispatch } from "react-redux"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import Drawer from "react-modern-drawer"
import "react-modern-drawer/dist/index.css"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { isSelectDeviceDrawerOpenSelector } from "Core/device-select/selectors/is-select-device-drawer-open.selector"
import { closeSelectDeviceDrawer } from "Core/device-select/actions/close-select-device-drawer.action"
import Text, {
  TextDisplayStyle,
} from "Core/__deprecated__/renderer/components/core/text/text.component"
import styled from "styled-components"
import { Close } from "Core/__deprecated__/renderer/components/core/modal/modal.styled.elements"
import { DisplayStyle } from "Core/__deprecated__/renderer/components/core/button/button.config"
import { IconType } from "Core/__deprecated__/renderer/components/core/icon/icon-type"
import { getDevicesSelector } from "Core/device-manager/selectors/get-devices.selector"
import { activeDeviceIdSelector } from "Core/device-manager/selectors/active-device-id.selector"
import { DeviceImage } from "Core/overview/components/device-preview/device-image.component"
import { useHistory } from "react-router-dom"
import { handleDeviceActivated } from "Core/device-manager/actions/handle-device-activated.action"
import { deactivateDevice } from "Core/device-manager/actions/deactivate-device.action"
import { DeviceState } from "Core/device-manager/reducers/device-manager.interface"
import {
  URL_DEVICE_INITIALIZATION,
  URL_ONBOARDING,
} from "Core/__deprecated__/renderer/constants/urls"
import { DrawerDevice } from "Core/device-select/components/drawer-device.component"
import { defineMessages } from "react-intl"
import { DeviceId } from "Core/device/constants/device-id"

const messages = defineMessages({
  changeDevice: { id: "component.deviceSelection.changeDevice" },
})

const DrawerChildrenContainer = styled("div")`
  margin: 1.5rem 0rem 1.5rem 0rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
`

const Header = styled("div")`
  margin: 0.5rem 3rem 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
`

const DevicesContainer = styled("div")`
  padding: 0.5rem 2rem 0.5rem 2rem;
  display: flex;
  flex-direction: column;
  overflow: auto;
`

export const DeviceImageStyled = styled(DeviceImage)`
  max-height: 12rem;
  max-width: 9rem;
`

const DeviceSelectDrawer: FunctionComponent = () => {
  const isOpen = useSelector(isSelectDeviceDrawerOpenSelector)
  const devices = useSelector(getDevicesSelector)
  const activeDeviceId = useSelector(activeDeviceIdSelector)
  const dispatch = useDispatch<Dispatch>()
  const history = useHistory()

  const handleDrawerDeviceClick = async (id: DeviceId) => {
    dispatch(closeSelectDeviceDrawer())
    const device = devices.find((device) => device.id === id)
    if (device?.state === DeviceState.Failed) {
      history.push(URL_ONBOARDING.troubleshooting)
    } else {
      await dispatch(deactivateDevice())
      await dispatch(handleDeviceActivated(id))
      history.push(URL_DEVICE_INITIALIZATION.root)
    }
  }

  return (
    <Drawer
      open={isOpen}
      onClose={() => {
        dispatch(closeSelectDeviceDrawer())
      }}
      direction="right"
      size="30vw"
    >
      <DrawerChildrenContainer>
        <Header>
          <Text
            displayStyle={TextDisplayStyle.Headline4}
            message={messages.changeDevice}
          />
          <Close
            displayStyle={DisplayStyle.IconOnly}
            onClick={() => dispatch(closeSelectDeviceDrawer())}
            Icon={IconType.Close}
          />
        </Header>
        <DevicesContainer>
          {devices.map(({ caseColour, deviceType, id, serialNumber }) => (
            <DrawerDevice
              key={id}
              deviceId={id}
              activeDeviceId={activeDeviceId}
              serialNumber={serialNumber}
              caseColour={caseColour}
              deviceType={deviceType}
              onClick={() => handleDrawerDeviceClick(id)}
            />
          ))}
        </DevicesContainer>
      </DrawerChildrenContainer>
    </Drawer>
  )
}

export default DeviceSelectDrawer
