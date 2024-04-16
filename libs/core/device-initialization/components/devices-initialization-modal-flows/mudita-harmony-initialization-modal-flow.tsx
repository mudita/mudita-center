/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { deviceStatusSelector } from "Core/device/selectors/device-status.selector"
import { useDeviceInitializer } from "Core/device-initialization/components/devices-initialization-modal-flows/handle-initialize-device.helper"
import { initializeMuditaHarmony } from "Core/device-initialization/actions/initialize-mudita-harmony.action"
import CriticalBatteryLevelModalContainer from "Core/device-initialization/components/critical-battery-level-modal.container"
import EULAAgreementContainer from "Core/device-initialization/components/eula-agreement/eula-agreement.container"

export const MuditaHarmonyInitializationModalFlow: FunctionComponent = () => {
  const deviceStatus = useSelector(deviceStatusSelector)

  const initializeDevice = useDeviceInitializer(initializeMuditaHarmony)

  useEffect(() => {
    void initializeDevice()
  }, [initializeDevice])

  if (deviceStatus?.criticalBatteryLevel) {
    return <CriticalBatteryLevelModalContainer />
  }

  if (deviceStatus?.onboardingFinished === false) {
    return <EULAAgreementContainer />
  }

  return <></>
}
