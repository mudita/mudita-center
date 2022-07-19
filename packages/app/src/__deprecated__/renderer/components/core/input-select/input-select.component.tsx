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
import { IsItemMatching } from "App/__deprecated__/renderer/components/core/utils/is-item-matching"
import { defineMessages } from "react-intl"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import deprecated from "App/__deprecated__/main/utils/deprecated-wrapper"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"

export enum InputSelectTestIds {
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
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

interface InputSelectListProps {
  expanded: boolean
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onTransitionEnd: any
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selectedItem?: any
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  disabledItems?: any[]
  searchString: string
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: any[]
  emptyItemValue?: ItemValue
  onEmptyItemValueClick: (event: MouseEvent) => void
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onItemClick: (item: any) => void
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderListItem?: RenderInputSelectListItem<any>
  activeItemIndex?: number
  handleMouseEnter?: (itemIndex: number) => void
}

const InputSelectList: FunctionComponent<InputSelectListProps> = ({
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
    <List {...props} data-testid={InputSelectTestIds.List}>
      {emptyItemValue && (
        <ListItem
          onClick={onEmptyItemValueClick}
          empty
          data-testid={InputSelectTestIds.ListItem}
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
          // AUTO DISABLED - fix me if you like :)
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          const onMouseEnter = () => handleMouseEnter(index)
          const active = activeItemIndex === index
          return (
            <Fragment key={index}>
              {renderListItem({
                searchString,
                // AUTO DISABLED - fix me if you like :)
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                item,
                props: {
                  onClick,
                  selected,
                  disabled,
                  active,
                  onMouseDown,
                  onMouseEnter,
                  "data-testid": InputSelectTestIds.ListItem,
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

export interface InputSelectProps extends Partial<InputProps> {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selectedItem?: any
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: any[]
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  disabledItems?: any[]
  emptyItemValue?: ItemValue
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderItemValue?: (item: any) => ItemValue
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderListItem?: RenderInputSelectListItem<any>
  isItemMatching?: IsItemMatching
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSelect?: (item: any) => void
  listStyles?: FlattenSimpleInterpolation
  searchable?: boolean
  minCharsToShowResults?: number
  clearOnBlur?: boolean
  active?: boolean
  searchResultRows?: number
}

//deprecated in search functionality - please use InputSearchComponent
const InputSelectComponent: FunctionComponent<InputSelectProps> = ({
  className,
  selectedItem,
  items,
  disabledItems,
  emptyItemValue = "",
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderItemValue = (item: any) => String(item),
  renderListItem,
  isItemMatching = noop,
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
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  active,
  ...rest
}) => {
  const [focus, setFocus] = useState(false)
  const [searchValue, setSearchValue] = useState<string | null>(null)
  const [activeItemIndex, setActiveItemIndex] = useState<number>(0)
  const selectRef = useRef<HTMLInputElement>(null)

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  const resetSelection = () => onSelect("")

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    onBlur(event)
    setFocus(false)
    if (searchValue !== null) {
      onSelect("")
    }
  }

  const resetSearchValue = () => setSearchValue(null)

  const handleSelect = (item: typeof items[number]) => {
    onSelect(item)
    resetSearchValue()
    setActiveItemIndex(0)
  }

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    onFocus(event)
    setFocus(true)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
    setActiveItemIndex(0)
  }

  const filteredItems = searchable
    ? items.filter((item) => isItemMatching(item, searchValue || ""))
    : items

  const toggleList = (event: MouseEvent) => {
    event.stopPropagation()
    event.preventDefault()

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
    if (searchValue !== null) {
      return searchValue
    }
    if (selectedItem) {
      return renderItemValue(selectedItem)
    }
    return ""
  }

  const onKeyDown = (event: KeyboardEvent) => {
    const handleArrowDown = () => {
      const maxListLength =
        filteredItems.length <= searchResultRows
          ? filteredItems.length
          : searchResultRows
      if (activeItemIndex + 1 < maxListLength) {
        setActiveItemIndex((prevState) => prevState + 1)
      }
    }
    const handleArrowUp = () => {
      if (activeItemIndex > 0) {
        setActiveItemIndex((prevState) => prevState - 1)
      }
    }
    const handleEnter = () => {
      setActiveItemIndex(0)
      if (selectRef.current) {
        selectRef.current.blur()
      }
      handleSelect(filteredItems[activeItemIndex])
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
      data-testid={InputSelectTestIds.Icon}
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
      {(searchValue?.length || 0) >= minCharsToShowResults && (
        <InputSelectList
          // AUTO DISABLED - fix me if you like :)
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          selectedItem={selectedItem}
          disabledItems={disabledItems}
          emptyItemValue={emptyItemValue}
          items={filteredItems}
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

const InputSelect = React.forwardRef<
  HTMLInputElement,
  ComponentProps<typeof InputSelectComponent>
>((props, ref) => <InputSelectComponent {...props} inputRef={ref} />)

export default deprecated(
  InputSelect,
  "If you need an input for search, please use a refactored one: InputSearchComponent"
)
