import React, { Fragment, ChangeEvent, MouseEvent, useState } from "react"
import styled from "styled-components"
import { noop } from "Renderer/utils/noop"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import {
  InputText,
  searchIcon,
} from "Renderer/components/core/input-text/input-text.elements"
import {
  List,
  renderListItemSearchable,
  RenderListItem,
  ItemValue,
} from "Renderer/components/core/list/list.component"
import { InputProps } from "Renderer/components/core/input-text/input-text.interface"
import { InputSearchTestIds } from "Renderer/components/core/input-search/input-search-test-ids.enum"

type ListItemProps = {
  onMouseDown: (event: MouseEvent) => void
  "data-testid": InputSearchTestIds.ListItem
}

export type RenderInputSearchListItem<T> = RenderListItem<T, ListItemProps>

interface InputSearchListProps {
  expanded: boolean
  items: any[]
  searchString: string
  onItemMouseDown: (event: MouseEvent, item: any) => void
  renderListItem?: RenderInputSearchListItem<any>
}

const InputSearchList: FunctionComponent<InputSearchListProps> = ({
  searchString,
  items = [],
  onItemMouseDown,
  renderListItem = renderListItemSearchable,
  ...props
}) => {
  return (
    <List {...props} data-testid={InputSearchTestIds.List}>
      {items.map((item, index) => {
        const handleItemMouseDown = (event: MouseEvent) =>
          onItemMouseDown(event, item)

        return (
          <Fragment key={index}>
            {renderListItem({
              searchString,
              item,
              props: {
                onMouseDown: handleItemMouseDown,
                "data-testid": InputSearchTestIds.ListItem,
              },
            })}
          </Fragment>
        )
      })}
    </List>
  )
}

export const InputSearchContainer = styled.div`
  position: relative;

  ${List} {
    position: absolute;
  }
`

export interface InputSearchProps
  extends Omit<InputProps, "type" | "onChange"> {
  max?: number
  searchItemValue?: ItemValue | null
  selectedItem?: any
  items: any[]
  emptyItemValue?: ItemValue
  renderItemValue?: (item: any) => ItemValue
  renderListItem?: RenderInputSearchListItem<any>
  isItemMatching?: (item: any, searchString: string) => boolean
  onChange?: (itemValue: string) => void
  onSelect?: (item: any) => void
}

const InputSearch: FunctionComponent<InputSearchProps> = ({
  className,
  max = 5,
  renderListItem,
  searchItemValue = null,
  selectedItem,
  items,
  emptyItemValue = "",
  renderItemValue = (item: any) => String(item),
  isItemMatching = (item, search) =>
    String(item).toLowerCase().includes(search.toLowerCase()),
  onChange = noop,
  onSelect = noop,
  ...rest
}) => {
  const [focused, setFocused] = useState(false)
  const [searchValue, setSearchValue] = useState<ItemValue | null>(
    searchItemValue
  )

  const handleFocus = () => setFocused(true)

  const handleBlur = () => setFocused(false)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFocused(true)
    const value = event.target.value
    setSearchValue(value)
    onChange(value)
  }

  const updateSearchValueBySelection = (event: MouseEvent, item: any) => {
    event.stopPropagation()
    event.preventDefault()
    const itemValue = renderItemValue(item)
    setSearchValue(itemValue)
    onChange(String(itemValue))
    onSelect(item)
    setFocused(false)
  }

  const filteredItems = items
    .filter((item) => isItemMatching(item, String(searchValue) || ""))
    .slice(0, max)

  const getInputValue = (): ItemValue => {
    if (searchValue !== null) return searchValue
    if (selectedItem) return renderItemValue(selectedItem)
    return ""
  }

  return (
    <InputSearchContainer className={className}>
      <InputText
        {...rest}
        type="search"
        value={getInputValue()}
        leadingIcons={[searchIcon]}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        focusable
        data-testid={InputSearchTestIds.InputText}
      />
      <InputSearchList
        items={filteredItems}
        renderListItem={renderListItem}
        searchString={String(searchValue) || ""}
        expanded={focused && Boolean(searchValue)}
        onItemMouseDown={updateSearchValueBySelection}
      />
    </InputSearchContainer>
  )
}

export default InputSearch
