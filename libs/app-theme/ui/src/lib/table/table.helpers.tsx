/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  Children,
  Fragment,
  isValidElement,
  ReactElement,
  ReactNode,
} from "react"
import { TABLE_HEADER_CELL_NAME } from "./table-header-cell"
import { TableCellProps } from "./table-cell"

type HasDisplayName = { displayName?: unknown }

const hasDisplayName = (x: unknown): x is HasDisplayName =>
  typeof x === "object" && x !== null && "displayName" in x

const isFragment = (
  el: ReactElement
): el is ReactElement<{ children?: ReactNode }> => el.type === Fragment

export const flattenChildren = (children: ReactNode): ReactElement[] => {
  const out: ReactElement[] = []
  Children.forEach(children, (child) => {
    if (!isValidElement(child)) {
      return
    }

    if (isFragment(child) && child.props.children) {
      out.push(...flattenChildren(child.props.children))
    } else {
      out.push(child)
    }
  })
  return out
}

export const isHeaderCell = (
  el: ReactElement
): el is ReactElement<TableCellProps> => {
  const { type } = el
  if (typeof type === "function") {
    return type.name?.includes(TABLE_HEADER_CELL_NAME) ?? false
  }

  if (hasDisplayName(type)) {
    return typeof type.displayName === "string"
      ? type.displayName.includes(TABLE_HEADER_CELL_NAME)
      : false
  }

  return false
}

export const isDataCell = (
  el: ReactElement
): el is ReactElement<TableCellProps> => !isHeaderCell(el)
