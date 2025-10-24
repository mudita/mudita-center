/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, useCallback, useMemo, useState } from "react"
import { IconSize, IconType } from "app-theme/models"
import { styled } from "styled-components"
import {
  Input,
  Placeholder,
  Slot,
  TextInputInnerProps,
} from "./text-input-shared"
import { Icon } from "../../icon/icon"

export const TextInputPassword: FunctionComponent<TextInputInnerProps> = ({
  id,
  leftSlot,
  rightSlot: unusedSlot,
  placeholder,
  ...rest
}) => {
  const labelId = `${id}-label`
  const [passwordVisible, setPasswordVisible] = useState(false)

  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisible((prevState) => !prevState)
  }, [])

  const rightSlot = useMemo(() => {
    return (
      <PasswordSlot onClick={togglePasswordVisibility} as={"button"}>
        <Icon type={IconType.PasswordHide} size={IconSize.Big} />
        <Icon type={IconType.PasswordShow} size={IconSize.Big} />
      </PasswordSlot>
    )
  }, [togglePasswordVisibility])

  return (
    <>
      {leftSlot}
      <PasswordInput
        {...rest}
        type={passwordVisible ? "text" : "password"}
        placeholder={""}
      />
      {rightSlot}
      <Placeholder>
        {leftSlot}
        <span id={labelId}>{placeholder}</span>
        {rightSlot}
      </Placeholder>
    </>
  )
}

const PasswordSlot = styled(Slot)`
  position: relative;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  appearance: none;
  background-color: transparent;
  border: none;
  padding: 0;
  margin: 0;

  > span {
    transition-property: opacity;
    transition-duration: 0.2s;
    transition-timing-function: ease-in-out;
    background-color: transparent !important;

    &:last-child {
      margin-top: -100%;
    }
  }
`

const PasswordInput = styled(Input)`
  &[type="password"] {
    font-family: Arial, sans-serif;
    letter-spacing: 0.13em;
    font-weight: bold;
    font-size: 1.8rem;

    & + ${PasswordSlot} > span {
      &:first-child {
        opacity: 0;
      }
      &:last-child {
        opacity: 1;
      }
    }
  }

  &[type="text"] {
    & + ${PasswordSlot} > span {
      &:first-child {
        opacity: 1;
      }
      &:last-child {
        opacity: 0;
      }
    }
  }
`
