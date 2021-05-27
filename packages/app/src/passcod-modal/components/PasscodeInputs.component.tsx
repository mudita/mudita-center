/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { createRef, useEffect, RefObject, useState } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import styled from "styled-components"
import InputText from "App/renderer/components/core/input-text/input-text.component"
import { textColor } from "Renderer/styles/theming/theme-getters"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"

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

interface PasscodeInputsProps {
  inputsNumber: number
}

export const PasscodeInputs: FunctionComponent<PasscodeInputsProps> = ({
  inputsNumber,
}) => {
  const [activeInput, setActiveInput] = useState<number>()
  const [passcode, setPasscode] = useState<string>("")
  const [error, setError] = useState<boolean>(false)
  const inputRefMap: RefObject<HTMLInputElement & HTMLTextAreaElement>[] = []
  const inputs = []
  for (let i = 0; i < inputsNumber; i++) {
    inputRefMap[i] = createRef<HTMLInputElement & HTMLTextAreaElement>()
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

  for (let i = 0; i < inputsNumber; i++) {
    const isDisabled =
      activeInput &&
      inputRefMap[activeInput].current?.value !== "" &&
      i < activeInput
    inputs.push(
      <InputText
        type="password"
        key={i}
        error={error}
        value={i}
        disabled={isDisabled}
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

  const changePasscode = (value: string, number: number) => {
    const passcodeArray = passcode.split("")
    passcodeArray[number] = value
    const newPascode = passcodeArray.join("")
    setPasscode(newPascode)
  }

  return (
    <>
      <InputContainer error={error}>{inputs}</InputContainer>
      {error && (
        <ErrorMessage
          displayStyle={TextDisplayStyle.SmallText}
          message={{ id: "wrong passcode" }}
        />
      )}
    </>
  )
}
