/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import styled from "styled-components"
import { Typography } from "app-theme/ui"
import { DeviceStatus } from "devices/common/models"
import { DeviceGeneralStatus } from "./device-general-status"

export interface DeviceHeaderProps {
  name?: string
  status?: DeviceStatus
  active?: boolean
  recoveryMode?: boolean
  className?: string
}

export const DeviceHeader: FunctionComponent<DeviceHeaderProps> = ({
  name,
  status,
  active,
  recoveryMode,
  ...props
}) => {
  return (
    <Wrapper {...props}>
      <DeviceName forwardedAs={"p"}>{name}</DeviceName>
      <DeviceGeneralStatus
        status={status}
        active={active}
        recoveryMode={recoveryMode}
      />
    </Wrapper>
  )
}

const Wrapper = styled.span`
  flex: 1;
  display: flex;
  flex-direction: row;
  gap: 0.8rem;
`

const DeviceName = styled(Typography.H4)`
  display: flex;
  flex-direction: row;
  align-items: center;
`
