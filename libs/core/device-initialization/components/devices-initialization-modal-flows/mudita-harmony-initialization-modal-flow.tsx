/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect } from "react"
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import { deviceStatusSelector } from "Core/device/selectors/device-status.selector"
import { handleInitializeDevice } from "Core/device-initialization/components/devices-initialization-modal-flows/handle-initialize-device.helper"
import { initializeMuditaHarmony } from "Core/device-initialization/actions/initialize-mudita-harmony.action"
import CriticalBatteryLevelModalContainer from "Core/device-initialization/components/critical-battery-level-modal.container"
import EULAAgreementContainer from "Core/device-initialization/components/eula-agreement/eula-agreement.container"

export const MuditaHarmonyInitializationModalFlow: FunctionComponent = () => {
  console.log("MuditaHarmonyInitializationModalFlow")
  const history = useHistory()
  const dispatch = useDispatch<Dispatch>()
  const deviceStatus = useSelector(deviceStatusSelector)

  useEffect(() => {
    console.log("MuditaHarmonyInitializationModalFlow handleInitializeDevice")
    void handleInitializeDevice(dispatch, initializeMuditaHarmony, history)
  }, [history, dispatch])

  if (deviceStatus?.criticalBatteryLevel) {
    return <CriticalBatteryLevelModalContainer />
  }

  if (deviceStatus?.onboardingFinished === false) {
    return <EULAAgreementContainer />
  }

  //new place for usb-access?

  return <></>
}
