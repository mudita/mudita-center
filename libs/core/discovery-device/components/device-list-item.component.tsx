/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { defineMessages } from "react-intl"
import styled from "styled-components"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { Device } from "Core/device-manager/reducers/device-manager.interface"
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
import { DeviceTestIds } from "Core/overview/components/device-preview/device-preview-test-ids.enum"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { DeviceType } from "Core/device"

const messages = defineMessages({
  headerTitle: { id: "module.availableDeviceList.headerTitle" },
  subheaderTitle: { id: "module.availableDeviceList.subheaderTitle" },
  serialNumber: { id: "module.availableDeviceList.serialNumber" },
  noSerialNumberMessage: { id: "module.availableDeviceList.noSerialNumberMessage" },
})

const Container = styled.div`
  box-sizing: border-box;

  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;

  height: 44rem;
  max-height: 44rem;
  max-width: 34rem;
  padding-top: 4rem;
  border: 0.1rem solid ${borderColor("deviceListSeparator")};
  border-radius: ${borderRadius("medium")};
  img {
    height: 26.3rem;
  }
  &:hover {
    cursor: pointer;
    background-color: ${backgroundColor("main")};
    border-radius: ${borderColor("deviceListSeparatorHover")};
    transition: background-color ${transitionTime("veryQuick")}
    ${transitionTimingFunction("smooth")},
    border-color ${transitionTime("quick")}
    ${transitionTimingFunction("smooth")};
  }
`

export const DeviceInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2.2rem;
`

export const DeviceInfoDeviceTypeName = styled(Text)`
  margin-bottom: 0.5rem;
`

export interface DeviceListItemProps extends Device {
  onDeviceClick: (id: string) => void
}

const getDeviceTypeName = (deviceType: DeviceType): string => {
  switch (deviceType) {
    case DeviceType.MuditaPure:
      return "Pure"
    case DeviceType.MuditaHarmony:
      return "Harmony 1"
    case DeviceType.MuditaKompakt:
      return "Kompakt"
  }
}

const DeviceListItem: FunctionComponent<DeviceListItemProps> = ({
  onDeviceClick,
  className,
  id,
  serialNumber,
  deviceType,
}) => {
  return (
    <Container className={className} onClick={() => onDeviceClick(id)}>
      <DeviceImage deviceType={deviceType} />
      <DeviceInfoContainer>
        <DeviceInfoDeviceTypeName
          displayStyle={TextDisplayStyle.Headline4}
        >
          {getDeviceTypeName(deviceType)}
        </DeviceInfoDeviceTypeName>
        <Text
          displayStyle={TextDisplayStyle.Paragraph4}
          color="secondary"
          message={messages.serialNumber}
        />
        <Text
          displayStyle={TextDisplayStyle.Paragraph1}
          testId={DeviceTestIds.SerialNumber}
        >
          {serialNumber
            ? serialNumber
            : intl.formatMessage(messages.noSerialNumberMessage)}
        </Text>
      </DeviceInfoContainer>
    </Container>
  )
}

export default DeviceListItem
