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

const PasscodeModal: FunctionComponent<PasscodeModalProps> = ({
  openModal,
  close,
}) => {
  const initValue = ["", "", "", ""]
  const [error, setError] = useState<boolean>(false)
  const [values, setValues] = useState<string[]>(initValue)

  const openHelpWindow = () => ipcRenderer.callMain(HelpActions.OpenWindow)

  const updateValues = (values: string[]) => {
    setValues(values)
  }

  const onNotAllowedKeyDown = () => {
    setError(true)
    setTimeout(() => {
      setError(false)
    }, 1500)
  }
  useEffect(() => {
    let timeoutId1: NodeJS.Timeout
    let timeoutId2: NodeJS.Timeout

    const unlockDeviceRequest = async (code: string) => {
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

    if (values[values.length - 1] !== "") {
      void unlockDeviceRequest(values.join(""))
    } else {
      setError(false)
    }
  }, [values])

  return (
    <PasscodeModalUI
      openModal={openModal}
      close={close}
      error={error}
      values={values}
      updateValues={updateValues}
      openHelpWindow={openHelpWindow}
      onNotAllowedKeyDown={onNotAllowedKeyDown}
    />
  )
}

export default PasscodeModal
