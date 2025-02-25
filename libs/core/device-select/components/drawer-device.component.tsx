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
import { DeviceType } from "device-protocol/models"
import { CaseColour } from "core-device/models"
import { getDeviceTypeName } from "Core/discovery-device/utils/get-device-type-name"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { getSerialNumberValue } from "Core/utils/get-serial-number-value"
import { BadgeWithIcon } from "Core/__deprecated__/renderer/components/core/badge/badge-with-icon.component"
import Icon from "Core/__deprecated__/renderer/components/core/icon/icon.component"
import { IconType } from "Core/__deprecated__/renderer/components/core/icon/icon-type"

const dataTestIds = {
  deviceImage: "drawer-device-image",
  deviceSerialNumberValue: "drawer-device-serial-number-value",
  deviceType: "drawer-device-type",
  drawerDeviceWrapper: "drawer-device-wrapper",
}

const Device = styled("div")<{ active: boolean }>`
  padding: 1.8rem 2.4rem 1.8rem 1rem;
  display: flex;
  position: relative;
  height: 13.2rem;
  gap: 1.8rem;
  width: 100%;

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
  width: 9.1rem;
`

export const DeviceImageStyled = styled(DeviceImage)`
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
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
      data-testid={`${dataTestIds.drawerDeviceWrapper}-${serialNumberValue}`}
    >
      {deviceType === DeviceType.MuditaHarmonyMsc && (
        <BadgeWithIcon>
          <Icon type={IconType.RecoveryModeWhite} />
          <Text displayStyle={TextDisplayStyle.Paragraph3} color="active">
            {intl.formatMessage({
              id: "module.availableDeviceList.recoveryMode",
            })}
          </Text>
        </BadgeWithIcon>
      )}
      <DeviceImageContainer>
        <DeviceImageStyled
          deviceType={deviceType}
          caseColour={caseColour}
          data-testid={dataTestIds.deviceImage}
        />
      </DeviceImageContainer>

      <DeviceDetailsWrapper>
        <DeviceDetails>
          <DeviceName
            displayStyle={TextDisplayStyle.Headline4}
            data-testid={dataTestIds.deviceType}
          >
            {getDeviceTypeName(deviceType, caseColour)}
            {deviceId === activeDeviceId &&
              intl.formatMessage({
                id: "module.availableDeviceList.active",
              })}
          </DeviceName>

          {serialNumberValue && deviceType !== DeviceType.MuditaHarmonyMsc && (
            <>
              <Text
                displayStyle={TextDisplayStyle.Paragraph4}
                color="secondary"
              >
                {intl.formatMessage({
                  id: "module.availableDeviceList.serialNumber",
                })}
              </Text>
              <Text
                displayStyle={TextDisplayStyle.Paragraph1}
                data-testid={dataTestIds.deviceSerialNumberValue}
              >
                {serialNumberValue}
              </Text>
            </>
          )}
        </DeviceDetails>
      </DeviceDetailsWrapper>
    </Device>
  )
}
