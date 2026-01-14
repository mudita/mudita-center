/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { List, RowComponentProps, useListRef } from "react-window"
import styled, { css } from "styled-components"
import {
  ComponentProps,
  FunctionComponent,
  PropsWithChildren,
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
import { Typography } from "../typography/typography"
import { TypographyTransform } from "app-theme/models"

type Ref<ItemId> = {
  scrollToItem: (id: ItemId, instant?: boolean) => void
}

interface Props<Item, ItemId extends keyof Item = keyof Item> {
  itemIdField: ItemId
  items: Item[]
  header?: ReactNode
  rowRenderer: (item: Item, index: number) => ReactNode
  ref?: RefObject<Ref<Item[ItemId]> | null>
  rowHeight?: ComponentProps<typeof ListWrapper>["rowHeight"]
}

export const Table = <Item = unknown, ItemId extends keyof Item = keyof Item>({
  items,
  rowRenderer,
  header,
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
    <TableWrapper>
      {Boolean(header) && <HeaderRow>{header}</HeaderRow>}
      <ListWrapper
        className="table-new"
        listRef={listRef}
        rowComponent={
          RowComponent as ComponentProps<typeof List>["rowComponent"]
        }
        rowCount={items.length}
        rowHeight={rowHeight}
        rowProps={{
          items,
          rowRenderer,
        }}
        overscanCount={10}
        style={{
          overflowY: "scroll",
        }}
      />
    </TableWrapper>
  )
}
// eslint-disable-next-line no-redeclare
export type Table<Item, ItemId extends keyof Item = keyof Item> = Ref<
  Item[ItemId]
>

type RowProps<Item> = Pick<Props<Item>, "rowRenderer" | "items"> & {
  className?: string
}

const RowComponent = <Item = unknown,>({
  index,
  style,
  items,
  rowRenderer,
  className,
}: RowComponentProps<RowProps<Item>>) => {
  const item = items[index]

  return (
    <div style={style} className={className}>
      {rowRenderer(item, index)}
    </div>
  )
}

const ListWrapper = styled(List)`
  width: 100%;
  height: 100%;
  overflow-x: hidden;
`

const TableWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
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

const HeaderCellWrapper = styled.div`
  display: flex;
  height: 4.5rem;
  align-items: center;
`

const HeaderCell: FunctionComponent<PropsWithChildren> = ({
  children,
  ...rest
}) => {
  return (
    <HeaderCellWrapper {...rest}>
      {typeof children === "string" ? (
        <Typography.P5 textTransform={TypographyTransform.Uppercase}>
          {children}
        </Typography.P5>
      ) : (
        children
      )}
    </HeaderCellWrapper>
  )
}

const HeaderRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 0.1rem solid ${({ theme }) => theme.app.color.grey4};
  z-index: 1;
  padding-right: 0.5rem; /* scrollbar width */
`

Table.Row = Row
Table.HeaderCell = HeaderCell
