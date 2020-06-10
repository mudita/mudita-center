import React from "react"
import { Contacts } from "Renderer/components/core/table/stories/styles"
import {
  Col,
  Labels,
  Row,
  TableSortButton,
} from "Renderer/components/core/table/table.component"
import { basicRows } from "Renderer/components/core/table/table.fake-data"
import useSort from "Renderer/utils/hooks/use-sort"

export default () => {
  const { data, sort, sortDir } = useSort(basicRows)

  const sortByName = () => {
    sort("firstName")
  }

  const sortByPhoneNumber = () => {
    sort("phoneNumber")
  }

  return (
    <Contacts>
      <Labels>
        <Col onClick={sortByName}>
          Name <TableSortButton asc={sortDir.firstName || false} />
        </Col>
        <Col onClick={sortByPhoneNumber}>
          Phone <TableSortButton asc={sortDir.phoneNumber || false} />
        </Col>
      </Labels>
      {data.map(row => {
        return (
          <Row key={`${row.firstName} ${row.lastName}`}>
            <Col>
              {row.firstName} {row.lastName}
            </Col>
            <Col>{row.phoneNumber}</Col>
          </Row>
        )
      })}
    </Contacts>
  )
}
