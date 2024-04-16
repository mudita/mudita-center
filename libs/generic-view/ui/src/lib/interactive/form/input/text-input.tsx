/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect, useId, useState } from "react"
import { APIFC, IconType } from "generic-view/utils"
import styled, { css } from "styled-components"
import { IconButton } from "../../../shared/button"
import Icon from "../../../icon/icon"
import { useFormContext } from "react-hook-form"
import { RegisterOptions } from "react-hook-form/dist/types/validator"

interface Data {
  value: string
}

interface Config {
  name: string
  label: string
  type: "text" | "password" | "email" | "tel" | "url"
  validation?: Pick<
    RegisterOptions,
    "required" | "pattern" | "maxLength" | "minLength" | "deps" | "validate"
  >
}

export const TextInput: APIFC<Data, Config> = ({ data, config }) => {
  const id = useId()
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext()
  const value = (watch(config!.name) as string) || ""
  const [passwordVisible, setPasswordVisible] = useState(false)

  const error = errors[config!.name]
  const inputType =
    config?.type === "password" && !passwordVisible ? "password" : "text"

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState)
  }

  useEffect(() => {
    if (config?.name) {
      setValue(config.name, data?.value)
    }
  }, [config?.name, data?.value, setValue])

  return (
    <Wrapper>
      <Label
        htmlFor={"input-" + id}
        $inactive={value.length === 0}
        $withError={!!error}
      >
        {config?.label}
      </Label>
      <InputWrapper>
        <Input
          id={"input-" + id}
          type={inputType}
          $withError={!!error}
          {...register(config!.name, { ...config?.validation })}
        />
        {config?.type === "password" && value.length > 0 && (
          <IconButton type={"button"} onClick={togglePasswordVisibility}>
            <Icon
              data={{
                type: passwordVisible
                  ? IconType.PasswordShow
                  : IconType.PasswordHide,
              }}
            />
          </IconButton>
        )}
      </InputWrapper>
      {error && <Error>{error?.message?.toString()}</Error>}
    </Wrapper>
  )
}

export default TextInput

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const Label = styled.label<{ $inactive: boolean; $withError?: boolean }>`
  color: ${({ theme }) => theme.color.grey2};
  letter-spacing: 0.04em;
  font-size: ${({ theme }) => theme.fontSize.labelText};
  line-height: ${({ theme }) => theme.lineHeight.labelText};
  transition: all 0.2s ease-in-out;
  position: relative;
  z-index: 1;

  ${({ $inactive, theme }) =>
    $inactive &&
    css`
      pointer-events: none;
      font-size: ${theme.fontSize.paragraph3};
      letter-spacing: 0.05em;
      transform: translateY(2.6rem);
    `}

  ${({ $withError, $inactive, theme }) =>
    $withError &&
    !$inactive &&
    css`
      color: ${theme.color.red1};
    `}
`

const inputFocusStyles = css`
  border-bottom-color: ${({ theme }) => theme.color.black};
`

const Input = styled.input<{ $withError?: boolean }>`
  color: ${({ theme }) => theme.color.black};
  font-size: ${({ theme }) => theme.fontSize.paragraph3};
  line-height: ${({ theme }) => theme.lineHeight.paragraph3};
  letter-spacing: 0.05em;
  padding: 0 3.2rem 0 0;
  min-height: 3.2rem;
  border: none;
  border-bottom: 0.1rem solid ${({ theme }) => theme.color.grey4};
  box-sizing: content-box;
  flex: 1;
  outline: none;
  transition: border-bottom-color 0.2s ease-in-out;

  &[type="password"] {
    font-family: Arial, sans-serif;
    letter-spacing: 0.15em;
    font-weight: bold;
  }

  &:focus {
    ${inputFocusStyles};
  }

  ${({ $withError, theme }) =>
    $withError &&
    css`
      border-bottom-color: ${theme.color.red1} !important;
    `}
`

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;

  &:hover {
    ${Input} {
      ${inputFocusStyles};
    }
  }

  button {
    margin-left: -3.2rem;
  }
`

const Error = styled.p`
  color: ${({ theme }) => theme.color.red1};
  font-size: ${({ theme }) => theme.fontSize.labelText};
  line-height: ${({ theme }) => theme.lineHeight.labelText};
  min-height: ${({ theme }) => theme.lineHeight.labelText};
  letter-spacing: 0.04em;
  margin: 0.4rem 0 0;
`
