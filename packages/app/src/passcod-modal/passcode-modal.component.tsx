/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "App/renderer/types/function-component.interface"
import React from "react"
import PasscodeModalUI from "./passcode-modal-ui.component"

export interface PasscodeModalProps {
  openModal: boolean
  close: () => void
  inputsNumber: number
}

const PasscodeModal: FunctionComponent<PasscodeModalProps> = ({
  openModal,
  inputsNumber,
  close,
}) => {
  return (
    <PasscodeModalUI
      inputsNumber={inputsNumber}
      openModal={openModal}
      close={close}
    />
  )
}

export default PasscodeModal
