import { useState } from "react"

interface Row {
  [key: string]: any
}

const useTableSidebar = () => {
  const [sidebarOpened, setSidebarVisibility] = useState()
  const [activeRow, setActiveRow] = useState<Row | null>()

  const openSidebar = (row: Row) => {
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
