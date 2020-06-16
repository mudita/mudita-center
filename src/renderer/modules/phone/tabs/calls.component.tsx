import React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import { noop } from "Renderer/utils/noop"
import {
  Call,
  VisibilityFilter,
} from "App/renderer/models/calls/calls.interface"
import CallsHeader from "Renderer/components/rest/calls/calls-header.component"
import CallsTable from "Renderer/components/rest/calls/calls-table.component"

interface Props {
  changeVisibilityFilter?: (filter: VisibilityFilter) => void
  calls: Call[]
}

const Calls: FunctionComponent<Props> = ({
  calls,
  changeVisibilityFilter = noop,
}) => {
  return (
    <>
      <CallsHeader changeVisibilityFilter={changeVisibilityFilter} />
      <CallsTable calls={calls} />
    </>
  )
}

export default Calls
