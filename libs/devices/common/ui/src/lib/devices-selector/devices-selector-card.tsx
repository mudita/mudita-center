/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ComponentProps, FunctionComponent } from "react"
import { DeviceImageSize } from "devices/common/models"
import {
  DevicesDrawerCardWrapper,
  DrawerCardDevice,
  Info,
  Name,
  RecoveryLabel,
  SerialNumber,
} from "../devices-drawer/devices-drawer-card"
import { DeviceImage } from "../device-image/device-image"
import { defineMessages, formatMessage } from "app-localize/utils"
import { Icon } from "app-theme/ui"
import { IconSize, IconType } from "app-theme/models"
import styled from "styled-components"

const messages = defineMessages({
  serialNumberLabel: { id: "general.components.deviceCard.serialNumberLabel" },
  recoveryModeLabel: { id: "general.components.deviceCard.recoveryModeLabel" },
})

export interface SelectorItemProps
  extends DrawerCardDevice,
    ComponentProps<typeof Wrapper> {
  onClick?: VoidFunction
}

export const DevicesSelectorCard: FunctionComponent<SelectorItemProps> = ({
  device,
  name,
  serialNumber,
  recoveryMode,
  onClick,
  ...rest
}) => {
  return (
    <Wrapper onClick={onClick} {...rest}>
      <Image
        type={device.type}
        size={DeviceImageSize.Big}
        color={device.color}
      />
      <Info>
        <Name>{name}</Name>
        {Boolean(serialNumber) && (
          <SerialNumber>
            <p>{formatMessage(messages.serialNumberLabel)}</p>
            <p>{serialNumber}</p>
          </SerialNumber>
        )}
      </Info>
      {recoveryMode && (
        <RecoveryLabel>
          <Icon type={IconType.RecoveryMode} size={IconSize.AutoMax} />
          <p>{formatMessage(messages.recoveryModeLabel)}</p>
        </RecoveryLabel>
      )}
    </Wrapper>
  )
}

const Wrapper = styled(DevicesDrawerCardWrapper)`
  flex: 1;
  display: grid;
  align-content: space-between;
  justify-content: center;
  grid-template-columns: 19.5rem;
  grid-template-rows: 25rem 7.3rem;
  gap: 0;
  border-color: ${({ theme }) => theme.app.color.grey5};
  padding-top: 4.4rem;
  padding-bottom: 2.2rem;

  &:hover {
    border-color: ${({ theme }) => theme.app.color.grey4};
  }

  ${Info} {
    gap: 0;
    height: 100%;
    justify-content: space-between;
  }

  ${Name} {
    text-align: center;
  }

  ${SerialNumber} {
    text-align: center;

    p {
      &:first-child {
        font-weight: ${({ theme }) => theme.app.fontWeight.light};
      }
      &:last-child {
        font-weight: ${({ theme }) => theme.app.fontWeight.regular};
      }
    }
  }
`

const Image = styled(DeviceImage)`
  align-self: end;
  object-position: center bottom;
`
