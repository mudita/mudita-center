import React from "react"
import { Contacts } from "Renderer/components/core/table/stories/styles"
import {
  Col,
  Labels,
  Row,
  Sidebar,
  TableWithSidebarWrapper,
} from "Renderer/components/core/table/table.component"
import { basicRows } from "Renderer/components/core/table/table.fake-data"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import useTableSidebar from "Renderer/utils/hooks/useTableSidebar"

export default () => {
  const {
    openSidebar,
    closeSidebar,
    sidebarOpened,
    activeRow,
  } = useTableSidebar<typeof basicRows[number]>()

  const SidebarTitle = () => (
    <Text displayStyle={TextDisplayStyle.LargeText}>
      {activeRow?.firstName} {activeRow?.lastName}
    </Text>
  )

  return (
    <TableWithSidebarWrapper style={{ maxWidth: "97.5rem" }}>
      <Contacts hideableColumnsIndexes={[1]} hideColumns={sidebarOpened}>
        <Labels>
          <Col>Name</Col>
          <Col>Phone</Col>
        </Labels>
        {basicRows.map((row, index) => {
          const onClick = () => openSidebar(row)
          return (
            <Row key={index} onClick={onClick} active={activeRow === row}>
              <Col>
                {row.firstName} {row.lastName}
              </Col>
              <Col>{row.phoneNumber}</Col>
            </Row>
          )
        })}
      </Contacts>
      <Sidebar
        show={sidebarOpened}
        onClose={closeSidebar}
        headerLeft={<SidebarTitle />}
      >
        <p>Phone</p>
        <p>{activeRow?.phoneNumber}</p>
      </Sidebar>
    </TableWithSidebarWrapper>
  )
}
