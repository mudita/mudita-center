/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "App/renderer/types/function-component.interface"
import React, { useState, useEffect } from "react"
import PasscodeModalUI from "./passcode-modal-ui.component"
import { ipcRenderer } from "electron-better-ipc"
import { HelpActions } from "App/common/enums/help-actions.enum"

export interface PasscodeModalProps {
  openModal: boolean
  close: () => void
}

const PasscodeModal: FunctionComponent<PasscodeModalProps> = ({
  openModal,
  close,
}) => {
  const [error, setError] = useState<boolean>(false)
  const [valueList, setValueList] = useState<string[]>(["", "", "", ""])

  const openHelpWindow = () => ipcRenderer.callMain(HelpActions.OpenWindow)

  const updateValueList = (number: number, value: string) => {
    const newValue = [...valueList]
    newValue[number] = value
    setValueList(newValue)
  }

  useEffect(() => {
    if (valueList[valueList.length - 1] !== "") {
      //send password
      const passcode = valueList.join("")
      if (passcode == "3333") {
        setError(true)
        setTimeout(() => {
          setError(false)
        }, 1500)
      }
    } else {
      setError(false)
    }
  }, [valueList])

  return (
    <PasscodeModalUI
      openModal={openModal}
      close={close}
      error={error}
      valueList={valueList}
      updateValueList={updateValueList}
      openHelpWindow={openHelpWindow}
    />
  )
}

export default PasscodeModal
