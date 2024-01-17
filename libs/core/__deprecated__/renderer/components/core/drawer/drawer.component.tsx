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
import styled, { css } from "styled-components"
import { Close } from "Core/__deprecated__/renderer/components/core/modal/modal.styled.elements"
import { DisplayStyle } from "Core/__deprecated__/renderer/components/core/button/button.config"
import { IconType } from "Core/__deprecated__/renderer/components/core/icon/icon-type"
import { getDevicesSelector } from "Core/device-manager/selectors/get-devices.selector"
import { activeDeviceIdSelector } from "Core/device-manager/selectors/active-device-id.selector"
import { DeviceImage } from "Core/overview/components/device-preview/device-image.component"
import { CaseColor, DeviceType } from "Core/device"
import {
  backgroundColor,
  borderColor,
  borderRadius,
  textColor,
} from "Core/core/styles/theming/theme-getters"
import { useHistory } from "react-router-dom"
import { handleDeviceActivated } from "Core/device-manager/actions/handle-device-activated.action"
import { deactivateDevice } from "Core/device-manager/actions/deactivate-device.action"
import { DeviceState } from "Core/device-manager/reducers/device-manager.interface"
import { URL_ONBOARDING } from "Core/__deprecated__/renderer/constants/urls"

const DrawerChildrenContainer = styled("div")`
  margin: 1.5rem 1rem 1.5rem 1rem;
`

const Header = styled("div")`
  display: flex;
  justify-content: space-between;
  overflow: hidden;
`

const DevicesContainer = styled("div")`
  margin: 0.5rem;
`

const DeviceImageContainer = styled("div")`
  min-height: 15rem;
  min-width: 15rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const DeviceImageStyled = styled(DeviceImage)`
  max-height: 12rem;
  max-width: 9rem;
`

const DeviceDetailsWrapper = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
`

const DeviceDetails = styled("div")`
  margin: 0 0.5rem 0 2rem
  display: flex;
  flex-direction: column;
`

const Device = styled("div")<{ active: boolean }>`
  display: flex;
  justify-content: flex-start;
  margin: 1rem 0.5rem 1rem 0.5rem;

  &:hover {
    background: ${backgroundColor("disabled")};
    cursor: pointer;
  }

  ${({ active }) => {
    return active
      ? css`
          border: 0.1rem solid ${borderColor("secondary")};
          border-radius: ${borderRadius("medium")};
          background: ${backgroundColor("disabled")};
        `
      : ``
  }}
`

const ActiveDot = styled("span")`
  height: 1.2rem;
  width: 1.2rem;
  background-color: ${textColor("primary")};
  border-radius: 50%;
  display: inline-block;
  margin: 0rem 0.5rem 0.8rem 0.5rem;
`

const getDeviceTypeName = (
  deviceType: DeviceType,
  caseColour: CaseColor = CaseColor.Black
): string => {
  if (deviceType === DeviceType.MuditaPure) {
    return "Pure"
  }

  if (
    deviceType === DeviceType.MuditaHarmony &&
    caseColour === CaseColor.Gray
  ) {
    return "Harmony 1"
  }

  if (
    deviceType === DeviceType.MuditaHarmony &&
    caseColour === CaseColor.Black
  ) {
    return "Harmony 2"
  }

  if (deviceType === DeviceType.APIDevice) {
    return "Kompakt"
  }
  return "Unknown Device"
}

type DrawerProps = {}

const DrawerContainer: FunctionComponent<DrawerProps> = (props) => {
  const isOpen = useSelector(isSelectDeviceDrawerOpenSelector)
  const devices = useSelector(getDevicesSelector)
  const activeDeviceId = useSelector(activeDeviceIdSelector)
  const dispatch = useDispatch<Dispatch>()
  const history = useHistory()

  return (
    <Drawer
      open={isOpen}
      onClose={() => {
        dispatch(closeSelectDeviceDrawer())
      }}
      direction="right"
      size="30vw"
      style={{
        display: "flex",
        flexDirection: "column",
        overflowY: "scroll",
      }}
    >
      <DrawerChildrenContainer>
        <Header>
          <Text
            displayStyle={TextDisplayStyle.Headline4}
            message={"Change Device"}
            data-testid={"change-device-header-testid"}
          />
          <Close
            displayStyle={DisplayStyle.IconOnly}
            onClick={() => dispatch(closeSelectDeviceDrawer())}
            Icon={IconType.Close}
            data-testid={"drawer-close-button-testid"}
          />
        </Header>
        <DevicesContainer>
          {devices.map(({ caseColour, deviceType, id, serialNumber }) => (
            <Device
              active={id == activeDeviceId}
              key={id}
              onClick={() => {
                //copied
                dispatch(closeSelectDeviceDrawer())
                const device = devices.find((device) => device.id === id)
                if (device?.state === DeviceState.Failed) {
                  history.push(URL_ONBOARDING.troubleshooting)
                } else {
                  dispatch(deactivateDevice())
                  dispatch(handleDeviceActivated({ deviceId: id, history }))
                }
              }}
            >
              <DeviceImageContainer>
                <DeviceImageStyled
                  deviceType={deviceType}
                  caseColour={caseColour}
                />
              </DeviceImageContainer>

              <DeviceDetailsWrapper>
                <DeviceDetails>
                  <Text displayStyle={TextDisplayStyle.Headline4}>
                    {getDeviceTypeName(deviceType, caseColour)}
                    {id === activeDeviceId && <ActiveDot />}
                  </Text>

                  {serialNumber && (
                    <>
                      <Text
                        displayStyle={TextDisplayStyle.Paragraph4}
                        color="secondary"
                      >
                        Serial number
                      </Text>
                      <Text displayStyle={TextDisplayStyle.Paragraph1}>
                        {serialNumber}
                      </Text>
                    </>
                  )}
                </DeviceDetails>
              </DeviceDetailsWrapper>
            </Device>
          ))}
        </DevicesContainer>
      </DrawerChildrenContainer>
    </Drawer>
  )
}

export default DrawerContainer
