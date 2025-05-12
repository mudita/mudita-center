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
      <PasswordSlot
        $visible={passwordVisible}
        onClick={togglePasswordVisibility}
      >
        <Icon type={IconType.PasswordHide} size={IconSize.Big} />
        <Icon type={IconType.PasswordShow} size={IconSize.Big} />
      </PasswordSlot>
    )
  }, [passwordVisible, togglePasswordVisibility])

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

const PasswordSlot = styled(Slot)<{ $visible: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  cursor: pointer;

  > div {
    transition-property: opacity, visibility;
    transition-duration: 0.2s;
    transition-timing-function: ease-in-out;
    background-color: transparent !important;

    &:first-child {
      opacity: ${({ $visible }) => ($visible ? 0 : 1)};
    }
    &:last-child {
      margin-top: -100%;
      opacity: ${({ $visible }) => ($visible ? 1 : 0)};
    }
  }
`

const PasswordInput = styled(Input)`
  &[type="password"] {
    font-family: Arial, sans-serif;
    letter-spacing: 0.13em;
    font-weight: bold;
    font-size: 1.8rem;
  }
`
