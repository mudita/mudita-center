/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { DeviceStatus } from "devices/common/models"
import { IconSize, IconType } from "app-theme/models"
import styled from "styled-components"
import { Icon } from "app-theme/ui"

interface Props {
  status?: DeviceStatus
}

export const DeviceStatusIcon: FunctionComponent<Props> = ({ status }) => {
  if (status === DeviceStatus.CriticalError) {
    return <ErrorIcon type={IconType.Error} size={IconSize.Big} />
  }
  if (status === DeviceStatus.Issue) {
    return <WarningIcon type={IconType.Info} size={IconSize.Big} />
  }
  if (status === DeviceStatus.Locked) {
    return <Icon type={IconType.Lock} size={IconSize.Big} />
  }
  if (status !== DeviceStatus.Initialized) {
    return <Icon type={IconType.Spinner} size={IconSize.Big} />
  }
  return null
}

const ErrorIcon = styled(Icon)`
  color: ${({ theme }) => theme.app.color.red};
`

const WarningIcon = styled(Icon)`
  color: ${({ theme }) => theme.app.color.orange};
`
