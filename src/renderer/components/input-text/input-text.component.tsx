import React, {
  ChangeEvent,
  FocusEvent,
  InputHTMLAttributes,
  ReactNode,
  useState,
} from "react"
import {
  getTextStyles,
  smallTextSharedStyles,
  TextDisplayStyle,
} from "Renderer/components/text/text.component"
import {
  backgroundColor,
  borderColor,
  borderRadius,
  textColor,
} from "Renderer/styles/theming/theme-getters"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled, { css } from "styled-components"

const focusedLabelStyles = css`
  bottom: 24px;
  ${smallTextSharedStyles};
`

const FilledInputLabel = styled.label<{
  active: boolean
}>`
  position: absolute;
  left: 0;
  bottom: 0;

  color: ${textColor("placeholder")};
  ${getTextStyles(TextDisplayStyle.MediumLightText)};
  line-height: 1.5rem;

  pointer-events: none;
  transition: bottom 0.1s ease-in-out, font-size 0.1s ease-in-out;

  ${({ active }) => active && focusedLabelStyles};
`

const FilledInputWrapper = styled.div`
  position: relative;
`

const TextInputIcon = styled.div`
  height: 100%;
  max-height: 64px;

  display: flex;
  flex-direction: row;
  align-items: center;
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

  ::-webkit-input-placeholder {
    color: ${textColor("placeholder")};
  }
  ::-moz-placeholder {
    color: ${textColor("placeholder")};
  }
  :-ms-input-placeholder {
    color: ${textColor("placeholder")};
  }
  :-moz-placeholder {
    color: ${textColor("placeholder")};
  }

  ${getTextStyles(TextDisplayStyle.MediumLightText)};
  line-height: 1.5rem;
`

const outlinedLayout = css`
  height: 40px;
  padding: 0 24px;

  border: 1px solid ${borderColor("default")};
  border-radius: ${borderRadius("medium")}px;

  ${TextInputIcon} {
    + ${TextInputIcon} {
      margin-left: 12px;
    }
    + ${TextInput} {
      margin-left: 8px;
    }
  }

  ${TextInput} {
    + ${TextInputIcon} {
      margin-left: 8px;
    }
  }
`

const outlinedCondensedLayout = css`
  ${outlinedLayout};
  padding: 0 16px;
`

const filledLayout = css`
  padding-top: 20px;
  padding-bottom: 8px;
  border-bottom: 1px solid ${borderColor("default")};

  ${TextInputIcon} {
    + ${TextInputIcon} {
      margin-left: 12px;
    }
    + ${FilledInputWrapper} {
      margin-left: 8px;
    }
  }

  ${FilledInputWrapper} {
    + ${TextInputIcon} {
      margin-left: 8px;
    }
  }
`

const InputWrapper = styled.div<{
  layout: TextInputLayouts
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
      case TextInputLayouts.OutlinedCondensed:
        return outlinedCondensedLayout
      case TextInputLayouts.Filled:
        return filledLayout
    }
  }}

  ${({ focused }) =>
    focused &&
    css`
      border-color: ${borderColor("dark")};

      ${FilledInputLabel} {
        ${focusedLabelStyles};
      }
    `};

  ${({ disabled }) =>
    disabled &&
    css`
      background-color: ${backgroundColor("accent")};
    `}
`

export enum TextInputLayouts {
  Outlined,
  OutlinedCondensed,
  Filled,
}

interface TextInputProps {
  layout: TextInputLayouts
  leadingIcons?: ReactNode[]
  trailingIcons?: ReactNode[]
}

const InputText: FunctionComponent<TextInputProps &
  InputHTMLAttributes<HTMLInputElement>> = ({
  className,
  layout = TextInputLayouts.Outlined,
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

  const filledInput = (
    <FilledInputWrapper>
      <TextInput
        onFocus={onFocusWrapper}
        onBlur={onBlurWrapper}
        onChange={onChangeWrapper}
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        {...rest}
      />
      <FilledInputLabel active={labelActive}>{placeholder}</FilledInputLabel>
    </FilledInputWrapper>
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
      {...rest}
    />
  )
  return (
    <InputWrapper
      className={className}
      layout={layout}
      focused={focused}
      disabled={disabled}
    >
      {leadingIcons.map((icon, index) => (
        <TextInputIcon key={index}>{icon}</TextInputIcon>
      ))}
      {layout === TextInputLayouts.Filled ? filledInput : outlinedInput}
      {trailingIcons.map((icon, index) => (
        <TextInputIcon key={index}>{icon}</TextInputIcon>
      ))}
    </InputWrapper>
  )
}

export default InputText
