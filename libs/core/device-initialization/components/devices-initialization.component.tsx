/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import ConnectingContent from "Core/connecting/components/connecting-content.component"
import { URL_ONBOARDING } from "Core/__deprecated__/renderer/constants/urls"
import {
  getActiveDevice,
  isActiveDeviceFailedSelector,
} from "device-manager/feature"
import { DeviceBaseProperties, DeviceType } from "device-protocol/models"
import { MuditaPureInitializationModalFlow } from "Core/device-initialization/components/devices-initialization-modal-flows/mudita-pure-initialization-modal-flow"
import { MuditaHarmonyInitializationModalFlow } from "Core/device-initialization/components/devices-initialization-modal-flows/mudita-harmony-initialization-modal-flow"
import { APIDeviceInitializationModalFlow } from "Core/device-initialization/components/devices-initialization-modal-flows/api-device-initialization-modal-flow"

const DevicesInitializationModalFlow: FunctionComponent<{
  activeDevice?: DeviceBaseProperties
}> = ({ activeDevice }) => {
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
  const history = useHistory()
  const activeDevice = useSelector(getActiveDevice)
  const activeDeviceFailedSelector = useSelector(isActiveDeviceFailedSelector)

  useEffect(() => {
    if (activeDeviceFailedSelector) {
      history.push(URL_ONBOARDING.troubleshooting)
    }
  }, [activeDeviceFailedSelector, history])

  return (
    <>
      <DevicesInitializationModalFlow activeDevice={activeDevice} />
      {activeDevice?.deviceType !== DeviceType.APIDevice && (
        <ConnectingContent />
      )}
    </>
  )
}

export default DevicesInitialization
