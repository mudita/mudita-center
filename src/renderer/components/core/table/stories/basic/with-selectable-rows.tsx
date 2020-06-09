import React from "react"
import {
  Checkbox,
  SelectableContacts,
} from "Renderer/components/core/table/stories/styles"
import {
  Col,
  Labels,
  Row,
} from "Renderer/components/core/table/table.component"
import { basicRows } from "Renderer/components/core/table/table.fake-data"
import useTableSelect from "Renderer/utils/hooks/useTableSelect"

export default () => {
  const { getRowStatus, toggleRow } = useTableSelect(basicRows)
  return (
    <SelectableContacts>
      <Labels>
        <Col />
        <Col>Name</Col>
        <Col>Phone</Col>
      </Labels>
      {basicRows.map((row, index) => {
        const { selected, indeterminate } = getRowStatus(row)
        const onChange = () => toggleRow(row)
        return (
          <Row key={index}>
            <Col>
              <Checkbox
                checked={selected}
                indeterminate={indeterminate}
                onChange={onChange}
              />
            </Col>
            <Col>
              {row.firstName} {row.lastName}
            </Col>
            <Col>{row.phoneNumber}</Col>
          </Row>
        )
      })}
    </SelectableContacts>
  )
}
