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
import { PasscodeModalTestIds } from "../passcode-modal-test-ids.enum"

const InputContainer = styled.div<{
  errorMessage: string
}>`
  width: 100%;
  margin: 4rem 0 20rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  ${({ errorMessage }) => errorMessage !== "" && "margin: 4rem 0 2rem;"};
`
const ErrorMessage = styled(Text)`
  color: ${textColor("error")};
  margin-bottom: 16.6rem;
`

interface Props {
  values: string[]
  updateValues: (values: string[]) => void
  onNotAllowedKeyDown: () => void
  errorMessage: string
}

export const PasscodeInputs: FunctionComponent<Props> = ({
  values,
  updateValues,
  onNotAllowedKeyDown,
  errorMessage,
}) => {
  const [activeInput, setActiveInput] = useState<number>()
  const [fromBlur, setFromBlur] = useState<boolean>(false)
  const inputRefMap: RefObject<HTMLInputElement & HTMLTextAreaElement>[] = []

  for (let i = 0; i < values.length; i++) {
    inputRefMap[i] = createRef<HTMLInputElement & HTMLTextAreaElement>()
  }

  useEffect(() => {
    //check if it is not the first useEffect call
    if (activeInput !== undefined && activeInput === values.length) {
      return
    } else if (
      activeInput !== undefined &&
      activeInput < values.length &&
      !fromBlur
    ) {
      inputRefMap[activeInput].current?.focus()
    } else if (activeInput === undefined) {
      setActiveInput(0)
    }
  }, [activeInput])

  useEffect(() => {
    if (values[0] === "") {
      setActiveInput(0)
    }
  }, [values])

  const updateInputValue = (number: number, value: string) => {
    const newValue = [...values]
    newValue[number] = value
    updateValues(newValue)
  }

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
        updateInputValue(number, "")
        setFromBlur(false)
      }
    } else {
      onNotAllowedKeyDown()

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
    setFromBlur(false)
    updateInputValue(number, e.target.value)
  }
  const onBlurHandler = () => {
    setActiveInput(values.indexOf(""))
    setFromBlur(true)
  }

  return (
    <>
      <InputContainer
        errorMessage={errorMessage}
        data-testid={PasscodeModalTestIds.PasscodeInputs}
      >
        {values.map((value, i) => {
          const filled =
            (activeInput !== undefined &&
              activeInput < values.length &&
              inputRefMap[activeInput].current?.value !== "" &&
              i < activeInput) ||
            activeInput === values.length
          const disabled =
            i !== activeInput || errorMessage === "component.passcodeModalError"
          return (
            <InputText
              type="password"
              key={i}
              error={errorMessage === "component.passcodeModalError"}
              value={value}
              filled={filled}
              disabled={disabled}
              onKeyDown={onKeyDownHandler(i)}
              ref={inputRefMap[i]}
              onFocus={(e: { target: { select: () => void } }) => {
                setActiveInput(i)
                e.target.select()
              }}
              onBlur={onBlurHandler}
              onChange={onChangeHandler(i)}
            />
          )
        })}
      </InputContainer>
      {errorMessage !== "" && (
        <ErrorMessage
          displayStyle={TextDisplayStyle.SmallText}
          data-testid={PasscodeModalTestIds.ErrorMessage}
          message={{ id: errorMessage }}
        />
      )}
    </>
  )
}
