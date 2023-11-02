/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import Story from "App/__deprecated__/renderer/components/storybook/story.component"
import { fullPageStoryStyles } from "App/__deprecated__/renderer/components/core/table/table-shared.stories"
import {
  Col,
  Labels,
  Row,
  Sidebar,
  TableWithSidebarWrapper,
} from "App/__deprecated__/renderer/components/core/table/table.component"
import { basicRows } from "App/__deprecated__/renderer/components/core/table/table.fake-data"
import useTableSidebar from "App/__deprecated__/renderer/utils/hooks/use-table-sidebar"
import Text, {
  TextDisplayStyle,
} from "App/__deprecated__/renderer/components/core/text/text.component"
import useTableSelect from "App/__deprecated__/renderer/utils/hooks/useTableSelect"
import {
  Checkbox,
  Contacts,
  SelectableContacts,
} from "App/__deprecated__/renderer/components/core/table/table-grouped.stories"

export default {
  title: "Components|Core/Table/Basic",
}

export const Default = () => (
  <Story customStyle={fullPageStoryStyles} transparentMode>
    <Contacts>
      <Labels>
        <Col>Name</Col>
        <Col>Phone</Col>
      </Labels>
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
  </Story>
)

export const WithoutLabels = () => (
  <Story customStyle={fullPageStoryStyles} transparentMode>
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
  </Story>
)

WithoutLabels.story = {
  name: "Without labels",
}

export const WithColumnsHidden = () => (
  <Story customStyle={fullPageStoryStyles} transparentMode>
    <Contacts hideableColumnsIndexes={[1]} hideColumns>
      <Labels>
        <Col>Name</Col>
        <Col>Phone</Col>
      </Labels>
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
  </Story>
)

WithColumnsHidden.story = {
  name: "With columns hidden",
}

export const WithSidebar = () => {
  const { openSidebar, closeSidebar, sidebarOpened, activeRow } =
    useTableSidebar<(typeof basicRows)[number]>()

  const SidebarTitle = () => (
    <Text displayStyle={TextDisplayStyle.Paragraph1}>
      {activeRow?.firstName} {activeRow?.lastName}
    </Text>
  )

  return (
    <Story customStyle={fullPageStoryStyles} transparentMode>
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
    </Story>
  )
}

WithSidebar.story = {
  name: "With sidebar",
}

export const WithSelectableRows = () => {
  const { getRowStatus, toggleRow } = useTableSelect(basicRows)
  return (
    <Story customStyle={fullPageStoryStyles} transparentMode>
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
    </Story>
  )
}

WithSelectableRows.story = {
  name: "With selectable rows",
}
