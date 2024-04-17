/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useId } from "react"
import { APIFC } from "generic-view/utils"
import styled from "styled-components"
import { useFormContext } from "react-hook-form"
import { FormRadioInputConfig } from "generic-view/models"

export const RadioInput: APIFC<undefined, FormRadioInputConfig> = ({
  data,
  config,
}) => {
  const id = useId()
  const { register } = useFormContext()

  return (
    <Wrapper>
      <Input
        id={"input-" + id}
        type={"radio"}
        value={config!.value}
        {...register(config!.name, { ...config?.validation })}
      />
      <Label htmlFor={"input-" + id}>
        <InputIndicator />
        {config?.label}
      </Label>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  min-height: 3.2rem;
`

const Label = styled.label`
  display: flex;
  align-items: center;
  flex-direction: row;
  color: ${({ theme }) => theme.color.grey1};
  letter-spacing: 0.02em;
  font-size: ${({ theme }) => theme.fontSize.paragraph1};
  line-height: ${({ theme }) => theme.lineHeight.paragraph1};
  cursor: pointer;
`

const InputIndicator = styled.div`
  min-width: 2.2rem;
  min-height: 2.2rem;
  display: inline-block;
  border-radius: 50%;
  border: 0.1rem solid ${({ theme }) => theme.color.grey4};
  margin-right: 1.4rem;
  align-self: flex-start;

  &:after {
    content: "";
    display: block;
    width: 1.2rem;
    height: 1.2rem;
    margin: 0.4rem;
    background-color: ${({ theme }) => theme.color.grey1};
    border-radius: 50%;
    box-sizing: border-box;
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
  }
`

const Input = styled.input<{ $withError?: boolean }>`
  display: none;

  &:checked + ${Label} {
    ${InputIndicator} {
      &:after {
        opacity: 1;
      }
    }
  }
`
