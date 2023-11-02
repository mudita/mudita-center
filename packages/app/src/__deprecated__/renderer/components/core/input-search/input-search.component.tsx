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
  useEffect,
  RefObject,
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
  Input = "input-search",
  Icon = "input-select-icon",
  List = "input-select-list",
  ListItem = "input-select-list-item",
}

const messages = defineMessages({
  noResults: { id: "component.inputSelectNoResults" },
})

const ToggleIcon = styled.span<{ rotated?: boolean }>`
  cursor: pointer;
  transition: transform, ${transitionTime("faster")},
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

const ActionButton = styled.button`
  width: 100%;
  padding: 1.2rem 0;
  margin: 0 0 1.2rem 0;
  border: 0;
  cursor: pointer;
  color: ${textColor("actionHover")};
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: 1.2;
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
  [key: string]: (event: KeyboardEvent) => void
}

export enum ItemType {
  Data,
  Label,
}

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Item<Type = any> {
  type: ItemType
  data: Type
}

interface InputSearchListProps {
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
  items: Item[]
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
  actionButton?: string
  onActionButtonClick?: () => void
  elementRef: RefObject<HTMLUListElement>
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
  actionButton,
  onActionButtonClick = noop,
  elementRef,
  ...props
}) => {
  return (
    <List {...props} ref={elementRef} data-testid={InputSearchTestIds.List}>
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
          const key = `search-key-${index}`
          const onClick = () => onItemClick(item.data)
          const selected = item === selectedItem
          const disabled = disabledItems.includes(item.data)
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
            <Fragment key={key}>
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
                  "data-testid": InputSearchTestIds.ListItem,
                },
              })}
            </Fragment>
          )
        })
      ) : (
        <NoResultsItem>{intl.formatMessage(messages.noResults)}</NoResultsItem>
      )}
      {items.length > 0 && actionButton && (
        <ActionButton onClick={onActionButtonClick}>
          {actionButton}
        </ActionButton>
      )}
    </List>
  )
}

export interface InputSearchProps extends Partial<InputProps> {
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
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  actionButton?: string
  onActionButtonClick?: () => void
}

const InputSearchComponent: FunctionComponent<InputSearchProps> = ({
  className,
  selectedItem,
  items,
  disabledItems,
  emptyItemValue = "",
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  active,
  onSearchEnterClick = noop,
  itemListDisabled = false,
  searchValue,
  onSearchValueChange,
  actionButton,
  onActionButtonClick,
  ...rest
}) => {
  const listRef = useRef<HTMLUListElement>(null)
  const [focus, setFocus] = useState(false)
  const [activeItemIndex, setActiveItemIndex] = useState<number>(-1)
  const selectRef = useRef<HTMLInputElement>(null)

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    onBlur(event)
    setFocus(false)
    if (searchValue !== "") {
      onSelect(null)
    }
  }

  const resetSearchValue = () => onSearchValueChange("")

  const handleSelect = (item: (typeof items)[number]) => {
    onSelect(item)
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
    const handleArrowDown = (event: KeyboardEvent) => {
      event.preventDefault()

      if (activeItemIndex + 1 < items.length) {
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (items[activeItemIndex + 1].type === ItemType.Label) {
          if (activeItemIndex + 2 < items.length) {
            setActiveItemIndex((prevState) => prevState + 2)
          }
        } else {
          setActiveItemIndex((prevState) => prevState + 1)
        }
      }
    }
    const handleArrowUp = (event: KeyboardEvent) => {
      event.preventDefault()

      if (activeItemIndex > 0) {
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (items[activeItemIndex - 1].type === ItemType.Label) {
          if (activeItemIndex - 1 >= 0) {
            setActiveItemIndex((prevState) => prevState - 2)
          }
        } else {
          setActiveItemIndex((prevState) => prevState - 1)
        }
      }
    }
    const handleEnter = (event: KeyboardEvent) => {
      event.preventDefault()

      setActiveItemIndex(0)
      if (selectRef.current) {
        selectRef.current.blur()
      }

      searchValue !== "" &&
        (activeItemIndex >= 0
          ? // AUTO DISABLED - fix me if you like :)
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            handleSelect(items[activeItemIndex].data)
          : searchResults())
    }
    const keys: KeysType = {
      ArrowDown: handleArrowDown,
      ArrowUp: handleArrowUp,
      Enter: handleEnter,
    }
    return keys[event.key] && keys[event.key](event)
  }

  const handleMouseEnter = (itemIndex: number) => {
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (items[itemIndex].type === ItemType.Data) {
      setActiveItemIndex(itemIndex)
    }
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

  useEffect(() => {
    if (listRef.current) {
      listRef.current.children[activeItemIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      })
    }
  }, [activeItemIndex])

  return (
    <SelectInputWrapper className={className} listStyles={listStyles}>
      <InputText
        data-testid={InputSearchTestIds.Input}
        {...rest}
        type={type}
        value={getInputValue()}
        trailingIcons={type === "text" ? [toggleIcon] : undefined}
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
            // AUTO DISABLED - fix me if you like :)
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            selectedItem={selectedItem}
            elementRef={listRef}
            disabledItems={disabledItems}
            emptyItemValue={emptyItemValue}
            items={items}
            renderListItem={renderListItem}
            searchString={searchValue || ""}
            expanded={focus}
            activeItemIndex={activeItemIndex}
            handleMouseEnter={handleMouseEnter}
            onTransitionEnd={clearOnBlur ? resetSearchValue : noop}
            onEmptyItemValueClick={noop}
            onItemClick={handleSelect}
            actionButton={actionButton}
            onActionButtonClick={onActionButtonClick}
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
