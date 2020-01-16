import { storiesOf } from "@storybook/react"
import React, { useState } from "react"
import TableComponent from "Renderer/components/core/table/table.component"
import { RowSize } from "Renderer/components/core/table/table.elements"
import {
  basicRows,
  columnsBasic,
  columnsSelectable,
  columnsStructured,
  columnsWithoutLabels,
  labeledRows,
  LabeledSingleRow,
  structuredRows,
} from "Renderer/components/core/table/table.fake-data"
import {
  SidebarProps,
  UID,
} from "Renderer/components/core/table/table.interface"
import styled from "styled-components"

// Components
export const sidebarRenderer = ({
  close,
  firstName,
  lastName,
  address: { zip, country, city },
}: SidebarProps<LabeledSingleRow>) => {
  return (
    <div>
      <p>
        {firstName} {lastName}
      </p>
      <p>
        {zip}, {city}, {country}
      </p>
      <button onClick={close}>close</button>
    </div>
  )
}

// Table component with custom styles for storybook only
const Table = styled(TableComponent)`
  /* This fixes scrollbar placement */
  height: 95vh;

  /* stylelint-disable unit-whitelist */
  font-size: 10px;
  width: 97.5rem;
`

// Stories
storiesOf("Components|Table", module).add("Empty", () => {
  return <Table rows={[]} columns={columnsBasic} />
})

storiesOf("Components|Table", module).add("Basic", () => {
  return <Table rows={basicRows} columns={columnsBasic} />
})

storiesOf("Components|Table", module).add("With rows selecting", () => {
  const [selectedIds, setSelectedIds] = useState()

  return (
    <Table
      rows={basicRows}
      columns={columnsSelectable}
      selectedRows={selectedIds}
      onSelect={setSelectedIds}
    />
  )
})

storiesOf("Components|Table", module).add("With labeled rows", () => {
  return <Table rows={labeledRows} columns={columnsWithoutLabels} />
})

storiesOf("Components|Table", module).add(
  "With labeled rows and custom rows size",
  () => {
    return (
      <Table
        rows={labeledRows}
        columns={columnsWithoutLabels}
        mainRowsSize={RowSize.Big}
      />
    )
  }
)

storiesOf("Components|Table", module).add("With sidebar", () => {
  const [activeId, setActiveId] = useState()

  return (
    <Table
      rows={basicRows}
      columns={columnsBasic}
      activeRow={activeId}
      onRowActivate={setActiveId}
      sidebarRenderer={sidebarRenderer}
    />
  )
})

storiesOf("Components|Table", module).add(
  "With sidebar and rows selecting",
  () => {
    const [selectedIds, setSelectedIds] = useState()
    const [activeId, setActiveId] = useState()

    return (
      <Table
        rows={basicRows}
        columns={columnsSelectable}
        selectedRows={selectedIds}
        onSelect={setSelectedIds}
        activeRow={activeId}
        onRowActivate={setActiveId}
        sidebarRenderer={sidebarRenderer}
      />
    )
  }
)

storiesOf("Components|Table", module).add(
  "Nested structure with selecting",
  () => {
    const [selectedRowsIds, setSelectedRows] = useState<UID[]>([])

    return (
      <Table
        rows={structuredRows}
        columns={columnsStructured}
        selectedRows={selectedRowsIds}
        onSelect={setSelectedRows}
        nativeAllSelector
      />
    )
  }
)
