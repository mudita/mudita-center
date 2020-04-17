import React, {
  useState,
  MouseEvent,
  useRef,
  useEffect,
  ChangeEvent,
} from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled, { css } from "styled-components"
import { InputText } from "Renderer/components/core/input-text/input-text.elements"
import Icon from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import {
  backgroundColor,
  borderColor,
  borderRadius,
  boxShadowColor,
  transitionTime,
  transitionTimingFunction,
  zIndex,
} from "Renderer/styles/theming/theme-getters"
import { noop } from "Renderer/utils/noop"
import { mediumTextSharedStyles } from "Renderer/components/core/text/text.component"

const ToggleIcon = styled.span<{ rotated?: boolean }>`
  cursor: pointer;
  transition: transform ${transitionTime("faster")}
    ${transitionTimingFunction("smooth")};

  transform: rotateZ(${({ rotated }) => (rotated ? 180 : 0)}deg);
`

const ResetIcon = styled.span`
  cursor: pointer;
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
      opacity: 0.7;
    `}
`

const Input = styled(InputText)``

const SelectInputList = styled.ul<{ focused?: boolean }>`
  z-index: ${zIndex("dropdown")};
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  list-style: none;
  background-color: ${backgroundColor("light")};
  box-shadow: 0 5px 15px 0 ${boxShadowColor("lightGrey")};
  border-radius: ${borderRadius("medium")};
  margin: 0;
  padding: 0;
  margin-top: 0.8rem;
  transform: translateY(-0.8rem);
  opacity: 0;
  visibility: hidden;
  transition: all ${transitionTime("faster")}
    ${transitionTimingFunction("smooth")};

  ${({ focused }) =>
    focused &&
    css`
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    `};
`

const SelectInputWrapper = styled.div<{
  focused?: boolean
  searchable?: boolean
}>`
  position: relative;

  input {
    ${({ searchable }) =>
      !searchable &&
      css`
        cursor: pointer;
      `}
  }
`

export interface InputSelectProps {
  value?: any
  options: any[]
  emptyOption?: any
  searchable?: boolean
  outlined?: boolean
  valueRenderer?: (item: any) => string
  listItemRenderer?: (item: any) => string | JSX.Element
  onSelect?: (option: any) => void
  onFilter?: (value: string) => void
}

const InputSelect: FunctionComponent<InputSelectProps> = ({
  className,
  value = "",
  options,
  emptyOption,
  searchable,
  outlined = searchable,
  valueRenderer = (item: string) => item,
  listItemRenderer = (item: string) => item,
  onSelect = noop,
  onFilter = noop,
}) => {
  const [inputValue, setInputValue] = useState(value)
  const [focused, setFocusedState] = useState(false)
  const selectInput = useRef(null)

  const slideDown = () => {
    setFocusedState(true)
  }

  const slideUp = () => {
    setFocusedState(false)
  }

  const preventClick = (e: MouseEvent) => e.preventDefault()

  const toggleList = () => (focused ? slideUp() : slideDown())

  useEffect(() => {
    const label = selectInput.current
    if (label) {
      const input = (label as HTMLLabelElement).querySelector("input")
      if (input) {
        focused ? input.focus() : input.blur()
      }
    }
  }, [focused, selectInput.current])

  const resetInputValue = (e: MouseEvent) => {
    setInputValue("")
    onFilter("")
    onSelect("")
    e.preventDefault()
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    onFilter(e.target.value)
  }

  const selectEmptyOption = () => {
    onSelect("")
  }

  useEffect(() => {
    setInputValue(value)
  }, [value])

  const toggleIcon = (
    <ToggleIcon
      rotated={focused}
      onMouseDown={toggleList}
      data-testid="actionIcon"
    >
      <Icon width={1} type={Type.ArrowDown} />
    </ToggleIcon>
  )

  const resetIcon = inputValue && (
    <ResetIcon onMouseDown={resetInputValue} data-testid="actionIcon">
      <Icon width={1.2} type={Type.Close} />
    </ResetIcon>
  )

  return (
    <SelectInputWrapper
      className={className}
      focused={focused}
      searchable={searchable}
      ref={selectInput}
      onClick={preventClick}
    >
      <Input
        type="text"
        value={valueRenderer(inputValue) || emptyOption}
        onChange={handleInputChange}
        outlined={outlined}
        trailingIcons={[searchable ? resetIcon : toggleIcon]}
        onFocus={slideDown}
        onBlur={slideUp}
        readOnly={!searchable}
      />
      <SelectInputList focused={focused}>
        {emptyOption && (
          <SelectInputItem onClick={selectEmptyOption} empty>
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
