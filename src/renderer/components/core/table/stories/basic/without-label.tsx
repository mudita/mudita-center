import React from "react"
import { Contacts } from "Renderer/components/core/table/stories/styles"
import { Col, Row } from "Renderer/components/core/table/table.component"
import { basicRows } from "Renderer/components/core/table/table.fake-data"

export default () => (
  <Contacts>
    {basicRows.map((row, index) => {
      return (
        <Row key={index}>
          <Col>
            {row.firstName} {row.lastName}
          </Col>
          <Col>{row.phoneNumber}</Col>
        </Row>
      )
    })}
  </Contacts>
)
