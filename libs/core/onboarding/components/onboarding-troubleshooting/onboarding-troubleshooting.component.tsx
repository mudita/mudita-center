/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useCallback } from "react"
import { useHistory } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { URL_DISCOVERY_DEVICE } from "Core/__deprecated__/renderer/constants/urls"
import OnboardingTroubleshootingUI from "Core/onboarding/components/onboarding-troubleshooting/onboarding-troubleshooting-ui.component"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { TmpDispatch } from "Core/__deprecated__/renderer/store"
import { ModalStateKey, showModal } from "Core/modals-manager"
import { getDevicesSelector } from "Core/device-manager/selectors/get-devices.selector"

const OnboardingTroubleshooting: FunctionComponent = () => {
  const history = useHistory()
  const dispatch = useDispatch<TmpDispatch>()
  const devices = useSelector(getDevicesSelector)

  const handleRetryButtonClick = useCallback(() => {
    history.push(URL_DISCOVERY_DEVICE.deviceConnecting)
  }, [history])

  const handleContactButtonClick = useCallback(() => {
    dispatch(showModal(ModalStateKey.ContactSupportFlow))
  }, [dispatch])

  const onChangeDeviceButtonClick = useCallback(() => {
    history.push(URL_DISCOVERY_DEVICE.availableDeviceListModal)
  }, [history])

  return (
    <OnboardingTroubleshootingUI
      onRetryButtonClick={handleRetryButtonClick}
      onContactButtonClick={handleContactButtonClick}
      onChangeDeviceButtonClick={onChangeDeviceButtonClick}
      changeDeviceButtonVisible={devices.length > 1}
    />
  )
}

export default OnboardingTroubleshooting
