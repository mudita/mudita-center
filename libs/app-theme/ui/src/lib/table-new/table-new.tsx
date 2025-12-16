/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { List, RowComponentProps, useListRef } from "react-window"
import styled, { css } from "styled-components"
import {
  ComponentProps,
  ReactNode,
  RefObject,
  useImperativeHandle,
} from "react"
import {
  listItemActiveStyles,
  listItemBaseStyles,
  listItemClickableStyles,
  listItemSelectedStyles,
} from "../list/list-item"

type Ref<ItemId> = {
  scrollToItem: (id: ItemId, instant?: boolean) => void
}

interface Props<Item, ItemId extends keyof Item = keyof Item> {
  itemIdField: ItemId
  items: Item[]
  rowRenderer: (item: Item, index: number) => ReactNode
  ref?: RefObject<Ref<Item[ItemId]> | null>
  rowHeight?: ComponentProps<typeof Table>["rowHeight"]
}

export const TableNew = <
  Item = unknown,
  ItemId extends keyof Item = keyof Item,
>({
  items,
  rowRenderer,
  ref,
  itemIdField,
  rowHeight = 64,
}: Props<Item, ItemId>) => {
  const listRef = useListRef(null)

  useImperativeHandle(ref, () => {
    return {
      scrollToItem: (id: Item[ItemId], instant?: boolean) => {
        const index = items.findIndex((item) => item[itemIdField] === id)
        if (index === -1) {
          return
        }
        listRef.current?.scrollToRow({
          align: "smart",
          behavior: instant ? "instant" : "smooth",
          index,
        })
      },
    }
  }, [itemIdField, items, listRef])

  return (
    <Table
      className="table-new"
      listRef={listRef}
      rowComponent={RowComponent as ComponentProps<typeof List>["rowComponent"]}
      rowCount={items.length}
      rowHeight={rowHeight}
      rowProps={{
        items,
        rowRenderer,
      }}
    />
  )
}
// eslint-disable-next-line no-redeclare
export type TableNew<Item, ItemId extends keyof Item = keyof Item> = Ref<
  Item[ItemId]
>

type RowProps<Item> = Pick<Props<Item>, "rowRenderer" | "items">

const RowComponent = <Item = unknown,>({
  index,
  style,
  items,
  rowRenderer,
}: RowComponentProps<RowProps<Item>>) => {
  const item = items[index]

  return <div style={style}>{rowRenderer(item, index)}</div>
}

const Table = styled(List)`
  width: 100%;
  height: 100%;
  overflow-x: hidden;
`

const Row = styled.div<{
  /**
   * Data attribute selector for the row selection input (e.g. checkbox)
   */
  rowSelectorCheckboxDataAttr?: string
  /**
   * Indicates if active row styles should be applied
   */
  active?: boolean
}>`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;

  ${listItemBaseStyles};

  ${({ onClick }) => Boolean(onClick) && listItemClickableStyles};
  ${({ rowSelectorCheckboxDataAttr }) =>
    rowSelectorCheckboxDataAttr &&
    css`
      &:has([${rowSelectorCheckboxDataAttr}]:checked) {
        ${listItemSelectedStyles};
      }
    `};
  ${({ active }) => active && listItemActiveStyles};
`

TableNew.Row = Row
