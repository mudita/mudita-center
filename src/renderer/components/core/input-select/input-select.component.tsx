import React, {
  useState,
  MouseEvent,
  useRef,
  useEffect,
  ChangeEvent,
} from "react"
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

const ToggleIcon = styled.span<{ rotated?: boolean }>`
  cursor: pointer;
  transition: transform ${transitionTime("faster")}
    ${transitionTimingFunction("smooth")};

  transform: rotateZ(${({ rotated }) => (rotated ? 180 : 0)}deg);
`

const SelectInputItem = styled.li<{ empty?: boolean }>`
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

export interface InputSelectProps extends Partial<InputProps> {
  value?: any
  options: any[]
  emptyOption?: any
  valueRenderer?: (item: any) => string
  listItemRenderer?: (item: any) => string | JSX.Element
  onSelect?: (option: any) => void
  listStyles?: FlattenSimpleInterpolation
}

const InputSelect: FunctionComponent<InputSelectProps> = ({
  className,
  value = "",
  options,
  emptyOption = "",
  valueRenderer = (item: string) => item,
  listItemRenderer = (item: string) => item,
  onSelect = noop,
  listStyles,
  ...rest
}) => {
  const [expanded, setExpansion] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const focusIn = () => setExpansion(true)

  const focusOut = () => setExpansion(false)

  const toggleList = (e: MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()

    if (inputRef.current) {
      expanded ? inputRef.current.blur() : inputRef.current.focus()
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const resetSelection = () => {
    onSelect("")
  }

  const preventExpanding = (e: MouseEvent) => {
    if (expanded) {
      e.stopPropagation()
      e.preventDefault()
    }
  }

  useEffect(() => {
    setInputValue(value)
  }, [value])

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
        value={valueRenderer(inputValue) || ""}
        onChange={handleInputChange}
        trailingIcons={[toggleIcon]}
        onFocus={focusIn}
        onBlur={focusOut}
        readOnly
        inputRef={inputRef}
      />
      <SelectInputList expanded={expanded} listStyles={listStyles}>
        {emptyOption && (
          <SelectInputItem onClick={resetSelection} empty>
            {emptyOption}
          </SelectInputItem>
        )}
        {options.map((option, index) => {
          const selectOption = () => {
            onSelect(option)
          }
          return (
            <SelectInputItem key={index} onClick={selectOption}>
              {listItemRenderer(option)}
            </SelectInputItem>
          )
        })}
      </SelectInputList>
    </SelectInputWrapper>
  )
}

export default InputSelect
