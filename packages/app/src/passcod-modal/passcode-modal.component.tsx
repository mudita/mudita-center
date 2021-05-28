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
  const initValue = ["", "", "", ""]
  const [error, setError] = useState<boolean>(false)
  const [valueList, setValueList] = useState<string[]>(initValue)
  const [activeInput, setActiveInput] = useState<number>()

  const openHelpWindow = () => ipcRenderer.callMain(HelpActions.OpenWindow)

  const updateValueList = (number: number, value: string) => {
    const newValue = [...valueList]
    newValue[number] = value
    setValueList(newValue)
  }

  const mockPasscodeRequest = () => {
    return new Promise((resolve, reject) => {
      const passcode = valueList.join("")
      if (passcode == "3333") {
        resolve({
          endpoint: 13,
          status: 200,
          uuid: 123,
        })
      } else {
        reject({
          endpoint: 13,
          status: 403,
          uuid: 123,
        })
      }
    })
  }
  useEffect(() => {
    if (valueList[valueList.length - 1] !== "") {
      mockPasscodeRequest()
        .then(() => {
          //request success
        })
        .catch(() => {
          setError(true)
          setTimeout(() => {
            setError(false)
            setValueList(initValue)
            setActiveInput(0)
          }, 1500)
        })
    } else {
      setError(false)
    }
  }, [valueList])

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
        updateValueList(number, "")
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
      activeInput < valueList.length &&
      !backspaceEdgeCase
    ) {
      setActiveInput(activeInput + 1)
    }
    updateValueList(number, e.target.value)
  }
  return (
    <PasscodeModalUI
      openModal={openModal}
      close={close}
      error={error}
      valueList={valueList}
      updateValueList={updateValueList}
      openHelpWindow={openHelpWindow}
      activeInput={activeInput}
      setActiveInput={setActiveInput}
      onKeyDownHandler={onKeyDownHandler}
      onChangeHandler={onChangeHandler}
    />
  )
}

export default PasscodeModal
