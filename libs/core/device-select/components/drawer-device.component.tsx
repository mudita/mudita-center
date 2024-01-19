/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import * as React from "react"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { DeviceImage } from "Core/overview/components/device-preview/device-image.component"
import Text, {
  TextDisplayStyle,
} from "Core/__deprecated__/renderer/components/core/text/text.component"
import styled, { css } from "styled-components"
import {
  backgroundColor,
  borderColor,
  borderRadius,
  textColor,
} from "Core/core/styles/theming/theme-getters"
import { DeviceType } from "Core/device"
import { CaseColor } from "Core/device/constants"
import { getDeviceTypeName } from "Core/discovery-device/utils/get-device-type-name"
import { intl } from "Core/__deprecated__/renderer/utils/intl"

const Device = styled("div")<{ active: boolean }>`
  display: flex;
  justify-content: flex-start;
  margin: 1rem 0.5rem 1rem 0.5rem;

  &:hover {
    background: ${backgroundColor("main")};
    cursor: pointer;
  }

  ${({ active }) => {
    return active
      ? css`
          border: 0.1rem solid ${borderColor("secondary")};
          border-radius: ${borderRadius("medium")};
          background: ${backgroundColor("main")};
        `
      : ``
  }}
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
  margin: 0 0.5rem 0 2rem;
  display: flex;
  flex-direction: column;
`

const ActiveDot = styled("span")`
  height: 1.2rem;
  width: 1.2rem;
  background-color: ${textColor("primary")};
  border-radius: 50%;
  display: inline-block;
  margin: 0rem 0.5rem 0.8rem 0.5rem;
`

const DeviceName = styled(Text)`
  margin-bottom: 0.5rem;
`

export type DrawerDeviceProps = {
  deviceId: string
  activeDeviceId: string | undefined
  serialNumber: string | undefined
  caseColour: CaseColor | undefined
  deviceType: DeviceType
  onClick: () => void
}

export const DrawerDevice: FunctionComponent<DrawerDeviceProps> = ({
  deviceId,
  activeDeviceId,
  serialNumber,
  caseColour,
  deviceType,
  onClick,
}) => {
  return (
    <Device
      active={deviceId == activeDeviceId}
      key={deviceId}
      onClick={deviceId === activeDeviceId ? () => {} : onClick}
    >
      <DeviceImageContainer>
        <DeviceImageStyled deviceType={deviceType} caseColour={caseColour} />
      </DeviceImageContainer>

      <DeviceDetailsWrapper>
        <DeviceDetails>
          <DeviceName displayStyle={TextDisplayStyle.Headline4}>
            {getDeviceTypeName(deviceType, caseColour)}
            {deviceId === activeDeviceId && <ActiveDot />}
          </DeviceName>

          {serialNumber && (
            <>
              <Text
                displayStyle={TextDisplayStyle.Paragraph4}
                color="secondary"
              >
                {intl.formatMessage({
                  id: "module.availableDeviceList.serialNumber",
                })}
              </Text>
              <Text displayStyle={TextDisplayStyle.Paragraph1}>
                {serialNumber}
              </Text>
            </>
          )}
        </DeviceDetails>
      </DeviceDetailsWrapper>
    </Device>
  )
}
