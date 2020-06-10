import React from "react"
import { Contacts } from "Renderer/components/core/table/stories/styles"
import {
  Col,
  Group,
  Labels,
  Row,
} from "Renderer/components/core/table/table.component"
import { labeledRows } from "Renderer/components/core/table/table.fake-data"

export default () => (
  <Contacts>
    {Object.keys(labeledRows).map(group => (
      <Group key={group}>
        <Labels>
          <Col>{group}</Col>
        </Labels>
        {labeledRows[group].map((row: any, index: number) => (
          <Row key={index}>
            <Col>
              {row.firstName} {row.lastName}
            </Col>
            <Col>{row.phoneNumber}</Col>
          </Row>
        ))}
      </Group>
    ))}
  </Contacts>
)
