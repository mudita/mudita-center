/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import ConnectingContent from "Core/connecting/components/connecting-content.component"
import { startInitializingDevice } from "Core/device-initialization/actions/start-initializing-device"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import { deviceStatusSelector } from "Core/device/selectors/device-status.selector"
import CriticalBatteryLevelModalContainer from "Core/device-initialization/components/critical-battery-level-modal.container"
import PasscodeModalContainer from "Core/device-initialization/components/passcode-modal.container"
import EULAAgreementContainer from "Core/device-initialization/components/eula-agreement.container"
import { getActiveDevice } from "Core/device-manager/selectors/get-active-device.selector"

const DevicesInitializationModalFlow: FunctionComponent = () => {
  const deviceStatus = useSelector(deviceStatusSelector)
  const activeDevice = useSelector(getActiveDevice)

  if (deviceStatus?.criticalBatteryLevel) {
    return <CriticalBatteryLevelModalContainer />
  }

  if (activeDevice?.initializationOptions.passcode && !deviceStatus?.unlocked) {
    return <PasscodeModalContainer />
  }

  if (!deviceStatus?.onboardingFinished) {
    return <EULAAgreementContainer />
  }

  return <></>
}

const DevicesInitialization: FunctionComponent = () => {
  const history = useHistory()
  const dispatch = useDispatch<Dispatch>()

  useEffect(() => {
    dispatch(startInitializingDevice(history))
  }, [history, dispatch])

  return (
    <>
      <DevicesInitializationModalFlow />
      <ConnectingContent />
    </>
  )
}

export default DevicesInitialization
