import { action } from "@storybook/addon-actions"
import React from "react"
import { Type } from "Renderer/components/core/icon/icon.config"
import { Contacts } from "Renderer/components/core/table/stories/styles"
import {
  Col,
  Group,
  Labels,
  Row,
  Sidebar,
  SidebarHeaderIcon,
  TableWithSidebarWrapper,
} from "Renderer/components/core/table/table.component"
import { labeledRows } from "Renderer/components/core/table/table.fake-data"
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
  } = useTableSidebar<typeof labeledRows[number][number]>()

  const SidebarTitle = () => (
    <Text displayStyle={TextDisplayStyle.LargeText}>
      {activeRow?.firstName} {activeRow?.lastName}
    </Text>
  )

  const SidebarActions = () => (
    <>
      <SidebarHeaderIcon Icon={Type.Upload} onClick={action("Export")} />
      <SidebarHeaderIcon Icon={Type.Delete} onClick={action("Delete")} />
    </>
  )

  return (
    <TableWithSidebarWrapper>
      <Contacts hideableColumnsIndexes={[1]} hideColumns={sidebarOpened}>
        {Object.keys(labeledRows).map(group => (
          <Group key={group}>
            <Labels>
              <Col>{group}</Col>
            </Labels>
            {labeledRows[group].map((row: any, index: number) => {
              const onClick = () => openSidebar(row)
              return (
                <Row key={index} onClick={onClick}>
                  <Col>
                    {row.firstName} {row.lastName}
                  </Col>
                  <Col>{row.phoneNumber}</Col>
                </Row>
              )
            })}
          </Group>
        ))}
      </Contacts>
      <Sidebar
        show={sidebarOpened}
        onClose={closeSidebar}
        headerLeft={<SidebarTitle />}
        headerRight={<SidebarActions />}
      >
        <p>Phone</p>
        <p>{activeRow?.phoneNumber}</p>
      </Sidebar>
    </TableWithSidebarWrapper>
  )
}
