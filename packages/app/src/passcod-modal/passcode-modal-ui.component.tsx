/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { createRef, useEffect, RefObject, useState } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { ModalContent } from "App/collecting-data-modal/collecting-data-modal.styled"
import ModalDialog from "Renderer/components/core/modal-dialog/modal-dialog.component"
import styled from "styled-components"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { fontWeight, textColor } from "Renderer/styles/theming/theme-getters"
import InputText from "App/renderer/components/core/input-text/input-text.component"
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
const InputContainer = styled.div<{
  error: boolean
}>`
  width: 100%;
  margin: 4rem 0 20rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  ${({ error }) => error && "margin: 4rem 0 2rem;"};
`
const ErrorMessage = styled(Text)`
  color: ${textColor("error")};
  margin-bottom: 16.6rem;
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
  const [activeInput, setActiveInput] = useState<number>()
  const [passcode, setPasscode] = useState<string>("")
  const [error, setError] = useState<boolean>(false)
  const inputRefMap: RefObject<HTMLInputElement & HTMLTextAreaElement>[] = []

  for (let i = 0; i < inputsNumber; i++) {
    inputRefMap[i] = createRef<HTMLInputElement & HTMLTextAreaElement>()
  }

  useEffect(() => {
    //check if it is not the first useEffect call
    if (activeInput !== undefined) {
      inputRefMap[activeInput].current?.focus()
    } else {
      setActiveInput(0)
    }
  }, [activeInput])

  useEffect(() => {
    if (passcode.length === inputsNumber) {
      //send password
      if (passcode !== "3333") {
        setError(true)
        setTimeout(() => {
          setError(false)
          setPasscode("")
          setActiveInput(0)
        }, 2000)
      }
    } else {
      setError(false)
    }
  }, [passcode])

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

  const changePasscode = (value: string, number: number) => {
    const passcodeArray = passcode.split("")
    passcodeArray[number] = value
    const newPascode = passcodeArray.join("")
    setPasscode(newPascode)
  }

  const onChangeHandler = (number: number) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const backspaceEdgeCase = activeInput === 0 && e.target.value === ""
    if (
      activeInput !== undefined &&
      activeInput < inputsNumber - 1 &&
      !backspaceEdgeCase
    ) {
      setActiveInput(activeInput + 1)
    }
    changePasscode(e.target.value, number)
  }

  const onKeyDownHandler = (e: {
    key: string
    code: string
    preventDefault: () => void
  }) => {
    if (/[0-9]/.test(e.key)) {
      return
    } else if (e.code === "Backspace") {
      if (activeInput !== undefined && activeInput > 0) {
        setActiveInput(activeInput - 1)
      }
    } else {
      e.preventDefault()
    }
  }

  const renderInputs = () => {
    const inputs = []
    for (let i = 0; i < inputsNumber; i++) {
      inputs.push(
        <InputText
          type="password"
          key={i}
          error={error}
          value={i}
          onKeyDown={onKeyDownHandler}
          ref={inputRefMap[i]}
          onFocus={(e: { target: { select: () => void } }) => {
            setActiveInput(i)
            e.target.select()
          }}
          //   onMouseDown={(e: { preventDefault: () => any }) => e.preventDefault()}
          //   onBlur={(e: { stopPropagation: () => any }) => e.stopPropagation()}
          onChange={onChangeHandler(i)}
        />
      )
    }
    return inputs
  }

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
        <InputContainer error={error}>{renderInputs()}</InputContainer>
        {error && (
          <ErrorMessage
            displayStyle={TextDisplayStyle.SmallText}
            message={{ id: "wrong passcode" }}
          />
        )}
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
