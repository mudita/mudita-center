/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useId } from "react"
import { APIFC, IconType } from "generic-view/utils"
import { withConfig } from "../../utils/with-config"
import { withData } from "../../utils/with-data"
import styled from "styled-components"
import { RegisterOptions, useFormContext } from "react-hook-form"
import Icon from "../../icon/icon"

interface Config {
  name: string
  value: string
  checked?: boolean
  label?: string
  validation?: Pick<RegisterOptions, "required">
  onToggle?: (checked: boolean) => void
}

export const CheckboxInput: APIFC<undefined, Config> = ({
  data,
  config,
  children,
  ...props
}) => {
  const id = useId()
  const { register } = useFormContext()
  const { onChange, ...rest } = register(config!.name, {
    ...config?.validation,
  })

  return (
    <Wrapper {...props}>
      <Input
        id={"checkbox-" + id}
        type={"checkbox"}
        value={config?.value}
        checked={config?.checked}
        onChange={(e) => {
          config?.onToggle?.(e.target.checked)
          void onChange(e)
        }}
        {...rest}
      />
      <Label htmlFor={"checkbox-" + id}>
        <InputBox>
          <CheckIcon />
        </InputBox>
        {children || config?.label}
      </Label>
    </Wrapper>
  )
}

export default withData(withConfig(CheckboxInput))

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  min-height: 3.2rem;
`

const Label = styled.label`
  display: flex;
  flex: 1;
  align-items: center;
  flex-direction: row;
  color: ${({ theme }) => theme.color.grey1};
  letter-spacing: 0.02em;
  font-size: ${({ theme }) => theme.fontSize.paragraph1};
  line-height: ${({ theme }) => theme.lineHeight.paragraph1};
  cursor: pointer;
  user-select: none;
`

const CheckIcon = styled(Icon).attrs({ data: { type: IconType.Check } })`
  width: 1.8rem;
  height: 1.8rem;
`

const InputBox = styled.div`
  min-width: 2.2rem;
  min-height: 2.2rem;
  width: 2.2rem;
  height: 2.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: baseline;
  border-radius: ${({ theme }) => theme.radius.xs};
  border: 0.1rem solid ${({ theme }) => theme.color.grey4};
  margin: 0 1.4rem 0 0;
  transition: background-color 0.2s ease-in-out;
  overflow: hidden;
  box-sizing: border-box;

  ${CheckIcon} {
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out;
  }
`

const Input = styled.input<{ $withError?: boolean }>`
  display: none;

  &:checked + ${Label} {
    ${InputBox} {
      border-color: ${({ theme }) => theme.color.grey1};
      background-color: ${({ theme }) => theme.color.grey1};

      ${CheckIcon} {
        opacity: 1;
        visibility: visible;
      }
    }
  }
`
