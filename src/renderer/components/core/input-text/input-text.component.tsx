import React, { InputHTMLAttributes, ReactElement, ReactNode } from "react"
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

const StandardInputLabel = styled(Text)`
  position: absolute;
  left: 0;
  bottom: 0;
  color: ${textColor("placeholder")};
  ${getTextStyles(TextDisplayStyle.MediumLightText)};
  line-height: 1.5rem;
  pointer-events: none;
  user-select: none;
  transition: bottom 0.1s ease-in-out, font-size 0.1s ease-in-out;
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

const TextInput = styled.input`
  appearance: none;
  border: none;
  outline: none;
  flex: 1;
  order: 2;
  border-radius: inherit;
  background-color: transparent;
  padding: 0;
  color: ${textColor("dark")};
  user-select: none;

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

const outlinedLayout = css`
  height: 4rem;
  padding: 0 2.4rem;
  border: 0.1rem solid ${borderColor("default")};
  border-radius: ${borderRadius("medium")}rem;

  ${TextInputIcon} {
    + ${TextInputIcon} {
      margin-left: 1.2rem;
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
  }
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

const InputWrapper = styled.label<{
  layout: TextInputLayouts
  condensed: boolean
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
      layout={layout}
      condensed={condensed}
      disabled={disabled}
    >
      {layout === TextInputLayouts.Standard ? standardInput : outlinedInput}
      {Boolean(leadingIcons.length) && (
        <LeadingIcons>
          {leadingIcons.map((icon, index) => (
            <TextInputIcon key={index} data-testid={"leading-icon-" + index}>
              {icon}
            </TextInputIcon>
          ))}
        </LeadingIcons>
      )}
      {Boolean(trailingIcons.length) && (
        <TrailingIcons>
          {trailingIcons.map((icon, index) => (
            <TextInputIcon key={index} data-testid={"trailing-icon-" + index}>
              {icon}
            </TextInputIcon>
          ))}
        </TrailingIcons>
      )}
    </InputWrapper>
  )
}

export default InputText
