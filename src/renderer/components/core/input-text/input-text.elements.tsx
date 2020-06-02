import React, { ChangeEvent, useLayoutEffect, useRef } from "react"
import {
  InputIconsProps,
  InputProps,
  TextareaProps,
} from "Renderer/components/core/input-text/input-text.interface"
import Text, {
  getTextStyles,
  smallTextSharedStyles,
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import transition from "Renderer/styles/functions/transition"
import theme from "Renderer/styles/theming/theme"
import {
  borderColor,
  borderRadius,
  lineHeight,
  textColor,
  transitionTime,
  transitionTimingFunction,
} from "Renderer/styles/theming/theme-getters"
import FunctionComponent from "Renderer/types/function-component.interface"
import { noop } from "Renderer/utils/noop"
import styled, { css } from "styled-components"
import composeRefs from "@seznam/compose-react-refs"

const focusedLabelStyles = css`
  top: -2rem;
  ${smallTextSharedStyles};
`

const InputLabel = styled(Text)`
  position: absolute;
  left: 0;
  top: 0.3rem;
  color: ${textColor("placeholder")};
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
  padding-left: 0.8rem;
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
  border: 0.1rem solid ${borderColor("default")};
  border-radius: ${borderRadius("medium")};
`

const condensedStyles = css`
  padding: 0 1.3rem;
`

const focusedStyles = css`
  border-color: ${borderColor("dark")};
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
`

const TextInputIcon = styled.span`
  height: 100%;
  max-height: 6.4rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  user-select: none;
`

const generalInputStyles = css`
  appearance: none;
  border: none;
  outline: none;
  flex: 1;
  order: 2;
  background-color: transparent;
  padding: 0;
  color: ${textColor("dark")};
  width: 100%;

  ${getTextStyles(TextDisplayStyle.MediumLightText)};
  line-height: 1.5rem;

  &:not(:placeholder-shown) {
    & + ${InputLabel} {
      ${focusedLabelStyles};
    }
  }

  ::placeholder {
    color: ${textColor("placeholder")};
  }
`

const TextInput = styled.input`
  ${generalInputStyles};
  user-select: none;
`

const InputWrapper = styled.label<
  Partial<InputProps & TextareaProps> & { error: boolean }
>`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding-top: 2rem;
  padding-bottom: 0.6rem;
  box-sizing: border-box;
  border-bottom: 0.1rem solid ${borderColor("default")};
  transition: ${transition("border-color", "100ms", "ease-in-out")};

  ${TextInputIcon} {
    + ${TextInputIcon} {
      margin-left: 1.2rem;
    }
  }

  ${({ outlined }) => outlined && outlinedStyles};
  ${({ condensed }) => condensed && condensedStyles};
  ${({ disabled }) => disabled && disabledStyles};
  ${({ error }) => error && errorStyles};

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
            <TextInputIcon key={index} data-testid={"trailing-icon-" + index}>
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
      element.style.height = textareaLineHeight + "px"
      element.style.height =
        Math.min(element.scrollHeight, maxRows * textareaLineHeight) + "px"
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
