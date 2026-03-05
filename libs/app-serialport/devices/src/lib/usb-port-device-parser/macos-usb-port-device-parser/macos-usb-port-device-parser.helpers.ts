/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

type NestedItem<T> = T & { _items?: T[] }

export function flattenNestedItems<T>(
  items: Array<NestedItem<T> | undefined> = []
): T[] {
  const result: T[] = []

  for (const item of items) {
    if (!item) continue

    const { _items, ...rest } = item as NestedItem<T>
    result.push(rest as T)

    if (Array.isArray(_items) && _items.length > 0) {
      result.push(...flattenNestedItems<T>(_items as Array<NestedItem<T>>))
    }
  }

  return result
}
