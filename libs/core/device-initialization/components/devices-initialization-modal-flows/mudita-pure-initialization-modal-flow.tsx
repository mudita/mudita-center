/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect, useRef } from "react"
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import { deviceStatusSelector } from "Core/device/selectors/device-status.selector"
import { handleInitializeDevice } from "Core/device-initialization/components/devices-initialization-modal-flows/handle-initialize-device.helper"
import { initializeMuditaPure } from "Core/device-initialization/actions/initialize-mudita-pure.action"
import CriticalBatteryLevelModalContainer from "Core/device-initialization/components/critical-battery-level-modal.container"
import EULAAgreementContainer from "Core/device-initialization/components/eula-agreement/eula-agreement.container"
import PasscodeModalContainer from "Core/device-initialization/components/passcode-modal/passcode-modal.container"

export const MuditaPureInitializationModalFlow: FunctionComponent = () => {
  const history = useHistory()
  const dispatch = useDispatch<Dispatch>()
  const deviceStatus = useSelector(deviceStatusSelector)

  const previousUnlockedStatus = useRef(deviceStatus?.unlocked)

  useEffect(() => {
    console.log("MuditaPureInitializationModalFlow handleInitializeDevice 1")
    void handleInitializeDevice(dispatch, initializeMuditaPure, history)
  }, [history, dispatch])

  useEffect(() => {
    // continue initializing process when device unlocked
    if (
      previousUnlockedStatus.current === false &&
      deviceStatus?.unlocked === true
    ) {
      console.log("MuditaPureInitializationModalFlow handleInitializeDevice 2")
      void handleInitializeDevice(dispatch, initializeMuditaPure, history)
    }

    previousUnlockedStatus.current = deviceStatus?.unlocked
  }, [deviceStatus?.unlocked, history, dispatch])

  const previousOnboardingStatus = useRef(deviceStatus?.onboardingFinished)

  useEffect(() => {
    // continue initializing process when onboarding is finished
    if (
      previousOnboardingStatus.current === false &&
      deviceStatus?.onboardingFinished === true
    ) {
      console.log("MuditaPureInitializationModalFlow handleInitializeDevice 3")
      void handleInitializeDevice(dispatch, initializeMuditaPure, history)
    }

    previousOnboardingStatus.current = deviceStatus?.onboardingFinished
  }, [deviceStatus?.onboardingFinished, history, dispatch])

  if (deviceStatus?.criticalBatteryLevel) {
    return <CriticalBatteryLevelModalContainer />
  }

  if (deviceStatus?.onboardingFinished === false) {
    return <EULAAgreementContainer />
  }

  if (deviceStatus?.unlocked === false) {
    return <PasscodeModalContainer />
  }

  //usb-access?

  return <></>
}
