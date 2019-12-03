import uniqueId from "lodash/uniqueId"
import React, {
  ChangeEvent,
  FocusEvent,
  InputHTMLAttributes,
  ReactElement,
  ReactNode,
  useState,
} from "react"
import Text, {
  getTextStyles,
  smallTextSharedStyles,
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import {
  backgroundColor,
  borderColor,
  borderRadius,
  textColor,
} from "Renderer/styles/theming/theme-getters"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled, { css } from "styled-components"

const focusedLabelStyles = css`
  bottom: 2.4rem;
  ${smallTextSharedStyles};
`

const StandardInputLabel = styled(Text)<{
  active: boolean
}>`
  position: absolute;
  left: 0;
  bottom: 0;
  color: ${textColor("placeholder")};
  ${getTextStyles(TextDisplayStyle.MediumLightText)};
  line-height: 1.5rem;
  pointer-events: none;
  user-select: none;
  transition: bottom 0.1s ease-in-out, font-size 0.1s ease-in-out;

  ${({ active }) => active && focusedLabelStyles};
`

const StandardInputWrapper = styled.div`
  position: relative;
`

const TextInputIcon = styled.span`
  height: 100%;
  max-height: 6.4rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  user-select: none;
`

const TextInput = styled.input`
  appearance: none;
  border: none;
  outline: none;
  flex: 1;
  border-radius: inherit;
  background-color: transparent;
  padding: 0;
  color: ${textColor("dark")};
  user-select: none;

  ::placeholder {
    color: ${textColor("placeholder")};
  }

  ${getTextStyles(TextDisplayStyle.MediumLightText)};
  line-height: 1.5rem;
`

const outlinedLayout = css`
  height: 4rem;
  padding: 0 2.4rem;
  border: 0.1rem solid ${borderColor("default")};
  border-radius: ${borderRadius("medium")}rem;

  ${TextInputIcon} {
    + ${TextInputIcon} {
      margin-left: 1.2rem;
    }
    + ${TextInput} {
      margin-left: 0.8rem;
    }
  }

  ${TextInput} {
    + ${TextInputIcon} {
      margin-left: 0.8rem;
    }
  }
`

const standardLayout = css`
  padding-top: 2rem;
  padding-bottom: 0.8rem;
  border-bottom: 0.1rem solid ${borderColor("default")};

  ${TextInputIcon} {
    + ${TextInputIcon} {
      margin-left: 1.2rem;
    }
    + ${StandardInputWrapper} {
      margin-left: 0.8rem;
    }
  }

  ${StandardInputWrapper} {
    + ${TextInputIcon} {
      margin-left: 0.8rem;
    }
  }
`

const condensedStyles = css`
  padding: 0 1.6rem;
`

const focusedStyles = css`
  border-color: ${borderColor("dark")};

  ${StandardInputLabel} {
    ${focusedLabelStyles};
  }
`

const disabledStyles = css`
  background-color: ${backgroundColor("accent")};
`

const InputWrapper = styled.label<{
  layout: TextInputLayouts
  condensed: boolean
  focused: boolean
  disabled?: boolean
}>`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: fit-content;
  box-sizing: border-box;
  transition: border-color 0.1s ease-in-out;

  ${({ layout }) => {
    switch (layout) {
      case TextInputLayouts.Outlined:
        return outlinedLayout
      case TextInputLayouts.Standard:
        return standardLayout
    }
  }}

  ${({ condensed }) => condensed && condensedStyles};
  ${({ focused }) => focused && focusedStyles};
  ${({ disabled }) => disabled && disabledStyles}
`

export enum TextInputLayouts {
  Standard,
  Outlined,
}

interface TextInputProps {
  layout?: TextInputLayouts
  condensed?: boolean
  leadingIcons?: ReactElement[]
  trailingIcons?: ReactNode[]
}

const InputText: FunctionComponent<TextInputProps &
  InputHTMLAttributes<HTMLInputElement>> = ({
  className,
  layout = TextInputLayouts.Standard,
  condensed = false,
  leadingIcons = [],
  trailingIcons = [],
  placeholder,
  disabled,
  onChange,
  onFocus,
  onBlur,
  defaultValue,
  value,
  ...rest
}) => {
  const [uid] = useState(uniqueId("input-text"))
  const [focused, setFocus] = useState(false)
  const [labelActive, setLabelActiveState] = useState(
    Boolean(
      (value && value.toString().length) ||
        (defaultValue && defaultValue.toString().length)
    )
  )

  const onChangeWrapper = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event
    setLabelActiveState(Boolean(target.value.length))
    if (onChange) {
      onChange(event)
    }
  }

  const onFocusWrapper = (event: FocusEvent<HTMLInputElement>) => {
    setFocus(true)
    if (onFocus) {
      onFocus(event)
    }
  }

  const onBlurWrapper = (event: FocusEvent<HTMLInputElement>) => {
    setFocus(false)
    if (onBlur) {
      onBlur(event)
    }
  }

  const standardInput = (
    <StandardInputWrapper>
      <TextInput
        onFocus={onFocusWrapper}
        onBlur={onBlurWrapper}
        onChange={onChangeWrapper}
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        id={uid}
        {...rest}
      />
      <StandardInputLabel active={labelActive}>
        {placeholder}
      </StandardInputLabel>
    </StandardInputWrapper>
  )

  const outlinedInput = (
    <TextInput
      placeholder={placeholder}
      onFocus={onFocusWrapper}
      onBlur={onBlurWrapper}
      onChange={onChange}
      value={value}
      defaultValue={defaultValue}
      disabled={disabled}
      id={uid}
      {...rest}
    />
  )
  return (
    <InputWrapper
      className={className}
      layout={layout}
      condensed={condensed}
      focused={focused}
      disabled={disabled}
      htmlFor={uid}
    >
      {leadingIcons.map((icon, index) => (
        <TextInputIcon key={index} data-testid={"leading-icon-" + index}>
          {icon}
        </TextInputIcon>
      ))}
      {layout === TextInputLayouts.Standard ? standardInput : outlinedInput}
      {trailingIcons.map((icon, index) => (
        <TextInputIcon key={index} data-testid={"trailing-icon-" + index}>
          {icon}
        </TextInputIcon>
      ))}
    </InputWrapper>
  )
}

export default InputText
