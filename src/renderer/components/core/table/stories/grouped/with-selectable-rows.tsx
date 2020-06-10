import React from "react"
import {
  Checkbox,
  SelectableContacts,
} from "Renderer/components/core/table/stories/styles"
import {
  Col,
  Group,
  Labels,
  Row,
} from "Renderer/components/core/table/table.component"
import {
  labeledRows,
  nestedRows,
} from "Renderer/components/core/table/table.fake-data"
import useTableSelect from "Renderer/utils/hooks/useTableSelect"

export default () => {
  const { toggleRow, getRowStatus } = useTableSelect(nestedRows)
  return (
    <SelectableContacts>
      {Object.keys(labeledRows).map(group => (
        <Group key={group}>
          <Labels>
            <Col />
            <Col>{group}</Col>
          </Labels>
          {labeledRows[group].map((row: any, index: number) => {
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
        </Group>
      ))}
    </SelectableContacts>
  )
}
