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
  deleteCall?: (ids: string[]) => void
  calls: Call[]
}

const Calls: FunctionComponent<Props> = ({
  calls,
  changeVisibilityFilter = noop,
  deleteCall = noop,
}) => {
  const {
    selectedRows,
    getRowStatus,
    toggleRow,
    noneRowsSelected,
    toggleAll,
    allRowsSelected,
    resetRows,
  } = useTableSelect<Call>(calls)
  return (
    <>
      <CallsHeader
        changeVisibilityFilter={changeVisibilityFilter}
        toggleAll={toggleAll}
        allRowsSelected={allRowsSelected}
        deleteCall={deleteCall}
        selectedCalls={selectedRows}
        resetRows={resetRows}
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
