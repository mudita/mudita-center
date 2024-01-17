/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { AgreementModal } from "Core/eula-agreement/components/agreement-modal"
import { useWatchOnboardingStatus } from "Core/device-initialization/components/eula-agreement/use-watch-onboarding-status-effect"
import { getDevicesSelector } from "Core/device-manager/selectors/get-devices.selector"
import {
  URL_DISCOVERY_DEVICE,
  URL_MAIN,
} from "Core/__deprecated__/renderer/constants/urls"
import { deactivateDevice } from "Core/device-manager/actions/deactivate-device.action"
import { Dispatch } from "Core/__deprecated__/renderer/store"

const EULAAgreementContainer: FunctionComponent = () => {
  useWatchOnboardingStatus()
  const history = useHistory()
  const dispatch = useDispatch<Dispatch>()
  const devices = useSelector(getDevicesSelector)

  const handleActionButtonClick = async () => {
    await dispatch(deactivateDevice())
    history.push(URL_DISCOVERY_DEVICE.availableDeviceListModal)
  }
  const handleCloseModal = async () => {
    await dispatch(deactivateDevice())
    if (devices.length > 1) {
      history.push(URL_DISCOVERY_DEVICE.availableDeviceListModal)
    } else {
      history.push(URL_MAIN.news)
    }
  }

  return (
    <>
      {devices.length > 1 ? (
        <AgreementModal
          open
          onActionButtonClick={handleActionButtonClick}
          closeModal={handleCloseModal}
        />
      ) : (
        <AgreementModal open closeModal={handleCloseModal} />
      )}
    </>
  )
}

export default EULAAgreementContainer
