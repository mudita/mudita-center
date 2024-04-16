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
import { setSelectDeviceDrawerOpen } from "Core/device-select/actions/set-select-device-drawer-open.action"
import Text, {
  TextDisplayStyle,
} from "Core/__deprecated__/renderer/components/core/text/text.component"
import styled from "styled-components"
import { Close } from "Core/__deprecated__/renderer/components/core/modal/modal.styled.elements"
import { DisplayStyle } from "Core/__deprecated__/renderer/components/core/button/button.config"
import { IconType } from "Core/__deprecated__/renderer/components/core/icon/icon-type"
import { getAvailableDevicesSelector } from "Core/device-manager/selectors/get-available-devices.selector"
import { activeDeviceIdSelector } from "Core/device-manager/selectors/active-device-id.selector"
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
import { ModalLayers } from "Core/modals-manager/constants/modal-layers.enum"

const messages = defineMessages({
  changeDevice: { id: "component.drawer.headerTitle" },
})

//bugfix for CP-2453
//resizing window vertically is not smooth, it has delay which comes from trasition delay
//adding another transition to inner drawer class helps for it
const DrawerWrapper = styled("div")`
  .EZDrawer .EZDrawer__checkbox:checked ~ .EZDrawer__container {
    transition: transform 500ms;
  }
`

const DrawerChildrenContainer = styled("div")`
  padding: 1.3rem 1.8rem 1.3rem 1.8rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  height: 100%;
`

const Header = styled("div")`
  display: flex;
  justify-content: space-between;
  padding-right: 1.8rem;
`

const DevicesContainer = styled("div")`
  display: flex;
  gap: 3.8rem;
  flex-direction: column;
  align-items: flex-start;
  overflow-y: scroll;
`

const DeviceSelectDrawer: FunctionComponent = () => {
  const isOpen = useSelector(isSelectDeviceDrawerOpenSelector)
  const devices = useSelector(getAvailableDevicesSelector)
  const activeDeviceId = useSelector(activeDeviceIdSelector)
  const dispatch = useDispatch<Dispatch>()
  const history = useHistory()

  const handleDrawerDeviceClick = async (id: DeviceId) => {
    dispatch(setSelectDeviceDrawerOpen(false))
    const device = devices.find((device) => device.id === id)
    if (device?.state === DeviceState.Failed) {
      await dispatch(handleDeviceActivated(id))
      history.push(URL_ONBOARDING.troubleshooting)
    } else {
      await dispatch(deactivateDevice())
      await dispatch(handleDeviceActivated(id))
      history.push(URL_DEVICE_INITIALIZATION.root)
    }
  }

  return (
    <DrawerWrapper>
      <Drawer
        open={isOpen}
        onClose={() => {
          dispatch(setSelectDeviceDrawerOpen(false))
        }}
        direction="right"
        size="36.9rem"
        zIndex={ModalLayers.Drawer}
      >
        <DrawerChildrenContainer>
          <Header>
            <Text
              displayStyle={TextDisplayStyle.Headline4}
              message={messages.changeDevice}
            />
            <Close
              displayStyle={DisplayStyle.IconOnly}
              onClick={() => dispatch(setSelectDeviceDrawerOpen(false))}
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
                onClick={() => {
                  handleDrawerDeviceClick(id)
                }}
              />
            ))}
          </DevicesContainer>
        </DrawerChildrenContainer>
      </Drawer>
    </DrawerWrapper>
  )
}

export default DeviceSelectDrawer
