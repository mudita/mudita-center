/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect, useState } from "react"
import { PayloadAction } from "@reduxjs/toolkit"
import { ipcRenderer } from "electron-better-ipc"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import PasscodeModalUI from "Core/device-initialization/components/passcode-modal/passcode-modal-ui.component"
import { HelpActions } from "Core/__deprecated__/common/enums/help-actions.enum"
import { AppError } from "Core/core/errors"
import { ModalDialogProps } from "Core/ui"
import { ModalLayers } from "Core/modals-manager/constants/modal-layers.enum"

export type UnlockDeviceReturnType = Promise<
  PayloadAction<boolean, string, unknown, AppError>
>

interface Props extends Omit<ModalDialogProps, "close" | "open"> {
  openModal: boolean
  close: () => void
  leftTime?: number
  unlockDevice: (code: number[]) => UnlockDeviceReturnType
  canBeClosed: boolean
}

export enum ErrorState {
  NoError = "no-error",
  TypingError = "typing-error",
  BadPasscode = "bad-passcode",
  InternalServerError = "internal-server-error",
}

export const ErrorMessageMap: Record<ErrorState, string> = {
  [ErrorState.NoError]: "",
  [ErrorState.TypingError]: "component.passcodeModalErrorTyping",
  [ErrorState.BadPasscode]: "component.passcodeModalError",
  [ErrorState.InternalServerError]: "component.passcodeModalTryAgain",
}

let timeoutId3: NodeJS.Timeout

const initValue = ["", "", "", ""]

const PasscodeModal: FunctionComponent<Props> = ({
  openModal,
  canBeClosed,
  close,
  leftTime,
  unlockDevice,
  ...rest
}) => {
  const [errorState, setErrorState] = useState<ErrorState>(ErrorState.NoError)
  const [values, setValues] = useState<string[]>(initValue)
  const openHelpWindow = () => ipcRenderer.callMain(HelpActions.OpenWindow)

  const updateValues = (values: string[]): void => {
    setValues(values)
  }

  const onNotAllowedKeyDown = (): void => {
    clearTimeout(timeoutId3)
    setErrorState(ErrorState.TypingError)
    timeoutId3 = setTimeout(() => {
      setErrorState(ErrorState.NoError)
    }, 1500)
  }

  useEffect(() => {
    const unlockDeviceRequest = async (code: number[]): Promise<void> => {
      const unlockDeviceStatus = await unlockDevice(code)

      if (unlockDeviceStatus.error) {
        setErrorState(ErrorState.InternalServerError)
        return
      }

      if (!unlockDeviceStatus.payload) {
        setErrorState(ErrorState.BadPasscode)
        return
      }
    }

    if (values[values.length - 1] !== "") {
      const code = values.map((value) => parseInt(value))

      if (leftTime === undefined) {
        void unlockDeviceRequest(code)
      }
    } else {
      setErrorState(ErrorState.NoError)
    }
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values])

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    if (
      errorState === ErrorState.BadPasscode ||
      errorState === ErrorState.InternalServerError
    ) {
      timeoutId = setTimeout(() => {
        setErrorState(ErrorState.NoError)
        setValues(initValue)
      }, 1500)
    }

    return () => {
      clearTimeout(timeoutId)
    }
  }, [errorState])

  return (
    <PasscodeModalUI
      openModal={openModal}
      close={close}
      errorMessage={ErrorMessageMap[errorState]}
      values={values}
      updateValues={updateValues}
      openHelpWindow={openHelpWindow}
      onNotAllowedKeyDown={onNotAllowedKeyDown}
      leftTime={leftTime}
      canBeClosed={canBeClosed}
      layer={ModalLayers.Passcode}
      {...rest}
    />
  )
}

export default PasscodeModal
