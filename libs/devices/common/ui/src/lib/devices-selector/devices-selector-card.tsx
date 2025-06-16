/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ComponentProps, FunctionComponent } from "react"
import {
  DeviceImageSize,
  DeviceMetadata,
  DeviceStatus,
} from "devices/common/models"
import {
  DevicesDrawerCardWrapper,
  Info,
  RecoveryLabel,
} from "../devices-drawer/devices-drawer-card"
import { DeviceImage } from "../device-image/device-image"
import { defineMessages, formatMessage } from "app-localize/utils"
import { Icon, Typography } from "app-theme/ui"
import { IconSize, IconType, TypographyAlign } from "app-theme/models"
import styled from "styled-components"
import { DeviceStatusIcon } from "../devices-drawer/device-status-icon"

const messages = defineMessages({
  serialNumberLabel: { id: "general.components.deviceCard.serialNumberLabel" },
  recoveryModeLabel: { id: "general.components.deviceCard.recoveryModeLabel" },
})

export interface SelectorItemProps
  extends Omit<DeviceMetadata, "id">,
    ComponentProps<typeof Wrapper> {
  onClick?: VoidFunction
  status?: DeviceStatus
}

export const DevicesSelectorCard: FunctionComponent<SelectorItemProps> = ({
  image,
  name,
  serialNumber,
  recoveryMode,
  status,
  onClick,
  ...rest
}) => {
  return (
    <Wrapper onClick={onClick} {...rest}>
      <Status>
        <DeviceStatusIcon status={status} />
      </Status>
      <Image type={image.type} size={DeviceImageSize.Big} color={image.color} />
      <Info>
        <DeviceName forwardedAs={"p"} textAlign={TypographyAlign.Center}>
          {name}
        </DeviceName>
        {Boolean(serialNumber) && (
          <div>
            <Typography.P4
              message={messages.serialNumberLabel.id}
              textAlign={TypographyAlign.Center}
            />
            <Typography.P3 textAlign={TypographyAlign.Center} color={"black"}>
              {serialNumber}
            </Typography.P3>
          </div>
        )}
      </Info>
      {recoveryMode && (
        <RecoveryLabel>
          <Icon type={IconType.RecoveryMode} size={IconSize.AutoMax} />
          <Typography.P5 color={"white"}>
            <strong>{formatMessage(messages.recoveryModeLabel)}</strong>
          </Typography.P5>
        </RecoveryLabel>
      )}
    </Wrapper>
  )
}

const Wrapper = styled(DevicesDrawerCardWrapper)`
  position: relative;
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
`

const Image = styled(DeviceImage)`
  align-self: end;
  object-position: center bottom;
`

const DeviceName = styled(Typography.H4)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const Status = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
`
