/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, {
  ChangeEvent,
  ComponentProps,
  FocusEvent,
  Fragment,
  KeyboardEvent,
  MouseEvent,
  useRef,
  useState,
} from "react"
import styled, { FlattenSimpleInterpolation } from "styled-components"
import { noop } from "App/__deprecated__/renderer/utils/noop"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { InputText } from "App/__deprecated__/renderer/components/core/input-text/input-text.elements"
import Icon from "App/__deprecated__/renderer/components/core/icon/icon.component"
import {
  transitionTime,
  transitionTimingFunction,
  textColor,
} from "App/__deprecated__/renderer/styles/theming/theme-getters"
import { InputProps } from "App/__deprecated__/renderer/components/core/input-text/input-text.interface"
import composeRefs from "@seznam/compose-react-refs/composeRefs"
import {
  ItemValue,
  List,
  ListItem,
  RenderListItem,
  renderListItemSearchable,
} from "App/__deprecated__/renderer/components/core/list/list.component"
import { defineMessages } from "react-intl"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"

export enum InputSearchTestIds {
  Icon = "input-select-icon",
  List = "input-select-list",
  ListItem = "input-select-list-item",
}

const messages = defineMessages({
  noResults: { id: "component.inputSelectNoResults" },
})

const ToggleIcon = styled.span<{ rotated?: boolean }>`
  cursor: pointer;
  transition: transform ${transitionTime("faster")}
    ${transitionTimingFunction("smooth")};

  transform: rotateZ(${({ rotated }) => (rotated ? 180 : 0)}deg);
`

const SelectInputWrapper = styled.div<{
  listStyles?: FlattenSimpleInterpolation
}>`
  position: relative;

  label,
  input {
    cursor: pointer;
    user-select: none;
  }

  ${List} {
    position: absolute;
    ${({ listStyles }) => listStyles};
  }
`

const NoResultsItem = styled(ListItem)`
  padding: 5.5rem 0;
  text-align: center;
  color: ${textColor("secondary")};
`

export type ListItemProps = {
  onClick: (item: any) => void
  onMouseDown: (event: MouseEvent) => void
  onMouseEnter: (event: MouseEvent) => void
  selected: boolean
  disabled: boolean
  "data-testid"?: string
  active?: boolean
}

export type RenderInputSelectListItem<T> = RenderListItem<T, ListItemProps>

interface KeysType {
  [key: string]: () => void
}

interface InputSearchListProps {
  expanded: boolean
  onTransitionEnd: any
  selectedItem?: any
  disabledItems?: any[]
  searchString: string
  items: any[]
  emptyItemValue?: ItemValue
  onEmptyItemValueClick: (event: MouseEvent) => void
  onItemClick: (item: any) => void
  renderListItem?: RenderInputSelectListItem<any>
  activeItemIndex?: number
  handleMouseEnter?: (itemIndex: number) => void
}

const InputSearchList: FunctionComponent<InputSearchListProps> = ({
  selectedItem,
  disabledItems = [],
  searchString,
  items = [],
  emptyItemValue,
  onEmptyItemValueClick,
  onItemClick,
  handleMouseEnter = noop,
  renderListItem = renderListItemSearchable,
  activeItemIndex,
  ...props
}) => {
  return (
    <List {...props} data-testid={InputSearchTestIds.List}>
      {emptyItemValue && (
        <ListItem
          onClick={onEmptyItemValueClick}
          empty
          data-testid={InputSearchTestIds.ListItem}
        >
          {emptyItemValue}
        </ListItem>
      )}
      {items.length > 0 ? (
        items.map((item, index) => {
          const onClick = () => onItemClick(item)
          const selected = item === selectedItem
          const disabled = disabledItems.includes(item)
          const onMouseDown = (event: MouseEvent) => {
            if (disabled) {
              event.stopPropagation()
              event.preventDefault()
            }
          }
          const onMouseEnter = () => handleMouseEnter(index)
          const active = activeItemIndex === index
          return (
            <Fragment key={index}>
              {renderListItem({
                searchString,
                item,
                props: {
                  onClick,
                  selected,
                  disabled,
                  active,
                  onMouseDown,
                  onMouseEnter,
                  "data-testid": InputSearchTestIds.ListItem,
                },
              })}
            </Fragment>
          )
        })
      ) : (
        <NoResultsItem>{intl.formatMessage(messages.noResults)}</NoResultsItem>
      )}
    </List>
  )
}

export interface InputSearchProps extends Partial<InputProps> {
  selectedItem?: any
  items: any[]
  disabledItems?: any[]
  emptyItemValue?: ItemValue
  renderItemValue?: (item: any) => ItemValue
  renderListItem?: RenderInputSelectListItem<any>
  onSelect?: (item: any) => void
  listStyles?: FlattenSimpleInterpolation
  searchable?: boolean
  minCharsToShowResults?: number
  clearOnBlur?: boolean
  active?: boolean
  searchResultRows?: number
  onSearchEnterClick?: () => void
  itemListDisabled?: boolean
  searchValue: string
  onSearchValueChange: (value: string) => void
}

const InputSearchComponent: FunctionComponent<InputSearchProps> = ({
  className,
  selectedItem,
  items,
  disabledItems,
  emptyItemValue = "",
  renderItemValue = (item: any) => String(item),
  renderListItem,
  onSelect = noop,
  listStyles,
  inputRef,
  searchable,
  minCharsToShowResults = 0,
  clearOnBlur = false,
  onBlur = noop,
  onFocus = noop,
  type = "text",
  searchResultRows = 8,
  active,
  onSearchEnterClick = noop,
  itemListDisabled = false,
  searchValue,
  onSearchValueChange,
  ...rest
}) => {
  const [focus, setFocus] = useState(false)
  const [activeItemIndex, setActiveItemIndex] = useState<number>(-1)
  const selectRef = useRef<HTMLInputElement>(null)

  const resetSelection = () => onSelect("")

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    onBlur(event)
    setFocus(false)
    if (searchValue !== "") {
      onSelect("")
    }
  }

  const resetSearchValue = () => onSearchValueChange("")

  const handleSelect = (item: typeof items[number]) => {
    onSelect(item)
    resetSearchValue()
    setActiveItemIndex(-1)
  }

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    onFocus(event)
    setFocus(true)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSearchValueChange(event.target.value)
    setActiveItemIndex(-1)
  }

  const toggleList = (event: MouseEvent) => {
    event.stopPropagation()
    event.preventDefault()
    setActiveItemIndex(-1)
    if (selectRef.current) {
      focus ? selectRef.current.blur() : selectRef.current.focus()
    }
  }

  const preventExpanding = (event: MouseEvent) => {
    if (focus) {
      event.stopPropagation()
      event.preventDefault()
    }
  }

  const getInputValue = (): ItemValue => {
    if (searchValue !== "") {
      return searchValue
    }
    if (selectedItem) {
      return renderItemValue(selectedItem)
    }
    return ""
  }

  const searchResults = () => {
    onSearchEnterClick()
    setActiveItemIndex(-1)
  }

  const onKeyDown = (event: KeyboardEvent) => {
    const handleArrowDown = () => {
      const maxListLength =
        items.length <= searchResultRows ? items.length : searchResultRows
      if (activeItemIndex + 1 < maxListLength) {
        setActiveItemIndex((prevState) => prevState + 1)
      }
    }
    const handleArrowUp = () => {
      if (activeItemIndex >= 0) {
        setActiveItemIndex((prevState) => prevState - 1)
      }
    }
    const handleEnter = () => {
      setActiveItemIndex(0)
      if (selectRef.current) {
        selectRef.current.blur()
      }

      searchValue !== "" &&
        (activeItemIndex >= 0
          ? handleSelect(items[activeItemIndex])
          : searchResults())
    }
    const keys: KeysType = {
      ArrowDown: handleArrowDown,
      ArrowUp: handleArrowUp,
      Enter: handleEnter,
    }
    return keys[event.key] && keys[event.key]()
  }

  const handleMouseEnter = (itemIndex: number) => {
    setActiveItemIndex(itemIndex)
  }

  const toggleIcon = (
    <ToggleIcon
      rotated={focus}
      onClick={toggleList}
      onMouseDown={preventExpanding}
      data-testid={InputSearchTestIds.Icon}
    >
      <Icon width={1} type={IconType.ArrowDown} />
    </ToggleIcon>
  )

  return (
    <SelectInputWrapper className={className} listStyles={listStyles}>
      <InputText
        {...rest}
        type={type}
        value={getInputValue()}
        trailingIcons={type === "text" ? [toggleIcon] : []}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={onKeyDown}
        inputRef={composeRefs(selectRef, inputRef)}
        readOnly={!searchable}
        focusable
      />
      {!itemListDisabled &&
        (searchValue?.length || 0) >= minCharsToShowResults && (
          <InputSearchList
            selectedItem={selectedItem}
            disabledItems={disabledItems}
            emptyItemValue={emptyItemValue}
            items={items}
            renderListItem={renderListItem}
            searchString={searchValue || ""}
            expanded={focus}
            activeItemIndex={activeItemIndex}
            handleMouseEnter={handleMouseEnter}
            onTransitionEnd={clearOnBlur ? resetSearchValue : noop}
            onEmptyItemValueClick={resetSelection}
            onItemClick={handleSelect}
          />
        )}
    </SelectInputWrapper>
  )
}

const InputSearch = React.forwardRef<
  HTMLInputElement,
  ComponentProps<typeof InputSearchComponent>
>((props, ref) => <InputSearchComponent {...props} inputRef={ref} />)

export default InputSearch
