import { useState } from "react"

const useTableSidebar = <T>() => {
  const [sidebarOpened, setSidebarVisibility] = useState()
  const [activeRow, setActiveRow] = useState<T | null>()

  const openSidebar = (row: T) => {
    setActiveRow(row)
    setSidebarVisibility(true)
  }
  const closeSidebar = () => {
    setSidebarVisibility(false)
    setActiveRow(null)
  }

  return {
    openSidebar,
    closeSidebar,
    sidebarOpened,
    activeRow,
  }
}

export default useTableSidebar
