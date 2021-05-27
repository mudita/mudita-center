/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { createRef, useEffect, RefObject } from "react"
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
  valueList: string[]
  error: boolean
  updateValueList: (number: number, value: string) => void
  activeInput: number | undefined
  setActiveInput: React.Dispatch<React.SetStateAction<number | undefined>>
  onKeyDownHandler: (
    number: number
  ) => (e: { key: string; code: string; preventDefault: () => void }) => void
  onChangeHandler: (
    number: number
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const PasscodeInputs: FunctionComponent<PasscodeInputsProps> = ({
  valueList,
  error,
  activeInput,
  setActiveInput,
  onKeyDownHandler,
  onChangeHandler,
}) => {
  const inputRefMap: RefObject<HTMLInputElement & HTMLTextAreaElement>[] = []

  for (let i = 0; i < valueList.length; i++) {
    inputRefMap[i] = createRef<HTMLInputElement & HTMLTextAreaElement>()
  }

  useEffect(() => {
    //check if it is not the first useEffect call
    if (activeInput !== undefined && activeInput === valueList.length) {
      return
    } else if (activeInput !== undefined && activeInput < valueList.length) {
      inputRefMap[activeInput].current?.focus()
    } else if (activeInput === undefined) {
      setActiveInput(0)
    }
  }, [activeInput])

  const inputs = valueList.map((value, i) => {
    const isFilled =
      (activeInput !== undefined &&
        activeInput < valueList.length &&
        inputRefMap[activeInput].current?.value !== "" &&
        i < activeInput) ||
      activeInput === valueList.length
    const isDisabled = i !== activeInput || error
    return (
      <InputText
        type="password"
        key={i}
        error={error}
        value={value}
        filled={isFilled}
        disabled={isDisabled}
        onKeyDown={onKeyDownHandler(i)}
        ref={inputRefMap[i]}
        onFocus={(e: { target: { select: () => void } }) => {
          setActiveInput(i)
          e.target.select()
        }}
        onChange={onChangeHandler(i)}
      />
    )
  })

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
