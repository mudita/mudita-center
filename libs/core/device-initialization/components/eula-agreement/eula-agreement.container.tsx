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
import { URL_DISCOVERY_DEVICE } from "Core/__deprecated__/renderer/constants/urls"
import { deactivateDevice } from "Core/device-manager/actions/deactivate-device.action"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import { useHandleActiveDeviceAborted } from "Core/overview/components/overview-screens/pure-overview/use-handle-active-device-aborted.hook"

const EULAAgreementContainer: FunctionComponent = () => {
  useWatchOnboardingStatus()
  const history = useHistory()
  const dispatch = useDispatch<Dispatch>()
  const devices = useSelector(getDevicesSelector)
  const handleActiveDeviceAborted = useHandleActiveDeviceAborted()

  const handleActionButtonClick = async () => {
    await dispatch(deactivateDevice())
    history.push(URL_DISCOVERY_DEVICE.availableDeviceListModal)
  }

  return (
    <>
      {devices.length > 1 ? (
        <AgreementModal
          open
          onActionButtonClick={handleActionButtonClick}
          closeModal={handleActiveDeviceAborted}
        />
      ) : (
        <AgreementModal open closeModal={handleActiveDeviceAborted} />
      )}
    </>
  )
}

export default EULAAgreementContainer
