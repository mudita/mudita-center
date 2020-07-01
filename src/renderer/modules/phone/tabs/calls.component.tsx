import React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import { noop } from "Renderer/utils/noop"
import {
  Call,
  VisibilityFilter,
} from "App/renderer/models/calls/calls.interface"
import CallsHeader from "Renderer/components/rest/calls/calls-header.component"
import CallsTable from "Renderer/components/rest/calls/calls-table.component"
import useTableSelect from "Renderer/utils/hooks/useTableSelect"

interface Props {
  changeVisibilityFilter?: (filter: VisibilityFilter) => void
  calls: Call[]
}

const Calls: FunctionComponent<Props> = ({
  calls,
  changeVisibilityFilter = noop,
}) => {
  const {
    selectedRows,
    getRowStatus,
    toggleRow,
    noneRowsSelected,
  } = useTableSelect<Call>(calls)
  return (
    <>
      <CallsHeader
        changeVisibilityFilter={changeVisibilityFilter}
        selectedItemsCount={selectedRows.length}
      />
      <CallsTable
        calls={calls}
        getRowStatus={getRowStatus}
        toggleRow={toggleRow}
        noneRowsSelected={noneRowsSelected}
      />
    </>
  )
}

export default Calls
