/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "App/renderer/types/function-component.interface"
import React, { useState, useEffect } from "react"
import { useHistory } from "react-router"
import PasscodeModalUI from "./passcode-modal-ui.component"
import { ipcRenderer } from "electron-better-ipc"
import { HelpActions } from "App/common/enums/help-actions.enum"
import { URL_MAIN } from "Renderer/constants/urls"

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

  const history = useHistory()

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
          status: 404,
          uuid: 123,
        })
      }
    })
  }
  useEffect(() => {
    if (valueList[valueList.length - 1] !== "") {
      mockPasscodeRequest()
        .then(() => {
          history.push(URL_MAIN.overview)
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
    />
  )
}

export default PasscodeModal
