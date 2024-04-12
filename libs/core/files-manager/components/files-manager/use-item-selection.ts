/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useState, useMemo, useCallback } from "react"

interface Item {
  id: string
}

export default function useItemSelection<T extends Item>(items: T[] | undefined | null) {
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const itemIds = useMemo(() => items?.map((item) => item.id) ?? [], [items])

  const selectAllItems = useCallback(() => {
    setSelectedItems(itemIds)
  }, [itemIds])

  const toggleItem = useCallback((id: string) => {
    setSelectedItems((currentSelectedItems) =>
      currentSelectedItems.includes(id)
        ? currentSelectedItems.filter((item) => item !== id)
        : [...currentSelectedItems, id]
    )
  }, [])

  const resetAllItems = useCallback(() => {
    setSelectedItems([])
  }, [])

  return { selectedItems, selectAllItems, toggleItem, resetAllItems }
}
