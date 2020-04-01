import React, { ChangeEvent, useEffect, useRef, useState } from "react"
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
  backgroundColor,
  borderColor,
  borderRadius,
  lineHeight as getLineHeight,
  textColor,
} from "Renderer/styles/theming/theme-getters"
import FunctionComponent from "Renderer/types/function-component.interface"
import { noop } from "Renderer/utils/noop"
import styled, { css } from "styled-components"

const focusedLabelStyles = css`
  bottom: 2.4rem;
  ${smallTextSharedStyles};
`

const StandardInputLabel = styled(Text)`
  position: absolute;
  left: 0;
  bottom: 0;
  color: ${textColor("placeholder")};
  ${getTextStyles(TextDisplayStyle.MediumLightText)};
  line-height: 1.5rem;
  pointer-events: none;
  user-select: none;
  transition: ${transition("bottom", "100ms", "ease-in-out")},
    ${transition("font-size", "100ms", "ease-in-out")};
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
  background-color: ${backgroundColor("accent")};
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

const StandardInputWrapper = styled.div`
  position: relative;
  order: 2;
  flex: 1;
  display: flex;
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

  ${getTextStyles(TextDisplayStyle.MediumLightText)};
  line-height: 1.5rem;

  &:not(:placeholder-shown) {
    & + ${StandardInputLabel} {
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

const InputWrapper = styled.label<Partial<InputProps & TextareaProps>>`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: fit-content;
  padding-top: 2rem;
  padding-bottom: 0.8rem;
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

  &:hover:not([disabled]),
  &:focus-within:not([disabled]) {
    ${focusedStyles};
  }

  &:focus-within:not([disabled]) {
    ${StandardInputLabel} {
      ${focusedLabelStyles};
    }
  }
`

const TextAreaInput = styled.textarea<{ inputLike?: boolean }>`
  ${generalInputStyles};
  resize: none;
  overflow: auto;

  line-height: inherit;
  overflow-y: scroll;
  overflow-x: hidden;

  ${({ inputLike }) =>
    !inputLike &&
    css`
      margin: 1.2rem 1.6rem;
      padding-right: 0.5rem;
    `}
`

const textAreaLayout = css`
  ${outlinedStyles};

  height: auto;
  min-height: 6.4rem;
  padding: 0 1.5rem;
  border-radius: ${borderRadius("big")};

  ${LeadingIcons}, ${TrailingIcons} {
    height: 6.4rem;
    align-self: flex-end;
  }
`

const TextareaWrapper = styled(InputWrapper)<{ inputLike?: boolean }>`
  line-height: ${getLineHeight("textarea")}rem;

  ${({ inputLike }) => !inputLike && textAreaLayout};
`

const InputIcons: FunctionComponent<InputIconsProps> = ({
  leadingIcons = [],
  trailingIcons = [],
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
  placeholder,
  disabled,
  ...rest
}) => {
  const standardInput = (
    <StandardInputWrapper>
      <TextInput placeholder={" "} disabled={disabled} {...rest} />
      <StandardInputLabel>{placeholder}</StandardInputLabel>
    </StandardInputWrapper>
  )
  const outlinedInput = (
    <TextInput placeholder={placeholder} disabled={disabled} {...rest} />
  )

  return (
    <InputWrapper
      className={className}
      outlined={outlined}
      condensed={condensed}
      disabled={disabled}
    >
      {outlined ? outlinedInput : standardInput}
      <InputIcons leadingIcons={leadingIcons} trailingIcons={trailingIcons} />
    </InputWrapper>
  )
}

export const TextArea: FunctionComponent<TextareaProps> = ({
  className,
  leadingIcons,
  trailingIcons,
  disabled,
  defaultValue,
  maxRows = 0,
  onChange = noop,
  value,
  inputLike,
  ...rest
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [rowsCount, setRowsCount] = useState(1)

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
      const lines = Math.ceil(element.scrollHeight / textareaLineHeight)
      const rows = maxRows ? Math.min(Math.max(maxRows, 1), lines) : lines
      setRowsCount(rows)
    }
  }

  /*
   Float value will always trigger re-render as calculateHeight() always set
   rowsCount to integer value (so they'll be always different).
   Otherwise, rowsCount set by resetRowsCount() and then by calculateHeight()
   could be the same, which doesn't trigger re-render and will cause a bug.
  */
  const resetRowsCount = () => setRowsCount(1.1)

  useEffect(() => {
    resetRowsCount()
  }, [value, defaultValue])

  useEffect(() => {
    calculateHeight()
  }, [rowsCount, maxRows])

  const onChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    resetRowsCount()
    onChange(event)
  }

  return (
    <TextareaWrapper
      className={className}
      disabled={disabled}
      inputLike={inputLike}
    >
      <TextAreaInput
        ref={textareaRef}
        value={value || defaultValue}
        rows={rowsCount}
        disabled={disabled}
        onChange={onChangeHandler}
        inputLike={inputLike}
        {...rest}
      />
      <InputIcons leadingIcons={leadingIcons} trailingIcons={trailingIcons} />
    </TextareaWrapper>
  )
}
