/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useState, useRef, useEffect, useLayoutEffect } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { ModalContent } from "App/collecting-data-modal/collecting-data-modal.styled"
import ModalDialog from "Renderer/components/core/modal-dialog/modal-dialog.component"
import styled from "styled-components"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { fontWeight } from "Renderer/styles/theming/theme-getters"
import { InputComponent } from "App/renderer/components/core/input-text/input-text.component"
import Icon, {
  IconSize,
} from "App/renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import ButtonComponent from "App/renderer/components/core/button/button.component"
import { DisplayStyle } from "App/renderer/components/core/button/button.config"
import { ipcRenderer } from "electron-better-ipc"
import { HelpActions } from "App/common/enums/help-actions.enum"

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10.6rem;
  span {
    width: 8.1rem;
    height: 5.6rem;
  }
`
export const Title = styled(Text)`
  font-size: 3rem;
  font-weight: ${fontWeight("default")};
`
const InputContainer = styled.div`
  width: 100%;
  margin: 4rem 0 20rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
`
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  button {
    margin-left: 0.4rem;
    padding: 0.4rem;
    width: auto;
    height: auto;
  }
`

export interface PasscodeModalProps {
  openModal: boolean
  close: () => void
  inputsNumber: number
}

const PasscodeModalUI: FunctionComponent<PasscodeModalProps> = ({
  openModal,
  close,
  inputsNumber,
  ...props
}) => {
  const [activeInput, setActiveInput] = useState(0)
  const [passcode, setPasscode] = useState("")
  const inputRef = useRef<HTMLInputElement[]>([])

  useEffect(() => {
    inputRef.current = new Array(inputsNumber)
  }, [])

  useLayoutEffect(() => {
    inputRef.current[activeInput].focus()
  }, [activeInput])

  const muditaLogo = (
    <LogoWrapper>
      <Icon
        type={Type.MuditaLogoVertical}
        key={Type.MuditaLogoVertical}
        size={IconSize.Bigger}
      />
    </LogoWrapper>
  )

  const openHelpWindow = () => ipcRenderer.callMain(HelpActions.OpenWindow)
  const onChangeHandler = (number: number) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const passcodeArray = passcode.split("")
    passcodeArray[number] = e.target.value
    const newPascode = passcodeArray.join("")
    setPasscode(newPascode)
  }
  const renderInputs = () => {
    const inputs = []
    for (let i = 0; i < inputsNumber; i++) {
      inputs.push(
        <InputComponent
          type="password"
          key={i}
          error={false}
          onKeyPress={(event: { key: string; preventDefault: () => void }) => {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault()
            }
          }}
          inputRef={(el: HTMLInputElement) => (inputRef.current[i] = el)}
          onFocus={(e: { target: { select: () => void } }) => {
            setActiveInput(i)
            e.target.select()
          }}
          onChange={onChangeHandler(i)}
        />
      )
    }
    return inputs
  }
  // const focusInput = (input: number) => {
  //     const activeInput = Math.max(Math.min(inputsNumber - 1, input), 0);

  //     setActiveInput(activeInput);
  // };

  // const focusNextInput = () => {
  //     focusInput(activeInput + 1);
  // }

  // Focus on previous input
  // const focusPrevInput = () => {
  //     focusInput(activeInput - 1);
  //   }
  return (
    <ModalDialog
      {...props}
      open={openModal}
      closeButton={false}
      closeModal={close}
      title={muditaLogo}
    >
      <ModalContent>
        <Title
          displayStyle={TextDisplayStyle.PrimaryHeading}
          message={{
            id: "component.passcodeModalTitle",
          }}
        />
        <InputContainer>{renderInputs()}</InputContainer>
        <ButtonContainer>
          <ButtonComponent
            displayStyle={DisplayStyle.Link3}
            labelMessage={{
              id: "component.passcodeModalHelp",
            }}
            onClick={openHelpWindow}
          />
        </ButtonContainer>
      </ModalContent>
    </ModalDialog>
  )
}

export default PasscodeModalUI
