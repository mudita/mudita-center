/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import CriticalBatteryLevelModal from "Core/connecting/components/critical-battery-level-modal/critical-battery-level-modal"
import { useHandleActiveDeviceAborted } from "Core/overview/components/overview-screens/pure-overview/use-handle-active-device-aborted.hook"

const CriticalBatteryLevelModalContainer: FunctionComponent = () => {
  const handleActiveDeviceAborted = useHandleActiveDeviceAborted()

  return (
    <CriticalBatteryLevelModal open closeModal={handleActiveDeviceAborted} />
  )
}

export default CriticalBatteryLevelModalContainer
