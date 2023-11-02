/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import styled from "styled-components"
import { action } from "@storybook/addon-actions"
import InputCheckbox from "App/__deprecated__/renderer/components/core/input-checkbox/input-checkbox.component"
import Table, {
  Col,
  Group,
  Labels,
  Row,
  Sidebar,
  SidebarHeaderButton,
  TableWithSidebarWrapper,
} from "App/__deprecated__/renderer/components/core/table/table.component"
import {
  labeledRows,
  nestedRows,
} from "App/__deprecated__/renderer/components/core/table/table.fake-data"
import Text, {
  TextDisplayStyle,
} from "App/__deprecated__/renderer/components/core/text/text.component"
import useTableSelect from "App/__deprecated__/renderer/utils/hooks/useTableSelect"
import useTableSidebar from "App/__deprecated__/renderer/utils/hooks/use-table-sidebar"
import Story from "App/__deprecated__/renderer/components/storybook/story.component"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"
import { fullPageStoryStyles } from "App/__deprecated__/renderer/components/core/table/table-shared.stories"

export const Checkbox = styled(InputCheckbox)``

export const Contacts = styled(Table)`
  --columnsTemplate: 1fr 1fr;
  --columnsTemplateWithOpenedSidebar: 1fr;
  --columnsGap: 2rem;

  height: 100vh;
`

export const SelectableContacts = styled(Contacts)`
  --columnsTemplate: 4rem 1fr 1fr;
  --columnsTemplateWithOpenedSidebar: 4rem 1fr;

  ${Col} {
    :first-of-type {
      justify-content: flex-end;
    }
  }
`

export const Files = styled(Table)`
  --columnsTemplate: 1fr 1fr 10rem;
  --columnsTemplateWithOpenedSidebar: 1fr;
  --columnsGap: 2rem;
  --nestSize: 2rem;

  height: 100vh;
`

export const SelectableFiles = styled(Files)`
  ${Checkbox} {
    margin-right: 2rem;
  }
`

export default {
  title: "Components|Core/Table/Grouped",
  excludeStories: [
    "Checkbox",
    "Contacts",
    "SelectableContacts",
    "Files",
    "SelectableFiles",
  ],
}

export const __Default = () => (
  <Story customStyle={fullPageStoryStyles} transparentMode>
    <Contacts>
      {Object.keys(labeledRows).map((group) => (
        <Group key={group}>
          <Labels>
            <Col>{group}</Col>
          </Labels>
          {/* AUTO DISABLED - fix me if you like :) */}
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {labeledRows[group].map((row: any, index: number) => (
            <Row key={index}>
              <Col>
                {/* AUTO DISABLED - fix me if you like :) */}
                {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
                {row.firstName} {row.lastName}
              </Col>
              {/* AUTO DISABLED - fix me if you like :) */}
              {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
              <Col>{row.phoneNumber}</Col>
            </Row>
          ))}
        </Group>
      ))}
    </Contacts>
  </Story>
)

export const WithHiddenColumns = () => (
  <Story customStyle={fullPageStoryStyles} transparentMode>
    <Contacts hideableColumnsIndexes={[1]} hideColumns>
      {Object.keys(labeledRows).map((group) => (
        <Group key={group}>
          <Labels>
            <Col>{group}</Col>
          </Labels>
          {/* AUTO DISABLED - fix me if you like :) */}
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {labeledRows[group].map((row: any, index: number) => (
            <Row key={index}>
              <Col>
                {/* AUTO DISABLED - fix me if you like :) */}
                {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
                {row.firstName} {row.lastName}
              </Col>
              {/* AUTO DISABLED - fix me if you like :) */}
              {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
              <Col>{row.phoneNumber}</Col>
            </Row>
          ))}
        </Group>
      ))}
    </Contacts>
  </Story>
)

WithHiddenColumns.story = {
  name: "With hidden columns",
}

export const _WithSidebar = () => {
  const { openSidebar, closeSidebar, sidebarOpened, activeRow } =
    useTableSidebar<(typeof labeledRows)[number][number]>()

  const SidebarTitle = () => (
    <Text displayStyle={TextDisplayStyle.Paragraph1}>
      {activeRow?.firstName} {activeRow?.lastName}
    </Text>
  )

  const SidebarActions = () => (
    <>
      <SidebarHeaderButton
        iconType={IconType.Upload}
        onClick={action("Export")}
        description={{ id: "Export" }}
      />
      <SidebarHeaderButton
        iconType={IconType.Delete}
        onClick={action("Delete")}
        description={{ id: "Delete" }}
      />
    </>
  )

  return (
    <Story customStyle={fullPageStoryStyles} transparentMode>
      <TableWithSidebarWrapper>
        <Contacts hideableColumnsIndexes={[1]} hideColumns={sidebarOpened}>
          {Object.keys(labeledRows).map((group) => (
            <Group key={group}>
              <Labels>
                <Col>{group}</Col>
              </Labels>
              {/* AUTO DISABLED - fix me if you like :) */}
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {labeledRows[group].map((row: any, index: number) => {
                const onClick = () => openSidebar(row)
                return (
                  <Row key={index} onClick={onClick}>
                    <Col>
                      {/* AUTO DISABLED - fix me if you like :) */}
                      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
                      {row.firstName} {row.lastName}
                    </Col>
                    {/* AUTO DISABLED - fix me if you like :) */}
                    {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
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
    </Story>
  )
}

_WithSidebar.story = {
  name: "With sidebar",
}

export const __WithSelectableRows = () => {
  const { toggleRow, getRowStatus } = useTableSelect(nestedRows)
  return (
    <Story customStyle={fullPageStoryStyles} transparentMode>
      <SelectableContacts>
        {Object.keys(labeledRows).map((group) => (
          <Group key={group}>
            <Labels>
              <Col />
              <Col>{group}</Col>
            </Labels>
            {/* AUTO DISABLED - fix me if you like :) */}
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
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
                    {/* AUTO DISABLED - fix me if you like :) */}
                    {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
                    {row.firstName} {row.lastName}
                  </Col>
                  {/* AUTO DISABLED - fix me if you like :) */}
                  {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
                  <Col>{row.phoneNumber}</Col>
                </Row>
              )
            })}
          </Group>
        ))}
      </SelectableContacts>
    </Story>
  )
}

__WithSelectableRows.story = {
  name: "With selectable rows",
}
