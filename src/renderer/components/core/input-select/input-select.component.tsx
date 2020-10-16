import React, {
  ChangeEvent,
  ComponentProps,
  FocusEvent,
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

const ToggleIcon = styled.span<{ rotated?: boolean }>`
  cursor: pointer;
  transition: transform ${transitionTime("faster")}
    ${transitionTimingFunction("smooth")};

  transform: rotateZ(${({ rotated }) => (rotated ? 180 : 0)}deg);
`

const SelectInputWrapper = styled.div`
  position: relative;

  label,
  input {
    cursor: pointer;
    user-select: none;
  }

  ${List} {
    position: absolute;
  }
`

export type ListItemProps = {
  onClick: (item: any) => void
  selected: boolean
  disabled: boolean
}

export type RenderInputSelectListItem<T> = RenderListItem<T, ListItemProps>

export interface InputSelectProps extends Partial<InputProps> {
  selectedItem?: any
  items: any[]
  disabledItems?: any[]
  emptyItemValue?: ItemValue
  renderItemValue?: (item: any) => ItemValue
  renderListItem?: RenderInputSelectListItem<any>
  isItemMatching?: (item: any, searchString: string) => boolean
  onSelect?: (item: any) => void
  listStyles?: FlattenSimpleInterpolation
  searchable?: boolean
}

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
    <List {...props}>
      {emptyItemValue && (
        <ListItem onClick={onEmptyItemValueClick} empty>
          {emptyItemValue}
        </ListItem>
      )}
      {items.map((item, index) => {
        const onClick = () => onItemClick(item)
        const selected = item === selectedItem
        const disabled = disabledItems.includes(item)

        return (
          <React.Fragment key={index}>
            {renderListItem({
              searchString,
              item,
              props: {
                onClick,
                selected,
                disabled,
              },
            })}
          </React.Fragment>
        )
      })}
    </List>
  )
}

const InputSelectComponent: FunctionComponent<InputSelectProps> = ({
  className,
  selectedItem,
  items,
  disabledItems,
  emptyItemValue = "",
  renderItemValue = (item: any) => String(item),
  renderListItem,
  isItemMatching = (item, search) =>
    String(item).toLowerCase().includes(search.toLowerCase()),
  onSelect = noop,
  listStyles,
  inputRef,
  searchable,
  onBlur = noop,
  onFocus = noop,
  ...rest
}) => {
  const [focused, setFocused] = useState(false)
  const [searchValue, setSearchValue] = useState<string | null>(null)
  const selectRef = useRef<HTMLInputElement>(null)

  const resetSelection = () => onSelect("")

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    onBlur(event)
    setFocused(false)
    if (searchValue !== null) {
      onSelect("")
    }
  }

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    onFocus(event)
    setFocused(true)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }

  const filteredItems = searchable
    ? items.filter((item) => isItemMatching(item, searchValue || ""))
    : items

  const resetSearchValue = () => setSearchValue(null)

  const toggleList = (event: MouseEvent) => {
    event.stopPropagation()
    event.preventDefault()

    if (selectRef.current) {
      focused ? selectRef.current.blur() : selectRef.current.focus()
    }
  }

  const preventExpanding = (event: MouseEvent) => {
    if (focused) {
      event.stopPropagation()
      event.preventDefault()
    }
  }

  const getInputValue = (): ItemValue => {
    if (searchValue !== null) return searchValue
    if (selectedItem) return renderItemValue(selectedItem)
    return ""
  }

  const toggleIcon = (
    <ToggleIcon
      rotated={focused}
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
        value={getInputValue()}
        trailingIcons={[toggleIcon]}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        inputRef={composeRefs(selectRef, inputRef)}
        readOnly={!searchable}
        focusable
      />
      <InputSelectList
        selectedItem={selectedItem}
        disabledItems={disabledItems}
        emptyItemValue={emptyItemValue}
        items={filteredItems}
        renderListItem={renderListItem}
        searchString={searchValue || ""}
        expanded={focused}
        onTransitionEnd={resetSearchValue}
        onEmptyItemValueClick={resetSelection}
        onItemClick={onSelect}
      />
    </SelectInputWrapper>
  )
}

const InputSelect = React.forwardRef<
  HTMLInputElement,
  ComponentProps<typeof InputSelectComponent>
>((props, ref) => <InputSelectComponent {...props} inputRef={ref} />)

export default InputSelect
