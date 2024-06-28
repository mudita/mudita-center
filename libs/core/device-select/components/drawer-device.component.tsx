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
  transitionTime,
  transitionTimingFunction,
} from "Core/core/styles/theming/theme-getters"
import { DeviceType } from "Core/device"
import { CaseColour } from "Core/device/constants"
import { getDeviceTypeName } from "Core/discovery-device/utils/get-device-type-name"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { getSerialNumberValue } from "Core/utils/get-serial-number-value"
import { Badge } from "generic-view/ui"
import Icon from "Core/__deprecated__/renderer/components/core/icon/icon.component"
import { IconType } from "Core/__deprecated__/renderer/components/core/icon/icon-type"

const Device = styled("div")<{ active: boolean }>`
  padding: 1.8rem 2.4rem 1.8rem 1rem;
  display: flex;
  min-width: 27.2rem;
  max-width: 27.2rem;

  position: relative;

  &:hover {
    background: ${backgroundColor("main")};
    cursor: pointer;
  }

  transition: background-color ${transitionTime("veryQuick")}
    ${transitionTimingFunction("smooth")};

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
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 9.6rem;
  min-width: 9.1rem;
  padding: 0 2.4rem 0 0rem;
`

export const DeviceImageStyled = styled(DeviceImage)`
  ${({ deviceType }) => {
    switch (deviceType) {
      case DeviceType.MuditaPure:
        return css`
          max-height: 9.6rem;
          max-width: 4.2rem;
        `
      case DeviceType.MuditaHarmony:
      case DeviceType.MuditaHarmonyMsc:
        return css`
          max-height: 7.5rem;
          max-width: 7rem;
        `
      case DeviceType.APIDevice:
        //sizes for Kompakt
        return css`
          max-height: 9.6rem;
          max-width: 5.3rem;
        `
      default:
        return
    }
  }}
`

const DeviceDetailsWrapper = styled("div")`
  display: flex;
  align-items: center;
  justify-content: start;
`

const DeviceDetails = styled("div")`
  display: flex;
  flex-direction: column;
  padding: 1.3rem 5rem 1.4rem 0;
`

const DeviceName = styled(Text)`
  margin-bottom: 0.5rem;
`

export type DrawerDeviceProps = {
  deviceId: string
  activeDeviceId: string | undefined
  serialNumber: string | undefined
  caseColour: CaseColour | undefined
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
  const serialNumberValue = getSerialNumberValue(serialNumber)

  return (
    <Device
      active={deviceId == activeDeviceId}
      key={deviceId}
      onClick={deviceId === activeDeviceId ? () => {} : onClick}
    >
      {deviceType === DeviceType.MuditaHarmonyMsc && (
        <Badge>
          <Icon type={IconType.RecoveryMode} />
          <Text displayStyle={TextDisplayStyle.Paragraph3} color="active">
            Recovery Mode
          </Text>
        </Badge>)}
      <DeviceImageContainer>
        <DeviceImageStyled deviceType={deviceType} caseColour={caseColour} />
      </DeviceImageContainer>

      <DeviceDetailsWrapper>
        <DeviceDetails>
          <DeviceName displayStyle={TextDisplayStyle.Headline4}>
            {getDeviceTypeName(deviceType, caseColour)}
            {deviceId === activeDeviceId &&
              intl.formatMessage({
                id: "module.availableDeviceList.active",
              })}
          </DeviceName>

          {serialNumberValue && (
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
                {serialNumberValue}
              </Text>
            </>
          )}
        </DeviceDetails>
      </DeviceDetailsWrapper>
    </Device>
  )
}
