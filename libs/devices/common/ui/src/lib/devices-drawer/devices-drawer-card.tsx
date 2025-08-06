/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ComponentProps, FunctionComponent } from "react"
import styled from "styled-components"
import { defineMessages } from "app-localize/utils"
import { Typography } from "app-theme/ui"
import {
  DeviceImageSize,
  DeviceMetadata,
  DeviceStatus,
} from "devices/common/models"
import { DeviceImage } from "../device-image/device-image"
import { DeviceHeader } from "../devices-header/device-header"

const messages = defineMessages({
  serialNumberLabel: { id: "general.components.deviceCard.serialNumberLabel" },
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
        spinner={status === DeviceStatus.Initializing}
        type={image.type}
        size={DeviceImageSize.Small}
        color={image.color}
      />
      <Info>
        <DeviceHeader
          name={name}
          status={status}
          active={active}
          recoveryMode={recoveryMode}
        />
        {Boolean(serialNumber) && (
          <div>
            <Typography.P3 message={messages.serialNumberLabel.id} />
            <Typography.H5 as={"p"}>{serialNumber}</Typography.H5>
          </div>
        )}
      </Info>
    </DevicesDrawerCardWrapper>
  )
}

const ActiveIndicator = styled.span`
  text-transform: uppercase;
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
