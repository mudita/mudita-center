import React, { useState, MouseEvent, useRef, ComponentProps } from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled, { css, FlattenSimpleInterpolation } from "styled-components"
import { InputText } from "Renderer/components/core/input-text/input-text.elements"
import Icon from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import {
  backgroundColor,
  borderColor,
  borderRadius,
  boxShadowColor,
  textColor,
  transitionTime,
  transitionTimingFunction,
  zIndex,
} from "Renderer/styles/theming/theme-getters"
import { noop } from "Renderer/utils/noop"
import { mediumTextSharedStyles } from "Renderer/components/core/text/text.component"
import { InputProps } from "Renderer/components/core/input-text/input-text.interface"
import composeRefs from "@seznam/compose-react-refs/composeRefs"

const ToggleIcon = styled.span<{ rotated?: boolean }>`
  cursor: pointer;
  transition: transform ${transitionTime("faster")}
    ${transitionTimingFunction("smooth")};

  transform: rotateZ(${({ rotated }) => (rotated ? 180 : 0)}deg);
`

const SelectInputItem = styled.li<{ empty?: boolean; selected?: boolean }>`
  cursor: pointer;
  padding: 1.2rem 2.4rem;
  ${mediumTextSharedStyles};
  font-weight: 300;

  :not(:last-of-type) {
    border-bottom: solid ${borderColor("listItem")} 0.1rem;
  }

  &:hover {
    background-color: ${backgroundColor("accent")};
  }

  ${({ empty }) =>
    empty &&
    css`
      color: ${textColor("placeholder")};
    `}

  ${({ selected }) =>
    selected &&
    css`
      background-color: ${backgroundColor("accent")};
    `};
`

const SelectInputList = styled.ul<{
  expanded?: boolean
  listStyles?: FlattenSimpleInterpolation
}>`
  z-index: ${zIndex("dropdown")};
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  list-style: none;
  background-color: ${backgroundColor("light")};
  box-shadow: 0 0.5rem 1.5rem 0 ${boxShadowColor("lightGrey")};
  border-radius: ${borderRadius("medium")};
  margin: 0;
  padding: 0;
  margin-top: 0.8rem;
  transform: translateY(-0.8rem);
  opacity: 0;
  visibility: hidden;
  transition: all ${transitionTime("faster")}
    ${transitionTimingFunction("smooth")};
  overflow: auto;

  ${({ listStyles }) =>
    css`
      ${listStyles}
    `};

  ${({ expanded }) =>
    expanded &&
    css`
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    `};
`

const SelectInputWrapper = styled.div`
  position: relative;

  label,
  input {
    cursor: pointer;
    user-select: none;
  }
`

type InputValue = string | number

export interface InputSelectProps extends Partial<InputProps> {
  value?: any
  options: any[]
  emptyOption?: any
  renderEmptyOption?: (item: any) => InputValue
  renderValue?: (item: any) => InputValue
  renderListItem?: (item: any) => InputValue | JSX.Element
  onSelect?: (option: any) => void
  listStyles?: FlattenSimpleInterpolation
}

const InputSelectComponent: FunctionComponent<InputSelectProps> = ({
  className,
  value = "",
  options,
  emptyOption = "",
  renderEmptyOption = (item: string) => item,
  renderValue = (item: string) => item,
  renderListItem = (item: string) => item,
  onSelect = noop,
  listStyles,
  inputRef,
  ...rest
}) => {
  const [expanded, setExpansion] = useState(false)
  const selectRef = useRef<HTMLInputElement>(null)

  const focusIn = () => setExpansion(true)
  const focusOut = () => setExpansion(false)
  const resetSelection = () => onSelect("")

  const toggleList = (event: MouseEvent) => {
    event.stopPropagation()
    event.preventDefault()

    if (selectRef.current) {
      expanded ? selectRef.current.blur() : selectRef.current.focus()
    }
  }

  const preventExpanding = (event: MouseEvent) => {
    if (expanded) {
      event.stopPropagation()
      event.preventDefault()
    }
  }

  const toggleIcon = (
    <ToggleIcon
      rotated={expanded}
      onClick={toggleList}
      onMouseDown={preventExpanding}
      data-testid="actionIcon"
    >
      <Icon width={1} type={Type.ArrowDown} />
    </ToggleIcon>
  )

  return (
    <SelectInputWrapper className={className}>
      <InputText
        {...rest}
        type="text"
        value={renderValue(value) || ""}
        trailingIcons={[toggleIcon]}
        onFocus={focusIn}
        onBlur={focusOut}
        readOnly
        inputRef={composeRefs(selectRef, inputRef)}
      />
      <SelectInputList expanded={expanded} listStyles={listStyles}>
        {emptyOption && (
          <SelectInputItem onClick={resetSelection} empty>
            {renderEmptyOption(emptyOption)}
          </SelectInputItem>
        )}
        {options.map((option, index) => {
          const selectOption = () => onSelect(option)
          return (
            <SelectInputItem
              key={index}
              onClick={selectOption}
              selected={option === value}
            >
              {renderListItem(option)}
            </SelectInputItem>
          )
        })}
      </SelectInputList>
    </SelectInputWrapper>
  )
}

const InputSelect = React.forwardRef<
  HTMLInputElement,
  ComponentProps<typeof InputSelectComponent>
>((props, ref) => <InputSelectComponent {...props} inputRef={ref} />)

export default InputSelect
