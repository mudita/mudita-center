/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import * as React from "react"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { InputProps } from "Renderer/interfaces/input.interface"
import {
  backgroundColor,
  borderColor,
} from "Renderer/styles/theming/theme-getters"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import styled from "styled-components"

const Input = styled.input`
  appearance: none;
  display: inline-block;
  outline: none;
  width: 2em;
  height: 2em;
  background-clip: content-box;
  border: 0.1rem solid ${borderColor("secondary")};
  background-color: ${backgroundColor("row")};
  border-radius: 50%;
  margin-right: 1.2rem;

  &:hover {
    border-color: ${borderColor("hover")};
    cursor: pointer;
    transition: border-color 0.5s linear;
  }

  &:checked {
    background-color: ${backgroundColor("super")};
    padding: 0.3rem;
  }
`

const Label = styled.label`
  display: flex;
  align-items: flex-start;
`

const LabelText = styled(Text)`
  margin-bottom: 0.8rem;
`

const LabelWrapper = styled.div`
  &:not(:last-child) {
    margin-right: 1.5rem;
    margin-bottom: 0.8rem;
  }
`

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0.4rem;
`

const InputRadio: FunctionComponent<InputProps> = ({
  className,
  children,
  label,
  subLabel,
  ...props
}) => {
  return (
    <>
      {label ? (
        <LabelWrapper>
          <Label className={className}>
            <Input {...props} type="radio" />
            <TextWrapper>
              {label && (
                <LabelText
                  displayStyle={TextDisplayStyle.MediumText}
                  element={"span"}
                >
                  {label}
                </LabelText>
              )}
              {subLabel && (
                <Text
                  displayStyle={TextDisplayStyle.MediumFadedLightText}
                  element={"span"}
                >
                  {subLabel}
                </Text>
              )}
            </TextWrapper>
          </Label>
        </LabelWrapper>
      ) : (
        <Input {...props} type="radio" className={className} />
      )}
    </>
  )
}

export default InputRadio
