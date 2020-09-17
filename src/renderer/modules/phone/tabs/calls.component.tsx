import React from "react"
import { Details } from "Renderer/components/rest/calls/call-details.types"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { noop } from "Renderer/utils/noop"
import { VisibilityFilter } from "App/renderer/models/calls/calls.interface"
import CallsHeader from "Renderer/components/rest/calls/calls-header.component"
import CallsTable from "Renderer/components/rest/calls/calls-table.component"
import useTableSelect from "Renderer/utils/hooks/useTableSelect"

interface Props {
  changeVisibilityFilter?: (filter: VisibilityFilter) => void
  calls: Details[]
  deleteCall?: (ids: string[]) => void
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
  } = useTableSelect<Details>(calls)
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
        deleteCall={deleteCall}
        calls={calls}
        getRowStatus={getRowStatus}
        toggleRow={toggleRow}
        noneRowsSelected={noneRowsSelected}
      />
    </>
  )
}

export default Calls
