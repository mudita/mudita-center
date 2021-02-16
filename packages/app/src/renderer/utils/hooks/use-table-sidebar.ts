/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { useState } from "react"

export interface UseTableSidebar<T> {
  openSidebar: (row: T) => void
  closeSidebar: () => void
  sidebarOpened: boolean
  activeRow?: T
}

const useTableSidebar = <T>(initActiveRow?: T): UseTableSidebar<T> => {
  const [sidebarOpened, setSidebarVisibility] = useState(false)
  const [activeRow, setActiveRow] = useState<T | undefined>(initActiveRow)

  const openSidebar = (row: T) => {
    setActiveRow(row)
    setSidebarVisibility(true)
  }
  const closeSidebar = () => {
    setSidebarVisibility(false)
    setActiveRow(undefined)
  }

  return {
    openSidebar,
    closeSidebar,
    sidebarOpened,
    activeRow,
  }
}

export default useTableSidebar
