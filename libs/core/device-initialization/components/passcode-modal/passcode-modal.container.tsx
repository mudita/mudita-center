/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import PasscodeModal, {
  UnlockDeviceReturnType,
} from "Core/device-initialization/components/passcode-modal/passcode-modal.component"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import { getLeftTimeSelector } from "Core/device/selectors"
import { isPasscodeModalCanBeClosedSelector } from "Core/device-initialization/selectors/is-passcode-modal-can-be-closed.selector"
import { unlockDevice } from "Core/device/actions"
import { useWatchLockTimeEffect } from "Core/device-initialization/components/passcode-modal/use-watch-lock-time-effect"
import { useWatchUnlockStatus } from "Core/device-initialization/components/passcode-modal/use-watch-unlock-status-effect"
import modalService from "Core/__deprecated__/renderer/components/core/modal/modal.service"
import { useHandleActiveDeviceAborted } from "device-manager/feature"

const PasscodeModalContainer: FunctionComponent = () => {
  useWatchLockTimeEffect()
  useWatchUnlockStatus()
  const dispatch = useDispatch<Dispatch>()
  const leftTime = useSelector(getLeftTimeSelector)
  const canBeClosed = useSelector(isPasscodeModalCanBeClosedSelector)
  const handleActiveDeviceAborted = useHandleActiveDeviceAborted()

  const handleUnlockDevice = (code: number[]): UnlockDeviceReturnType => {
    return dispatch(unlockDevice(code)) as unknown as UnlockDeviceReturnType
  }

  useEffect(() => {
    // handle closing contact import failure modal
    void modalService.closeModal(true)
  }, [])

  return (
    <PasscodeModal
      openModal
      close={handleActiveDeviceAborted}
      leftTime={leftTime}
      unlockDevice={handleUnlockDevice}
      canBeClosed={canBeClosed}
    />
  )
}

export default PasscodeModalContainer
