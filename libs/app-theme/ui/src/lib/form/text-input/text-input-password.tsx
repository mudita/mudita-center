/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  FunctionComponent,
  InputHTMLAttributes,
  useCallback,
  useState,
} from "react"
import { IconButton } from "../../icon-button/icon-button"
import { IconSize, IconType } from "app-theme/models"
import { styled } from "styled-components"
import { Input, Slot } from "./text-input-shared"

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  type: "password"
}

export const TextInputPassword: FunctionComponent<Props> = ({ ...rest }) => {
  const [passwordVisible, setPasswordVisible] = useState(false)

  const hidePassword = useCallback(() => {
    setPasswordVisible(false)
  }, [])

  const showPassword = useCallback(() => {
    setPasswordVisible(true)
  }, [])

  return (
    <>
      <PasswordInput {...rest} type={passwordVisible ? "text" : "password"} />
      <PasswordSlot $visible={passwordVisible}>
        <IconButton
          icon={IconType.PasswordHide}
          size={IconSize.Big}
          onClick={showPassword}
        />
        <IconButton
          icon={IconType.PasswordShow}
          size={IconSize.Big}
          onClick={hidePassword}
        />
      </PasswordSlot>
    </>
  )
}

const PasswordSlot = styled(Slot)<{ $visible: boolean }>`
  position: relative;

  button {
    transition-property: opacity, visibility;
    transition-duration: 0.2s;
    transition-timing-function: ease-in-out;
    background-color: transparent !important;

    &:first-child {
      opacity: ${({ $visible }) => ($visible ? 0 : 1)};
      visibility: ${({ $visible }) => ($visible ? "hidden" : "visible")};
    }
    &:last-child {
      margin-top: -100%;
      opacity: ${({ $visible }) => ($visible ? 1 : 0)};
      visibility: ${({ $visible }) => ($visible ? "visible" : "hidden")};
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
