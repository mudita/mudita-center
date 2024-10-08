/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { defineMessages } from "react-intl"
import styled, { css } from "styled-components"
import { DeviceProperties } from "device-manager/models"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import {
  backgroundColor,
  borderColor,
  borderRadius,
  transitionTime,
  transitionTimingFunction,
} from "Core/core/styles/theming/theme-getters"
import { DeviceImage } from "Core/overview/components/device-preview/device-image.component"
import Text, {
  TextDisplayStyle,
} from "Core/__deprecated__/renderer/components/core/text/text.component"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { DeviceType } from "device-protocol/models"
import { getSerialNumberValue } from "Core/utils/get-serial-number-value"
import { getDeviceTypeName } from "Core/discovery-device/utils/get-device-type-name"
import Icon from "Core/__deprecated__/renderer/components/core/icon/icon.component"
import { IconType } from "Core/__deprecated__/renderer/components/core/icon/icon-type"
import { BadgeWithIcon } from "Core/__deprecated__/renderer/components/core/badge/badge-with-icon.component"

const dataTestIds = {
  availableDevice: "available-device",
  availableDeviceName: "available-device-name",
  availableDeviceSerialNumber: "available-device-serial-number",
}

const messages = defineMessages({
  headerTitle: { id: "module.availableDeviceList.headerTitle" },
  subheaderTitle: { id: "module.availableDeviceList.subheaderTitle" },
  serialNumber: { id: "module.availableDeviceList.serialNumber" },
  recoveryMode: { id: "module.availableDeviceList.recoveryMode" },
})

const DeviceImageWrapper = styled.div`
  box-sizing: border-box;

  height: 34.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 0;
`

const Container = styled.div`
  box-sizing: border-box;

  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;

  height: 44rem;
  max-height: 44rem;
  max-width: 34rem;
  border: 0.1rem solid ${borderColor("deviceListSeparator")};
  border-radius: ${borderRadius("medium")};

  position: relative;

  &:hover {
    cursor: pointer;
    background-color: ${backgroundColor("main")};
    border-color: ${borderColor("deviceListSeparatorHover")};
    transition: background-color ${transitionTime("veryQuick")}
        ${transitionTimingFunction("smooth")},
      border-color ${transitionTime("quick")}
        ${transitionTimingFunction("smooth")};
  }
`

export const DeviceImageStyled = styled(DeviceImage)`
  max-height: 25.4rem;
  max-width: 20.5rem;

  ${({ deviceType }) => {
    switch (deviceType) {
      case DeviceType.MuditaPure:
        return css`
          max-height: 25.1rem;
        `
      default:
        return
    }
  }}
`

export const DeviceInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2.2rem;
  height: 7.3rem;
`

export const DeviceInfoDeviceTypeName = styled(Text)`
  margin-bottom: 0.5rem;
`

export interface DeviceListItemProps extends DeviceProperties {
  onDeviceClick: (id: string) => void
}

const DeviceListItem: FunctionComponent<DeviceListItemProps> = ({
  onDeviceClick,
  className,
  id,
  serialNumber,
  deviceType,
  caseColour,
}) => {
  const serialNumberValue = getSerialNumberValue(serialNumber)

  const serialNumberHeader =
    serialNumberValue !== "" ? intl.formatMessage(messages.serialNumber) : ""

  return (
    <Container
      className={className}
      onClick={() => onDeviceClick(id)}
      data-testid={dataTestIds.availableDevice}
    >
      {deviceType === DeviceType.MuditaHarmonyMsc && (
        <BadgeWithIcon>
          <Icon type={IconType.RecoveryModeWhite} />
          <Text displayStyle={TextDisplayStyle.Paragraph3} color="active">
            {intl.formatMessage(messages.recoveryMode)}
          </Text>
        </BadgeWithIcon>
      )}
      <DeviceImageWrapper>
        <DeviceImageStyled deviceType={deviceType} caseColour={caseColour} />
      </DeviceImageWrapper>
      <DeviceInfoContainer>
        <DeviceInfoDeviceTypeName
          displayStyle={TextDisplayStyle.Headline4}
          data-testid={dataTestIds.availableDeviceName}
        >
          {getDeviceTypeName(deviceType, caseColour)}
        </DeviceInfoDeviceTypeName>
        {deviceType !== DeviceType.MuditaHarmonyMsc && (
          <>
            <Text displayStyle={TextDisplayStyle.Paragraph4} color="secondary">
              {serialNumberHeader}
            </Text>
            <Text
              displayStyle={TextDisplayStyle.Paragraph1}
              data-testid={dataTestIds.availableDeviceSerialNumber}
            >
              {serialNumberValue}
            </Text>
          </>
        )}
      </DeviceInfoContainer>
    </Container>
  )
}

export default DeviceListItem
