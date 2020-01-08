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
import {
  backgroundColor,
  borderColor,
  borderRadius,
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

const TextAreaInput = styled.textarea<{ maxHeight: number }>`
  ${generalInputStyles};
  resize: none;
  overflow: auto;
  margin: 1.2rem 1.6rem;
  line-height: 1.8rem;
  overflow-y: scroll;
  overflow-x: hidden;
  padding-right: 0.5rem;

  ${({ maxHeight }) =>
    maxHeight &&
    css`
      max-height: ${maxHeight / 10}rem;
    `};
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

const TextareaWrapper = styled(InputWrapper)`
  ${textAreaLayout};
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
  maxRows,
  onChange = noop,
  value,
  ...rest
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [innerValue, setInnerValue] = useState(value || defaultValue)
  const [rows, setRows] = useState(1)
  const [maxHeight, setMaxHeight] = useState(0)

  useEffect(() => {
    setInnerValue(value)
  }, [value])

  useEffect(() => {
    const element = textareaRef && textareaRef.current
    if (element) {
      const { scrollHeight } = element
      const lineHeight = parseInt(getComputedStyle(element).lineHeight, 0)
      const rowsCount = Math.ceil(scrollHeight / lineHeight)
      element.style.height = "auto"
      setRows(rowsCount)
    }
  }, [innerValue])

  useEffect(() => {
    if (maxRows) {
      const element = textareaRef && textareaRef.current
      if (element) {
        const lineHeight = parseInt(getComputedStyle(element).lineHeight, 0)
        setMaxHeight(lineHeight * maxRows)
      }
    }
  }, [maxRows])

  const onChangeWrapper = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setRows(1)
    setInnerValue(event.target.value)
    onChange(event)
  }

  return (
    <TextareaWrapper className={className} disabled={disabled}>
      <TextAreaInput
        ref={textareaRef}
        value={innerValue}
        rows={rows}
        disabled={disabled}
        maxHeight={maxHeight}
        onChange={onChangeWrapper}
        {...rest}
      />
      <InputIcons leadingIcons={leadingIcons} trailingIcons={trailingIcons} />
    </TextareaWrapper>
  )
}
