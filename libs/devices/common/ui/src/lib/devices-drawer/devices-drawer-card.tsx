/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ComponentProps, FunctionComponent } from "react"
import styled from "styled-components"
import { defineMessages, formatMessage } from "app-localize/utils"
import { Icon, Typography } from "app-theme/ui"
import { IconSize, IconType } from "app-theme/models"
import {
  DeviceImageSize,
  DeviceMetadata,
  DeviceStatus,
} from "devices/common/models"
import { DeviceImage } from "../device-image/device-image"
import { DeviceStatusIcon } from "./device-status-icon"

const messages = defineMessages({
  serialNumberLabel: { id: "general.components.deviceCard.serialNumberLabel" },
  recoveryModeLabel: { id: "general.components.deviceCard.recoveryModeLabel" },
  activeLabel: { id: "general.components.deviceCard.activeLabel" },
})

export interface DrawerItemProps
  extends Omit<DeviceMetadata, "id">,
    ComponentProps<typeof DevicesDrawerCardWrapper> {
  active?: boolean
  locked?: boolean
  onClick?: VoidFunction
  status?: DeviceStatus
}

export const DevicesDrawerCard: FunctionComponent<DrawerItemProps> = ({
  image,
  name,
  serialNumber,
  active,
  recoveryMode,
  onClick,
  status,
  ...rest
}) => {
  const isClickable = !active || status !== DeviceStatus.Initialized
  return (
    <DevicesDrawerCardWrapper
      onClick={isClickable ? onClick : undefined}
      {...rest}
    >
      <DeviceImage
        type={image.type}
        size={DeviceImageSize.Small}
        color={image.color}
      />
      <Info>
        <DeviceName forwardedAs={"p"}>
          {name}
          {active && (
            <ActiveIndicator>
              &nbsp;{formatMessage(messages.activeLabel)}
            </ActiveIndicator>
          )}
        </DeviceName>
        {Boolean(serialNumber) && (
          <div>
            <Typography.P3 message={messages.serialNumberLabel.id} />
            <Typography.H5 as={"p"}>{serialNumber}</Typography.H5>
          </div>
        )}
      </Info>
      {recoveryMode && (
        <RecoveryLabel>
          <Icon type={IconType.RecoveryModeFilled} size={IconSize.AutoMax} />
          <Typography.P5 color={"white"}>
            <strong>{formatMessage(messages.recoveryModeLabel)}</strong>
          </Typography.P5>
        </RecoveryLabel>
      )}
      <GeneralStatus>
        <DeviceStatusIcon status={status} />
      </GeneralStatus>
    </DevicesDrawerCardWrapper>
  )
}

const ActiveIndicator = styled.span`
  text-transform: uppercase;
`

const GeneralStatus = styled.span`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding-right: 1rem;
`

const DeviceName = styled(Typography.H4)`
  display: flex;
  flex-direction: row;
  align-items: center;
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
    white-space: nowrap;
  }
`
