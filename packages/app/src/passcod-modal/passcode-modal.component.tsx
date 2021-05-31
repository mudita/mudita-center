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
  const [activeInput, setActiveInput] = useState<number>()

  const openHelpWindow = () => ipcRenderer.callMain(HelpActions.OpenWindow)

  const updateValues = (number: number, value: string) => {
    const newValue = [...values]
    newValue[number] = value
    setValues(newValue)
  }
  useEffect(() => {
    const unlockDeviceRequest = async (code: string) => {
      const { status } = await unlockDevice(code)
      if (status !== DeviceResponseStatus.Ok) {
        setError(true)
        setTimeout(() => {
          setError(false)
          setValues(initValue)
          setActiveInput(0)
        }, 1500)
      }
    }

    if (values[values.length - 1] !== "") {
      void unlockDeviceRequest(values.join(""))
    } else {
      setError(false)
    }
  }, [values])

  const onKeyDownHandler = (number: number) => (e: {
    key: string
    code: string
    preventDefault: () => void
  }) => {
    if (/[0-9]/.test(e.key)) {
      return
    } else if (e.code === "Backspace") {
      if (activeInput !== undefined && activeInput > 0) {
        setActiveInput(activeInput - 1)
        updateValues(number, "")
      }
    } else {
      e.preventDefault()
    }
  }

  const onChangeHandler = (number: number) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const backspaceEdgeCase = activeInput === 0 && e.target.value === ""
    if (
      activeInput !== undefined &&
      activeInput < values.length &&
      !backspaceEdgeCase
    ) {
      setActiveInput(activeInput + 1)
    }
    updateValues(number, e.target.value)
  }
  return (
    <PasscodeModalUI
      openModal={openModal}
      close={close}
      error={error}
      values={values}
      updateValues={updateValues}
      openHelpWindow={openHelpWindow}
      activeInput={activeInput}
      setActiveInput={setActiveInput}
      onKeyDownHandler={onKeyDownHandler}
      onChangeHandler={onChangeHandler}
    />
  )
}

export default PasscodeModal
