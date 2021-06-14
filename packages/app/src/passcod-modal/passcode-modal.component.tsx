/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "App/renderer/types/function-component.interface"
import React, { useEffect, useState } from "react"
import PasscodeModalUI from "./passcode-modal-ui.component"
import { ipcRenderer } from "electron-better-ipc"
import { HelpActions } from "App/common/enums/help-actions.enum"
import unlockDevice from "Renderer/requests/unlock-device.request"
import { DeviceResponseStatus } from "Backend/adapters/device-response.interface"
import getUnlockDeviceStatus from "Renderer/requests/get-unlock-device-status.request"

export interface PasscodeModalProps {
  openModal: boolean
  close: () => void
}
let timeoutId3: NodeJS.Timeout

const PasscodeModal: FunctionComponent<PasscodeModalProps> = ({
  openModal,
  close,
}) => {
  const initValue = ["", "", "", ""]
  const [error, setError] = useState<boolean>(false)
  const [typingError, setTypingError] = useState<boolean>(false)
  const [values, setValues] = useState<string[]>(initValue)

  const openHelpWindow = () => ipcRenderer.callMain(HelpActions.OpenWindow)

  const updateValues = (values: string[]) => {
    setValues(values)
  }

  const onNotAllowedKeyDown = () => {
    clearTimeout(timeoutId3)
    setTypingError(true)
    timeoutId3 = setTimeout(() => {
      setTypingError(false)
    }, 1500)
  }

  const getErrorMessage = () => {
    if (error) {
      return "component.passcodeModalError"
    } else if (typingError) {
      return "component.passcodeModalErrorTyping"
    } else {
      return ""
    }
  }
  useEffect(() => {
    let timeoutId1: NodeJS.Timeout
    let timeoutId2: NodeJS.Timeout

    const unlockDeviceRequest = async (code: number[]) => {
      await unlockDevice(code)
      timeoutId1 = setTimeout(async () => {
        const { status } = await getUnlockDeviceStatus()

        if (status !== DeviceResponseStatus.Ok) {
          setError(true)
          timeoutId2 = setTimeout(() => {
            setError(false)
            setValues(initValue)
          }, 1500)
        }
      }, 1000)

      return () => {
        clearTimeout(timeoutId1)
        clearTimeout(timeoutId2)
      }
    }

    setTypingError(false)

    if (values[values.length - 1] !== "") {
      const code = values.map((value) => parseInt(value))
      void unlockDeviceRequest(code)
    } else {
      setError(false)
    }
  }, [values])

  return (
    <PasscodeModalUI
      openModal={openModal}
      close={close}
      errorMessage={getErrorMessage()}
      values={values}
      updateValues={updateValues}
      openHelpWindow={openHelpWindow}
      onNotAllowedKeyDown={onNotAllowedKeyDown}
    />
  )
}

export default PasscodeModal
