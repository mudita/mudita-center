/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import PasscodeModal, {
  UnlockDeviceReturnType,
} from "Core/device-initialization/components/passcode-modal/passcode-modal.component"
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import { setDeviceInitializationStatus } from "Core/device-initialization/actions/base.action"
import { DeviceInitializationStatus } from "Core/device-initialization/reducers/device-initialization.interface"
import { URL_MAIN } from "Core/__deprecated__/renderer/constants/urls"
import { getLeftTimeSelector } from "Core/device/selectors"
import { isPasscodeModalCanBeClosedSelector } from "Core/device-initialization/selectors/is-passcode-modal-can-be-closed.selector"
import { setInitState, unlockDevice } from "Core/device/actions"
import { useWatchLockTimeEffect } from "Core/device-initialization/components/passcode-modal/use-watch-lock-time-effect"
import { useWatchUnlockStatus } from "Core/device-initialization/components/passcode-modal/use-watch-unlock-status-effect"
import { setDataSyncInitState } from "Core/data-sync/actions"

const PasscodeModalContainer: FunctionComponent = () => {
  useWatchLockTimeEffect()
  useWatchUnlockStatus()
  const history = useHistory()
  const dispatch = useDispatch<Dispatch>()
  const leftTime = useSelector(getLeftTimeSelector)
  const canBeClosed = useSelector(isPasscodeModalCanBeClosedSelector)

  const handleClose = () => {
    dispatch(setDeviceInitializationStatus(DeviceInitializationStatus.Aborted))
    dispatch(setDataSyncInitState())
    dispatch(setInitState())
    history.push(URL_MAIN.news)
  }
  const handleUnlockDevice = (code: number[]): UnlockDeviceReturnType => {
    return dispatch(unlockDevice(code)) as unknown as UnlockDeviceReturnType
  }

  return (
    <PasscodeModal
      openModal
      close={handleClose}
      leftTime={leftTime}
      unlockDevice={handleUnlockDevice}
      canBeClosed={canBeClosed}
    />
  )
}

export default PasscodeModalContainer
