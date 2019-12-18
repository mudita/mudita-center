import React from "react"
import Table from "Renderer/components/core/table/table.component"
import {
  fakeTableLabels,
  fakeTableRows,
  labelsLayout,
  Sidebar,
} from "Renderer/components/core/table/table.stories"
import FunctionComponent from "Renderer/types/function-component.interface"

const News: FunctionComponent = () => (
  <Table
    rows={fakeTableRows}
    labels={fakeTableLabels}
    sidebar={<Sidebar />}
    labelsLayout={labelsLayout}
  />
)

export default News
