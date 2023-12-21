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
import { isInitializationDeviceInProgress } from "Core/device-initialization/selectors/is-passcode-modal-can-be-closed.selector"
import { PayloadAction } from "@reduxjs/toolkit"
import { AppError } from "Core/core/errors"

const PasscodeModalContainer: FunctionComponent = () => {
  const history = useHistory()
  const dispatch = useDispatch<Dispatch>()
  const leftTime = useSelector(getLeftTimeSelector)
  const canBeClosed = useSelector(isInitializationDeviceInProgress)

  const handleClose = () => {
    dispatch(setDeviceInitializationStatus(DeviceInitializationStatus.Aborted))
    history.push(URL_MAIN.news)
  }

  const handleUnlockDevice = (
    code: number[]
  ): Promise<PayloadAction<boolean>> => {
    // TODO: handleUnlockDevice
    return Promise.resolve({}) as Promise<PayloadAction<boolean>>
  }
  const handleGetUnlockStatus = (): Promise<
    PayloadAction<boolean | AppError>
  > => {
    // TODO: handleGetUnlockStatus
    return Promise.resolve({}) as Promise<PayloadAction<boolean | AppError>>
  }

  return (
    <PasscodeModal
      openModal
      close={handleClose}
      leftTime={leftTime}
      unlockDevice={handleUnlockDevice}
      getUnlockStatus={handleGetUnlockStatus}
      canBeClosed={canBeClosed}
    />
  )
}

export default PasscodeModalContainer
