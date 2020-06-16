import { useState } from "react"

export interface UseTableSidebar<T> {
  openSidebar: (row: T) => void
  closeSidebar: () => void
  sidebarOpened?: boolean
  activeRow?: T
}

const useTableSidebar = <T>(): UseTableSidebar<T> => {
  const [sidebarOpened, setSidebarVisibility] = useState<boolean>()
  const [activeRow, setActiveRow] = useState<T | undefined>()

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
