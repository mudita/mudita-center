/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import { useSelector } from "react-redux"
import { selectActiveDeviceConfiguration } from "generic-view/store"

export const SummaryDeviceVersion: FunctionComponent = () => {
  const deviceConfig = useSelector(selectActiveDeviceConfiguration)
  return <>{deviceConfig?.apiConfig.deviceVersion}</>
}
