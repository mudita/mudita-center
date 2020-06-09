import { action } from "@storybook/addon-actions"
import { storiesOf } from "@storybook/react"
import React from "react"
import { Type } from "Renderer/components/core/icon/icon.config"
import {
  Checkbox,
  Contacts,
  SelectableContacts,
  SelectableFiles,
} from "Renderer/components/core/table/stories/styles"
import {
  Col,
  EmptyState,
  Group,
  Labels,
  NestedGroup,
  Row,
  RowSize,
  Sidebar,
  SidebarHeaderIcon,
  TableWithSidebarWrapper,
} from "Renderer/components/core/table/table.component"
import {
  labeledRows,
  nestedRows,
} from "Renderer/components/core/table/table.fake-data"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import useTableSelect from "Renderer/utils/hooks/useTableSelect"
import useTableSidebar from "Renderer/utils/hooks/useTableSidebar"

// Stories
import partsLabels from "Renderer/components/core/table/stories/parts/labels"
import partsRowsTypes from "Renderer/components/core/table/stories/parts/rows-types"
import partsRowsStates from "Renderer/components/core/table/stories/parts/rows-states"
import partsSidebar from "Renderer/components/core/table/stories/parts/sidebar"
import partsLoadingState from "Renderer/components/core/table/stories/parts/loading-state"
import partsEmptyState from "Renderer/components/core/table/stories/parts/empty-state"

import basicEmpty from "Renderer/components/core/table/stories/basic/empty"
import basicWithData from "Renderer/components/core/table/stories/basic/with-data"
import basicWithoutLabel from "Renderer/components/core/table/stories/basic/without-label"
import basicWithColumnsHidden from "Renderer/components/core/table/stories/basic/with-columns-hidden"
import basicWithSidebar from "Renderer/components/core/table/stories/basic/with-sidebar"
import basicWithSelectableRows from "Renderer/components/core/table/stories/basic/with-selectable-rows"

import nestedEmpty from "Renderer/components/core/table/stories/nested/empty"
import nestedWithData from "Renderer/components/core/table/stories/nested/with-data"
import nestedWithoutLabels from "Renderer/components/core/table/stories/nested/without-labels"
import nestedWithColumnsHidden from "Renderer/components/core/table/stories/nested/with-columns-hidden"

storiesOf("Components|Table/Parts", module)
  .add("Labels", partsLabels)
  .add("Rows / types", partsRowsTypes)
  .add("Rows / states", partsRowsStates)
  .add("Sidebar", partsSidebar)
  .add("Loading state", partsLoadingState)
  .add("Empty state", partsEmptyState)

storiesOf("Components|Table/Basic", module)
  .add("Empty", basicEmpty)
  .add("With data", basicWithData)
  .add("Without labels", basicWithoutLabel)
  .add("With columns hidden", basicWithColumnsHidden)
  .add("With sidebar", basicWithSidebar)
  .add("With selectable rows", basicWithSelectableRows)

storiesOf("Components|Table/Nested", module)
  .add("Empty", nestedEmpty)
  .add("With data", nestedWithData)
  .add("Without labels", nestedWithoutLabels)
  .add("With columns hidden", nestedWithColumnsHidden)
  .add("With selectable rows", () => {
    const {
      toggleRow,
      toggleAll,
      getRowStatus,
      allRowsSelected,
      noneRowsSelected,
    } = useTableSelect(nestedRows)

    const SingleRow = ({ data, ...rest }: any) => {
      const onChange = () => {
        toggleRow(data)
      }
      const { selected, indeterminate } = getRowStatus(data)
      return (
        <Row {...rest}>
          <Col>
            <Checkbox
              checked={selected}
              indeterminate={indeterminate}
              onChange={onChange}
            />
            <div>{data.fileType}</div>
          </Col>
          <Col>{new Date(data.lastBackup).toLocaleString()}</Col>
          <Col>{data.size}</Col>
        </Row>
      )
    }
    return (
      <SelectableFiles>
        <Labels>
          <Col>
            <Checkbox
              onChange={toggleAll}
              checked={allRowsSelected}
              indeterminate={!allRowsSelected && !noneRowsSelected}
            />
            <div>File type</div>
          </Col>
          <Col>Last backup</Col>
          <Col>Size</Col>
        </Labels>
        {nestedRows.map((row, index) => (
          <React.Fragment key={index}>
            <SingleRow data={row} size={RowSize.Small} />
            {row._children && (
              <NestedGroup>
                {row._children.map((childRow, childIndex) => (
                  <SingleRow
                    data={childRow}
                    key={childIndex}
                    size={RowSize.Tiny}
                  />
                ))}
              </NestedGroup>
            )}
          </React.Fragment>
        ))}
      </SelectableFiles>
    )
  })

storiesOf("Components|Table/Grouped", module)
  .add("Empty", () => (
    <Contacts>
      <EmptyState
        title={{ id: "view.name.phone.contacts.emptyList.title" }}
        description={{
          id: "view.name.phone.contacts.emptyList.emptyPhonebook.description",
        }}
      />
    </Contacts>
  ))
  .add("With data", () => (
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
  ))
  .add("With hidden columns", () => (
    <Contacts hideableColumnsIndexes={[1]} hideColumns>
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
  ))
  .add("With sidebar", () => {
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
  })
  .add("With selectable rows", () => {
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
  })
