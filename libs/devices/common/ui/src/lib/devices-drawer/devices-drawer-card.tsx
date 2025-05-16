/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ComponentProps, FunctionComponent } from "react"
import styled from "styled-components"
import { defineMessages, formatMessage } from "app-localize/utils"
import { Icon } from "app-theme/ui"
import { IconSize, IconType } from "app-theme/models"
import {
  DeviceImageColor,
  DeviceImageSize,
  DeviceImageType,
} from "devices/common/models"
import { DeviceImage } from "../device-image/device-image"

const messages = defineMessages({
  serialNumberLabel: { id: "general.components.deviceCard.serialNumberLabel" },
  recoveryModeLabel: { id: "general.components.deviceCard.recoveryModeLabel" },
})

export interface DrawerCardDevice {
  name: string
  device: {
    type: DeviceImageType
    color?: DeviceImageColor
  }
  serialNumber?: string
  recoveryMode?: boolean
}

export interface DrawerItemProps
  extends DrawerCardDevice,
    ComponentProps<typeof DevicesDrawerCardWrapper> {
  active?: boolean
  onClick?: VoidFunction
}

export const DevicesDrawerCard: FunctionComponent<DrawerItemProps> = ({
  device,
  name,
  serialNumber,
  active,
  recoveryMode,
  onClick,
  ...rest
}) => {
  return (
    <DevicesDrawerCardWrapper onClick={active ? undefined : onClick} {...rest}>
      <DeviceImage
        type={device.type}
        size={DeviceImageSize.Small}
        color={device.color}
      />
      <Info>
        <Name>
          {name} {active && <ActiveIndicator aria-label={"Active device"} />}
        </Name>
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
    </DevicesDrawerCardWrapper>
  )
}

const ActiveIndicator = styled.span`
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.app.color.black};
  vertical-align: top;
`

export const DevicesDrawerCardWrapper = styled.li<{ onClick?: VoidFunction }>`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.8rem;
  padding: 1.7rem 1rem;
  border-radius: ${({ theme }) => theme.app.radius.sm};
  border: 0.1rem solid transparent;
  cursor: ${({ onClick }) => (onClick ? "pointer" : "default")};
  transition-property: background-color, border-color;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.app.color.grey6};
  }

  &:has(${ActiveIndicator}) {
    background-color: ${({ theme }) => theme.app.color.grey6};
    border-color: ${({ theme }) => theme.app.color.grey4};
  }
`

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  align-self: center;
`

export const Name = styled.p`
  font-size: ${({ theme }) => theme.app.fontSize.headline4};
  line-height: ${({ theme }) => theme.app.lineHeight.headline4};
  font-weight: ${({ theme }) => theme.app.fontWeight.bold};
  letter-spacing: 0.02em;
  margin: 0;
`

export const SerialNumber = styled.div`
  grid-area: SerialNumber;

  p {
    margin: 0;

    &:first-child {
      font-size: ${({ theme }) => theme.app.fontSize.paragraph3};
      line-height: ${({ theme }) => theme.app.lineHeight.paragraph3};
      font-weight: ${({ theme }) => theme.app.fontWeight.regular};
      color: ${({ theme }) => theme.app.color.grey2};
      letter-spacing: 0.05em;
    }

    &:last-child {
      font-size: ${({ theme }) => theme.app.fontSize.headline5};
      line-height: ${({ theme }) => theme.app.lineHeight.headline5};
      font-weight: ${({ theme }) => theme.app.fontWeight.bold};
      letter-spacing: 0.04em;
    }
  }
`

export const RecoveryLabel = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 0 0.8rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 2.2rem;
  gap: 0.4rem;
  border-radius: ${({ theme }) => theme.app.radius.sm};
  background-color: ${({ theme }) => theme.app.color.black};
  color: ${({ theme }) => theme.app.color.white};

  p {
    margin: 0;
    font-size: ${({ theme }) => theme.app.fontSize.labelText};
    line-height: ${({ theme }) => theme.app.lineHeight.labelText};
    font-weight: ${({ theme }) => theme.app.fontWeight.bold};
    white-space: nowrap;
  }
`
