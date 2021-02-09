/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import React, {
  ChangeEvent,
  ComponentProps,
  FocusEvent,
  Fragment,
  MouseEvent,
  useRef,
  useState,
} from "react"
import styled, { FlattenSimpleInterpolation } from "styled-components"
import { noop } from "Renderer/utils/noop"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { InputText } from "Renderer/components/core/input-text/input-text.elements"
import Icon from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import {
  transitionTime,
  transitionTimingFunction,
} from "Renderer/styles/theming/theme-getters"
import { InputProps } from "Renderer/components/core/input-text/input-text.interface"
import composeRefs from "@seznam/compose-react-refs/composeRefs"
import {
  ItemValue,
  List,
  ListItem,
  RenderListItem,
  renderListItemSearchable,
} from "Renderer/components/core/list/list.component"
import { IsItemMatching } from "Renderer/components/core/utils/is-item-matching"

export enum InputSelectTestIds {
  Icon = "input-select-icon",
  List = "input-select-list",
  ListItem = "input-select-list-item",
}

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

export type ListItemProps = {
  onClick: (item: any) => void
  onMouseDown: (event: MouseEvent) => void
  selected: boolean
  disabled: boolean
  "data-testid"?: string
}

export type RenderInputSelectListItem<T> = RenderListItem<T, ListItemProps>

interface InputSelectListProps {
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
}

const InputSelectList: FunctionComponent<InputSelectListProps> = ({
  selectedItem,
  disabledItems = [],
  searchString,
  items = [],
  emptyItemValue,
  onEmptyItemValueClick,
  onItemClick,
  renderListItem = renderListItemSearchable,
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
      {items.map((item, index) => {
        const onClick = () => onItemClick(item)
        const selected = item === selectedItem
        const disabled = disabledItems.includes(item)
        const onMouseDown = (event: MouseEvent) => {
          if (disabled) {
            event.stopPropagation()
            event.preventDefault()
          }
        }
        return (
          <Fragment key={index}>
            {renderListItem({
              searchString,
              item,
              props: {
                onClick,
                selected,
                disabled,
                onMouseDown,
                "data-testid": InputSelectTestIds.ListItem,
              },
            })}
          </Fragment>
        )
      })}
    </List>
  )
}

export interface InputSelectProps extends Partial<InputProps> {
  selectedItem?: any
  items: any[]
  disabledItems?: any[]
  emptyItemValue?: ItemValue
  renderItemValue?: (item: any) => ItemValue
  renderListItem?: RenderInputSelectListItem<any>
  isItemMatching?: IsItemMatching
  onSelect?: (item: any) => void
  listStyles?: FlattenSimpleInterpolation
  searchable?: boolean
  minCharsToShowResults?: number
  clearOnBlur?: boolean
}

const InputSelectComponent: FunctionComponent<InputSelectProps> = ({
  className,
  selectedItem,
  items,
  disabledItems,
  emptyItemValue = "",
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
  ...rest
}) => {
  const [focus, setFocus] = useState(false)
  const [searchValue, setSearchValue] = useState<string | null>(null)
  const selectRef = useRef<HTMLInputElement>(null)

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
  }

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    onFocus(event)
    setFocus(true)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
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

  const toggleIcon = (
    <ToggleIcon
      rotated={focus}
      onClick={toggleList}
      onMouseDown={preventExpanding}
      data-testid={InputSelectTestIds.Icon}
    >
      <Icon width={1} type={Type.ArrowDown} />
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
        inputRef={composeRefs(selectRef, inputRef)}
        readOnly={!searchable}
        focusable
      />
      {(searchValue?.length || 0) >= minCharsToShowResults && (
        <InputSelectList
          selectedItem={selectedItem}
          disabledItems={disabledItems}
          emptyItemValue={emptyItemValue}
          items={filteredItems}
          renderListItem={renderListItem}
          searchString={searchValue || ""}
          expanded={focus}
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

export default InputSelect
