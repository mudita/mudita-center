/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { useSelector } from "react-redux"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { VisibleOnDeviceProps } from "Core/ui/components/visible-on-device/visible-on-device.interface"

export const VisibleOnDevice: FunctionComponent<VisibleOnDeviceProps> = ({
  devices,
  children,
}) => {
  const deviceType = useSelector(
    (state: ReduxRootState) => state.device.deviceType
  )

  if (!deviceType || !devices.includes(deviceType)) {
    return <></>
  }

  return <>{children}</>
}
