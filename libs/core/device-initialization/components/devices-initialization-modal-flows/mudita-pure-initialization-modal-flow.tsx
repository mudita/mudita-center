/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import { FunctionComponent } from "Core/core/types/function-component.interface"

import { deviceStatusSelector } from "Core/device/selectors/device-status.selector"
import { useDeviceInitializer } from "Core/device-initialization/components/devices-initialization-modal-flows/handle-initialize-device.helper"
import { initializeMuditaPure } from "Core/device-initialization/actions/initialize-mudita-pure.action"
import CriticalBatteryLevelModalContainer from "Core/device-initialization/components/critical-battery-level-modal.container"
import EULAAgreementContainer from "Core/device-initialization/components/eula-agreement/eula-agreement.container"
import PasscodeModalContainer from "Core/device-initialization/components/passcode-modal/passcode-modal.container"

export const MuditaPureInitializationModalFlow: FunctionComponent = () => {
  const deviceStatus = useSelector(deviceStatusSelector)

  const previousUnlockedStatus = useRef(deviceStatus?.unlocked)
  const initializeDevice = useDeviceInitializer(initializeMuditaPure)

  useEffect(() => {
    void initializeDevice()
  }, [initializeDevice])

  useEffect(() => {
    // continue initializing process when device unlocked
    if (
      previousUnlockedStatus.current === false &&
      deviceStatus?.unlocked === true
    ) {
      void initializeDevice()
    }

    previousUnlockedStatus.current = deviceStatus?.unlocked
  }, [initializeDevice, deviceStatus?.unlocked])

  const previousOnboardingStatus = useRef(deviceStatus?.onboardingFinished)

  useEffect(() => {
    // continue initializing process when onboarding is finished
    if (
      previousOnboardingStatus.current === false &&
      deviceStatus?.onboardingFinished === true
    ) {
      void initializeDevice()
    }

    previousOnboardingStatus.current = deviceStatus?.onboardingFinished
  }, [initializeDevice, deviceStatus?.onboardingFinished])

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
