/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { useSelector } from "react-redux"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import ConnectingContent from "Core/connecting/components/connecting-content.component"
import { getActiveDevice } from "Core/device-manager/selectors/get-active-device.selector"
import { DeviceType } from "Core/device"
import { MuditaPureInitializationModalFlow } from "Core/device-initialization/components/devices-initialization-modal-flows/mudita-pure-initialization-modal-flow"
import { MuditaHarmonyInitializationModalFlow } from "Core/device-initialization/components/devices-initialization-modal-flows/mudita-harmony-initialization-modal-flow"
import { APIDeviceInitializationModalFlow } from "Core/device-initialization/components/devices-initialization-modal-flows/api-device-initialization-modal-flow"

const DevicesInitializationModalFlow: FunctionComponent = () => {
  const activeDevice = useSelector(getActiveDevice)

  if (activeDevice?.deviceType === DeviceType.MuditaPure) {
    return <MuditaPureInitializationModalFlow />
  } else if (activeDevice?.deviceType === DeviceType.MuditaHarmony) {
    return <MuditaHarmonyInitializationModalFlow />
  } else if (activeDevice?.deviceType === DeviceType.APIDevice) {
    return <APIDeviceInitializationModalFlow />
  } else {
    return <></>
  }
}

const DevicesInitialization: FunctionComponent = () => {
  return (
    <>
      <DevicesInitializationModalFlow />
      <ConnectingContent />
    </>
  )
}

export default DevicesInitialization
