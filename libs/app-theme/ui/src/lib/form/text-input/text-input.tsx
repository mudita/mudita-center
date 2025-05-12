/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  FunctionComponent,
  InputHTMLAttributes,
  ReactNode,
  useId,
  useMemo,
} from "react"
import styled, { css } from "styled-components"
import { TextInputVariant } from "app-theme/models"
import { TextInputPassword } from "./text-input-password"
import { Input, Placeholder, Slot, TextInputDefault } from "./text-input-shared"

type FilledProps = {
  variant: TextInputVariant.Filled
  error?: string
}

type OutlinedProps = {
  variant: TextInputVariant.Outlined
  error?: undefined
}

type InputWrapperProps = FilledProps | OutlinedProps

type TextTypeProps = {
  type?:
    | "date"
    | "datetime-local"
    | "email"
    | "month"
    | "number"
    | "password"
    | "search"
    | "tel"
    | "text"
    | "time"
    | "url"
    | "week"
  leftSlot?: ReactNode
  rightSlot?: ReactNode
}

type PasswordTypeProps = {
  type: "password"
  leftSlot?: ReactNode
  rightSlot?: undefined
}

type InputProps = TextTypeProps | PasswordTypeProps

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> &
  InputWrapperProps &
  InputProps

export const TextInput: FunctionComponent<Props> = ({
  variant = TextInputVariant.Outlined,
  type = "text",
  placeholder,
  error,
  style,
  className,
  leftSlot,
  rightSlot,
  children,
  ...rest
}) => {
  const uid = useId()
  const id = `text-input-${uid}`

  const InputComponent = useMemo(() => {
    switch (type) {
      case "password":
        return TextInputPassword as typeof Input
      default:
        return TextInputDefault
    }
  }, [type])

  const slots = useMemo(() => {
    return {
      leftSlot: leftSlot ? <Slot>{leftSlot}</Slot> : null,
      rightSlot: rightSlot ? <Slot>{rightSlot}</Slot> : null,
    }
  }, [leftSlot, rightSlot])

  return (
    <Wrapper {...rest} className={className} style={style}>
      <InputWrapper $variant={variant} $error={Boolean(error)} htmlFor={id}>
        <InputComponent
          id={id}
          placeholder={placeholder}
          type={type}
          {...rest}
          {...slots}
        />
      </InputWrapper>
      {variant === TextInputVariant.Filled && (
        <Error>{error || <>&nbsp;</>}</Error>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`

const filledInputStyles = css<{ $error?: boolean }>`
  height: 3.3rem;
  border-bottom: solid 0.1rem
    ${({ theme, $error }) =>
      $error ? theme.app.color.red : theme.app.color.grey4};
  transition: border-bottom-color 0.2s ease-in-out;

  ${Placeholder} {
    transition-property: transform, height, gap;
    transition-duration: 0.2s;
    transition-timing-function: ease-in-out;
    color: ${({ theme, $error }) =>
      $error ? theme.app.color.red : theme.app.color.grey2};

    span {
      transition-property: font-size, line-height, letter-spacing;
      transition-duration: 0.2s;
      transition-timing-function: ease-in-out;
    }

    ${Slot} {
      transition: width 0.2s ease-in-out;
      width: calc-size(min-content, size);
    }
  }

  &:has(${Input}:focus-visible) {
    border-bottom: solid 0.1rem
      ${({ theme, $error }) =>
        $error ? theme.app.color.red : theme.app.color.black};
  }

  &:has(${Input}:not(:placeholder-shown)) {
    ${Placeholder} {
      height: 2rem;
      transform: translateY(-2rem);
      gap: 0;

      span {
        font-size: ${({ theme }) => theme.app.fontSize.labelText};
        line-height: ${({ theme }) => theme.app.lineHeight.labelText};
        letter-spacing: 0.04em;
      }

      ${Slot} {
        width: calc-size(min-content, size * 0);
      }
    }
  }
`

const outlinedInputStyles = css`
  height: 4rem;
  border: solid 0.1rem ${({ theme }) => theme.app.color.grey4};
  border-radius: ${({ theme }) => theme.app.radius.sm};
  background: ${({ theme }) => theme.app.color.grey6};
  padding: 1rem;
  gap: 1rem;
  transition-property: border-color;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;

  ${Placeholder} {
    transition-property: opacity;
    transition-duration: 0.2s;
    transition-timing-function: ease-in-out;
    color: ${({ theme }) => theme.app.color.grey3};
  }

  &:has(${Input}:focus-visible) {
    border: solid 0.1rem ${({ theme }) => theme.app.color.black};
  }

  &:has(${Input}:not(:placeholder-shown)) {
    ${Placeholder} {
      opacity: 0;
    }
  }
`

const InputWrapper = styled.label<{
  $variant: Props["variant"]
  $error?: boolean
}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.4rem;
  position: relative;
  font-size: 1rem;

  ${({ $variant }) => $variant === "filled" && filledInputStyles};
  ${({ $variant }) => $variant === "outlined" && outlinedInputStyles};
`

const Error = styled.span`
  margin: 0;
  color: ${({ theme }) => theme.app.color.red};
  font-size: ${({ theme }) => theme.app.fontSize.labelText};
  line-height: ${({ theme }) => theme.app.lineHeight.labelText};
  letter-spacing: 0.04em;
  user-select: none;
`
