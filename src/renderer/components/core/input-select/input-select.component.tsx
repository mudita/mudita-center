import React, {
  useState,
  MouseEvent,
  FocusEvent,
  useRef,
  ComponentProps,
  ChangeEvent,
  useEffect,
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
import composeRefs from "@seznam/compose-react-refs/composeRefs"

const ToggleIcon = styled.span<{ rotated?: boolean }>`
  cursor: pointer;
  transition: transform ${transitionTime("faster")}
    ${transitionTimingFunction("smooth")};

  transform: rotateZ(${({ rotated }) => (rotated ? 180 : 0)}deg);
`

export const SelectInputItem = styled.li<{
  empty?: boolean
  selected?: boolean
}>`
  cursor: pointer;
  padding: 1.2rem 2.4rem;
  ${mediumTextSharedStyles};
  font-weight: 300;

  :not(:last-of-type) {
    border-bottom: solid ${borderColor("list")} 0.1rem;
  }

  &:hover {
    background-color: ${backgroundColor("minor")};
  }

  ${({ empty }) =>
    empty &&
    css`
      color: ${textColor("secondary")};
    `}

  ${({ selected }) =>
    selected &&
    css`
      background-color: ${backgroundColor("minor")};
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
  background-color: ${backgroundColor("row")};
  box-shadow: 0 0.5rem 1.5rem 0 ${boxShadowColor("light")};
  border-radius: ${borderRadius("medium")};
  margin: 0;
  padding: 0;
  margin-top: 0.8rem;
  transform: translateY(-0.8rem);
  opacity: 0;
  visibility: hidden;
  transition: all ${transitionTime("veryQuick")}
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

const LightPhrase = styled.span`
  opacity: 0.5;
`

export const renderSearchableText = (text: string, search: string) => {
  const substrings = text
    .replace(new RegExp(`(${search})`, "gi"), `/$1/`)
    .split("/")

  return (
    <React.Fragment key={text}>
      {Boolean(search)
        ? substrings.map((substring, index) =>
            substring.toLowerCase() === search.toLowerCase() ? (
              <strong key={index}>{substring}</strong>
            ) : (
              <LightPhrase key={index}>{substring}</LightPhrase>
            )
          )
        : text}
    </React.Fragment>
  )
}

type InputValue = string | number

type RenderableListItem = InputValue | JSX.Element

export type ListItemProps = {
  onClick: (option: any) => void
  selected: boolean
}

export interface RenderListItemProps<T> {
  item: T
  props: ListItemProps
  searchString: string
}

export interface InputSelectProps extends Partial<InputProps> {
  value?: any
  options: any[]
  emptyOption?: any
  renderEmptyOption?: (item: any) => InputValue
  renderValue?: (item: any) => InputValue
  renderListItem?: ({
    item,
    props,
    searchString,
  }: RenderListItemProps<any>) => RenderableListItem
  filteringFunction?: (option: any, searchString: string) => boolean
  onSelect?: (option: any) => void
  listStyles?: FlattenSimpleInterpolation
  searchable?: boolean
}

const InputSelectComponent: FunctionComponent<InputSelectProps> = ({
  className,
  value = "",
  options,
  emptyOption = "",
  renderEmptyOption = (item: string) => item,
  renderValue = (item: string) => item,
  renderListItem = ({ item, props, searchString }) => (
    <SelectInputItem {...props}>
      {renderSearchableText(item, searchString)}
    </SelectInputItem>
  ),
  filteringFunction = (option, search) =>
    option.toLowerCase().includes(search.toLowerCase()),
  onSelect = noop,
  listStyles,
  inputRef,
  searchable,
  onBlur = noop,
  onFocus = noop,
  ...rest
}) => {
  const [expanded, setExpansion] = useState(false)
  const [searchValue, setSearchValue] = useState<string | null>(null)
  const selectRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  const resetSelection = () => onSelect("")

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    onBlur(event)
    setExpansion(false)
    if (searchValue !== null) {
      onSelect("")
    }
  }

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    onFocus(event)
    setExpansion(true)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }

  const filteredOptions = searchable
    ? options.filter((option) => filteringFunction(option, searchValue || ""))
    : options

  const resetSearchValue = () => setSearchValue(null)

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

  useEffect(() => {
    if (listRef.current) {
      listRef.current.addEventListener("transitionend", resetSearchValue)
    }
    return () => {
      if (listRef.current) {
        listRef.current.removeEventListener("transitionend", resetSearchValue)
      }
    }
  }, [])

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
        value={searchValue !== null ? searchValue : renderValue(value) || ""}
        trailingIcons={[toggleIcon]}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        inputRef={composeRefs(selectRef, inputRef)}
        readOnly={!searchable}
        focusable
      />
      <SelectInputList
        expanded={expanded}
        listStyles={listStyles}
        ref={listRef}
      >
        {emptyOption && (
          <SelectInputItem onClick={resetSelection} empty>
            {renderEmptyOption(emptyOption)}
          </SelectInputItem>
        )}
        {filteredOptions.map((option, index) => {
          const onClick = () => onSelect(option)
          const selected = option === value
          return (
            <React.Fragment key={index}>
              {renderListItem({
                item: option,
                props: {
                  onClick,
                  selected,
                },
                searchString: searchValue || "",
              })}
            </React.Fragment>
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
