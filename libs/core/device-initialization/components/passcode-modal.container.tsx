/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import PasscodeModal from "Core/__deprecated__/passcode-modal/components/passcode-modal.component"
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import { setDeviceInitializationStatus } from "Core/device-initialization/actions/base.action"
import { DeviceInitializationStatus } from "Core/device-initialization/reducers/device-initialization.interface"
import { URL_MAIN } from "Core/__deprecated__/renderer/constants/urls"
import { getLeftTimeSelector } from "Core/device/selectors"
import { isPasscodeModalCanBeClosedSelector } from "Core/device-initialization/selectors/is-passcode-modal-can-be-closed.selector"
import { unlockDevice } from "Core/device/actions"
import { PayloadAction } from "@reduxjs/toolkit"
import { AppError } from "Core/core/errors"

const PasscodeModalContainer: FunctionComponent = () => {
  const history = useHistory()
  const dispatch = useDispatch<Dispatch>()
  const leftTime = useSelector(getLeftTimeSelector)
  const canBeClosed = useSelector(isPasscodeModalCanBeClosedSelector)

  const handleClose = () => {
    dispatch(setDeviceInitializationStatus(DeviceInitializationStatus.Aborted))
    history.push(URL_MAIN.news)
  }

  return (
    <PasscodeModal
      openModal
      close={handleClose}
      leftTime={leftTime}
      unlockDevice={(code) =>
        dispatch(unlockDevice(code)) as unknown as Promise<
          PayloadAction<boolean, string, unknown, AppError>
        >
      }
      canBeClosed={canBeClosed}
    />
  )
}

export default PasscodeModalContainer
