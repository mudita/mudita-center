/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ChangeEvent, useLayoutEffect, useRef } from "react"
import {
  InputIconsProps,
  InputProps,
  TextareaProps,
  InputPasswordProps,
} from "Renderer/components/core/input-text/input-text.interface"
import Text, {
  getTextStyles,
  smallTextSharedStyles,
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import transition from "Renderer/styles/functions/transition"
import theme from "Renderer/styles/theming/theme"
import {
  backgroundColor,
  borderColor,
  borderRadius,
  font,
  lineHeight,
  textColor,
  transitionTime,
  transitionTimingFunction,
} from "Renderer/styles/theming/theme-getters"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { noop } from "Renderer/utils/noop"
import styled, { css } from "styled-components"
import composeRefs from "@seznam/compose-react-refs"
import Icon from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import CloseImage from "Renderer/images/close.png"
import { InputTextTestIds } from "./input-text-test-ids.enum"

export const searchIcon = (
  <Icon type={Type.Magnifier} height={2.8} width={2.8} />
)

const focusedLabelStyles = css`
  top: -2rem;
  ${smallTextSharedStyles};
`

const InputLabel = styled(Text)`
  position: absolute;
  left: 0;
  top: 0.3rem;
  color: ${textColor("secondary")};
  ${getTextStyles(TextDisplayStyle.MediumLightText)};
  line-height: 1.5rem;
  pointer-events: none;
  user-select: none;
  transition: ${transition("top", "100ms", "ease-in-out")},
    ${transition("font-size", "100ms", "ease-in-out")};
  transition-delay: 0.1s;
  white-space: nowrap;
`

const errorStyles = css`
  border-color: ${borderColor("error")};
`

export const InputError = styled(Text)<{ visible: boolean }>`
  position: absolute;
  left: 0;
  top: 100%;
  width: 100%;
  margin-top: 0.4rem;
  color: ${textColor("error")};
  opacity: 0;
  visibility: hidden;
  transition: all ${transitionTime("quick")}
    ${transitionTimingFunction("smooth")};
  ${smallTextSharedStyles};

  ${({ visible }) =>
    visible &&
    css`
      opacity: 1;
      visibility: visible;
    `};
`

const outlinedStyles = css`
  height: 4rem;
  padding: 0 2.4rem;
  border: 0.1rem solid ${borderColor("secondary")};
  border-radius: ${borderRadius("medium")};
`

const condensedStyles = css`
  padding: 0 1.3rem;
`

const focusedStyles = css`
  border-color: ${borderColor("primary")};
`

const disabledStyles = css`
  opacity: 0.5;
`

const LeadingIcons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  order: 1;
  margin-right: 0.8rem;
`

const TrailingIcons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  order: 3;
  margin-left: 0.8rem;
`

const LabeledInputWrapper = styled.div`
  position: relative;
  order: 2;
  flex: 1;
  display: flex;
  min-height: ${lineHeight("textarea")}rem;
  width: 100%;
  user-select: none;
`

const TextInputIcon = styled.span`
  height: 100%;
  max-height: 6.4rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  user-select: none;
`

export const generalInputStyles = css`
  appearance: none;
  border: none;
  outline: none;
  flex: 1;
  order: 2;
  background-color: transparent;
  padding: 0;
  color: ${textColor("primary")};
  width: 100%;

  ${getTextStyles(TextDisplayStyle.MediumLightText)};
  line-height: 1.5rem;

  &:not(:placeholder-shown) {
    & + ${InputLabel} {
      ${focusedLabelStyles};
    }
  }

  ::placeholder {
    color: ${textColor("disabled")};
  }
`

const TextInput = styled.input<{ type: string }>`
  ${generalInputStyles};
  :focus {
    ${({ type }) =>
      type === "search" &&
      css`
        + ${LeadingIcons} {
          display: none;
        }
      `};
  }

  ${({ type }) =>
    type === "search" &&
    css`
      &::-webkit-search-cancel-button {
        -webkit-appearance: none;
        cursor: pointer;
        height: 14px;
        width: 14px;
        background-image: url(${CloseImage});
        background-repeat: no-repeat;
        background-size: 14px;
        display: block;
      }
    `};
`
const filledPasswordStyles = css`
  border: solid 0.1rem ${backgroundColor("minor")};
  background-color: ${backgroundColor("minor")};
  color: ${textColor("primary")};
`

const errorPasswordStyles = css`
  border: solid 0.1rem ${borderColor("error")};
  background-color: ${backgroundColor("modal")};
  color: ${textColor("error")};
  &:focus {
    border: solid 0.1rem ${borderColor("error")};
  }
`

const PasswordInput = styled.input<{
  error: boolean
  filled: boolean
}>`
  border: solid 0.1rem ${borderColor("secondary")};
  border-radius: 0.4rem;
  width: 4.6rem;
  height: 7.6rem;
  margin: 0 1.2rem;
  padding-left: 3rem;
  font-family: ${font("helper")};
  font-size: 5rem;
  line-height: 5.5rem;
  &:focus {
    border: solid 0.1rem ${borderColor("primary")};
    outline: none;
  }
  ${({ filled }) => filled && filledPasswordStyles};
  ${({ error }) => error && errorPasswordStyles};
`

interface InputWrapperProps {
  outlined?: boolean
  condensed?: boolean
  disabled?: boolean
  readOnly?: boolean
  error?: boolean
  focusable?: boolean
  inputType?: InputProps["type"]
  initialTransparentBorder?: boolean
}

const searchStyles = css`
  &:focus-within {
    background-color: ${backgroundColor("row")};
  }
`

const InputWrapper = styled.label<InputWrapperProps>`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding-top: 2rem;
  padding-bottom: 0.6rem;
  box-sizing: border-box;
  border-bottom: 0.1rem solid ${borderColor("secondary")};
  transition: ${transition("border-color", "100ms", "ease-in-out")};
  ${TextInputIcon} {
    + ${TextInputIcon} {
      margin-left: 1.2rem;
    }
  }

  ${({ initialTransparentBorder }) =>
    initialTransparentBorder &&
    css`
      border-color: transparent;
    `}
  ${({ outlined }) => outlined && outlinedStyles};
  ${({ condensed }) => condensed && condensedStyles};
  ${({ disabled }) => disabled && disabledStyles};
  ${({ error }) => error && errorStyles};
  ${({ inputType }) => inputType === "search" && searchStyles};
  ${({ disabled, readOnly, focusable, error }) =>
    (!(disabled || readOnly) || focusable) &&
    css`
      &:focus-within {
        ${InputLabel} {
          ${focusedLabelStyles};
        }
      }
      &:hover,
      &:focus-within {
        ${!error && focusedStyles};
      }
    `}
`

const TextAreaInput = styled.textarea`
  ${generalInputStyles};
  resize: none;
  overflow: auto;

  line-height: inherit;
  overflow-y: scroll;
  overflow-x: hidden;
`

const textAreaLayout = css`
  height: auto;
  min-height: 6.4rem;
  padding: 0 1.5rem;
  border-radius: ${borderRadius("big")};
`

const TextareaWrapper = styled(InputWrapper)<{
  outlined: boolean
  error: boolean
}>`
  line-height: ${lineHeight("textarea")}rem;

  ${({ outlined }) => outlined && textAreaLayout};
  ${({ error }) => error && errorStyles};

  ${({ outlined }) =>
    outlined &&
    css`
      ${TextAreaInput} {
        margin: 1.2rem 1.6rem;
        padding-right: 0.5rem;
      }
    `}

  ${LeadingIcons}, ${TrailingIcons} {
    align-self: flex-end;
    height: ${({ outlined }) => (outlined ? "6.4rem" : "auto")};
  }
`

const InputIcons: FunctionComponent<InputIconsProps> = ({
  leadingIcons,
  trailingIcons,
}) => {
  return (
    <>
      {leadingIcons && (
        <LeadingIcons>
          {leadingIcons.map((icon, index) => (
            <TextInputIcon key={index} data-testid={`leading-icon-${index}`}>
              {icon}
            </TextInputIcon>
          ))}
        </LeadingIcons>
      )}
      {trailingIcons && (
        <TrailingIcons>
          {trailingIcons.map((icon, index) => (
            <TextInputIcon key={index} data-testid={`trailing-icon-${index}`}>
              {icon}
            </TextInputIcon>
          ))}
        </TrailingIcons>
      )}
    </>
  )
}

export const InputText: FunctionComponent<InputProps> = ({
  className,
  condensed = false,
  outlined = false,
  leadingIcons,
  trailingIcons,
  label,
  disabled,
  readOnly,
  onChange = noop,
  inputRef,
  errorMessage,
  focusable,
  initialTransparentBorder = false,
  ...rest
}) => {
  const standardInput = (
    <LabeledInputWrapper>
      <TextInput
        {...rest}
        placeholder={" "}
        ref={inputRef}
        disabled={disabled}
        readOnly={readOnly}
        onChange={onChange}
      />
      <InputLabel>{label}</InputLabel>
    </LabeledInputWrapper>
  )
  const outlinedInput = (
    <TextInput
      {...rest}
      ref={inputRef}
      placeholder={label}
      disabled={disabled}
      readOnly={readOnly}
      onChange={onChange}
    />
  )

  return (
    <InputWrapper
      className={className}
      outlined={outlined}
      condensed={condensed}
      disabled={disabled}
      readOnly={readOnly}
      error={Boolean(errorMessage)}
      focusable={focusable}
      inputType={rest.type}
      initialTransparentBorder={initialTransparentBorder}
    >
      {outlined ? outlinedInput : standardInput}
      <InputIcons leadingIcons={leadingIcons} trailingIcons={trailingIcons} />
      <InputError visible={Boolean(errorMessage)}>{errorMessage}</InputError>
    </InputWrapper>
  )
}

export const TextArea: FunctionComponent<TextareaProps> = ({
  className,
  leadingIcons,
  trailingIcons,
  disabled,
  readOnly,
  defaultValue,
  maxRows = Infinity,
  onChange = noop,
  value,
  outlined = true,
  label,
  inputRef,
  errorMessage,
  focusable,
  ...rest
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const defaultLineHeight = theme.lineHeight.textarea * 10
  let textareaLineHeight = defaultLineHeight

  // Compute line height in case of customized styling
  if (textareaRef.current) {
    textareaLineHeight =
      parseFloat(getComputedStyle(textareaRef.current).lineHeight) ||
      defaultLineHeight
  }

  const calculateHeight = () => {
    const element = textareaRef.current
    if (element) {
      element.style.height = `${textareaLineHeight}px`
      element.style.height = `${Math.min(
        element.scrollHeight,
        maxRows * textareaLineHeight
      )}px`
    }
  }

  useLayoutEffect(() => {
    calculateHeight()
  }, [value, defaultValue, maxRows])

  const onChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    calculateHeight()
    onChange(event)
  }

  const standardTextarea = (
    <TextAreaInput
      {...rest}
      ref={composeRefs(textareaRef, inputRef)}
      value={value}
      defaultValue={defaultValue}
      disabled={disabled}
      readOnly={readOnly}
      placeholder={label}
      onChange={onChangeHandler}
    />
  )

  const inputLikeTextarea = (
    <LabeledInputWrapper>
      <TextAreaInput
        {...rest}
        ref={composeRefs(textareaRef, inputRef)}
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        readOnly={readOnly}
        placeholder={" "}
        onChange={onChangeHandler}
      />
      <InputLabel>{label}</InputLabel>
    </LabeledInputWrapper>
  )

  return (
    <TextareaWrapper
      className={className}
      disabled={disabled}
      readOnly={readOnly}
      outlined={outlined}
      error={Boolean(errorMessage)}
      focusable={focusable}
    >
      {outlined ? standardTextarea : inputLikeTextarea}
      <InputIcons leadingIcons={leadingIcons} trailingIcons={trailingIcons} />
      <InputError visible={Boolean(errorMessage)}>{errorMessage}</InputError>
    </TextareaWrapper>
  )
}

export const InputPassword: FunctionComponent<InputPasswordProps> = ({
  className,
  inputRef,
  error,
  onChange = noop,
  focusable,
  filled,
  ...rest
}) => {
  return (
    <PasswordInput
      {...rest}
      maxLength={1}
      ref={inputRef}
      filled={filled}
      onChange={onChange}
      data-testid={InputTextTestIds.PasswordInput}
      error={error}
    />
  )
}
