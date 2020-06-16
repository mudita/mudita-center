import React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import { noop } from "Renderer/utils/noop"
import {
  StateProps,
  VisibilityFilter,
} from "App/renderer/models/calls/calls.interface"
import CallsHeader from "Renderer/components/rest/calls/calls-header.component"

interface Props extends StateProps {
  changeVisibilityFilter?: (filter: VisibilityFilter) => void
  list: any[]
}

const Calls: FunctionComponent<Props> = ({ changeVisibilityFilter = noop }) => {
  return <CallsHeader changeVisibilityFilter={changeVisibilityFilter} />
}

export default Calls
