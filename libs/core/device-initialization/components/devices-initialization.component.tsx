/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect, useRef } from "react"
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
import { DeviceType } from "Core/device"

const MuditaHarmonyInitializationModalFlow: FunctionComponent = () => {
  const deviceStatus = useSelector(deviceStatusSelector)

  if (deviceStatus?.criticalBatteryLevel) {
    return <CriticalBatteryLevelModalContainer />
  }

  if (deviceStatus?.onboardingFinished === false) {
    return <EULAAgreementContainer />
  }

  return <></>
}

const MuditaPureInitializationModalFlow: FunctionComponent = () => {
  const history = useHistory()
  const dispatch = useDispatch<Dispatch>()
  const deviceStatus = useSelector(deviceStatusSelector)

  const previousUnlockedStatus = useRef(deviceStatus?.unlocked)

  useEffect(() => {
    // continue initializing process when device unlocked
    if (
      previousUnlockedStatus.current === false &&
      deviceStatus?.unlocked === true
    ) {
      dispatch(startInitializingDevice(history))
    }

    previousUnlockedStatus.current = deviceStatus?.unlocked
  }, [deviceStatus?.unlocked, history, dispatch])

  if (deviceStatus?.criticalBatteryLevel) {
    return <CriticalBatteryLevelModalContainer />
  }

  if (deviceStatus?.onboardingFinished === false) {
    return <EULAAgreementContainer />
  }

  if (deviceStatus?.unlocked === false) {
    return <PasscodeModalContainer />
  }

  return <></>
}

const DevicesInitializationModalFlow: FunctionComponent = () => {
  const activeDevice = useSelector(getActiveDevice)

  if (activeDevice?.deviceType === DeviceType.MuditaPure) {
    return <MuditaPureInitializationModalFlow />
  } else if (activeDevice?.deviceType === DeviceType.MuditaHarmony) {
    return <MuditaHarmonyInitializationModalFlow />
  } else {
    return <></>
  }
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
