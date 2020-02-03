import { storiesOf } from "@storybook/react"
import React from "react"
import InputCheckbox from "Renderer/components/core/input-checkbox/input-checkbox.component"
import Table, {
  Col,
  Group,
  Labels,
  NestedGroup,
  Row,
  RowSize,
} from "Renderer/components/core/table/table.component"
import {
  basicRows,
  labeledRows,
  nestedRows,
  sortedBasicRows,
} from "Renderer/components/core/table/table.fake-data"
import useTableSelect from "Renderer/utils/hooks/useTableSelect"
import styled from "styled-components"

const CustomizedBasicTable = styled(Table)`
  --columnsTemplate: 1fr 1fr;
  --columnsTemplateWithOpenedSidebar: 1fr;
`

const CustomizedNestedTable = styled(Table)`
  --columnsTemplate: 1fr 1fr 10rem;
  --columnsTemplateWithOpenedSidebar: 1fr;
`

const ColWithPadding = styled(Col)`
  padding-left: 2rem;
`

const StyledSelectableCol = styled(Col)`
  div {
    margin-left: 2rem;
  }
  > div:first-of-type {
    transform: scale(0.7);
  }
`

export const BasicTableExample = ({ sidebarOpened = false }) => {
  const SingleRow = ({ data }: { data: typeof basicRows[number] }) => (
    <Row data-testid="row">
      <ColWithPadding>
        {data.firstName} {data.lastName}
      </ColWithPadding>
      <Col hideable>{data.phoneNumber}</Col>
    </Row>
  )

  return (
    <CustomizedBasicTable sidebarOpened={sidebarOpened}>
      <Labels>
        <ColWithPadding data-testid="column-label">Name</ColWithPadding>
        <Col hideable data-testid="column-label">
          Phone
        </Col>
      </Labels>
      {basicRows.map((row, index) => (
        <SingleRow key={index} data={row} />
      ))}
    </CustomizedBasicTable>
  )
}

storiesOf("Components|Table/Basic", module)
  .add("With column labels", () => <BasicTableExample />)
  .add("With column labels and hideable columns disabled", () => (
    <BasicTableExample sidebarOpened />
  ))

export const NestedTableExample = ({ sidebarOpened = false }) => {
  const SingleRow = ({ data, ...rest }: any) => (
    <Row {...rest}>
      <ColWithPadding>{data.fileType}</ColWithPadding>
      <Col hideable>{new Date(data.lastBackup).toLocaleString()}</Col>
      <Col hideable>{data.size}</Col>
    </Row>
  )

  return (
    <CustomizedNestedTable sidebarOpened={sidebarOpened}>
      <Labels>
        <ColWithPadding data-testid="column-label">File type</ColWithPadding>
        <Col hideable data-testid="column-label">
          Last backup
        </Col>
        <Col hideable data-testid="column-label">
          Size
        </Col>
      </Labels>
      {nestedRows.map((row, index) => (
        <React.Fragment key={index}>
          <SingleRow data={row} size={RowSize.Small} data-testid="row" />
          {row._children && (
            <NestedGroup>
              {row._children.map((childRow, childIndex) => (
                <SingleRow
                  data={childRow}
                  key={childIndex}
                  size={RowSize.Tiny}
                  data-testid="nested-row"
                />
              ))}
            </NestedGroup>
          )}
        </React.Fragment>
      ))}
    </CustomizedNestedTable>
  )
}

export const SelectableNestedTableExample = ({ sidebarOpened = false }) => {
  const {
    toggleRow,
    toggleAll,
    getRowStatus,
    allRowsChecked,
    noneRowsChecked,
  } = useTableSelect(nestedRows)

  const SingleRow = ({ data, ...rest }: any) => {
    const onChange = () => {
      toggleRow(data)
    }

    const { checked, indeterminate } = getRowStatus(data)

    return (
      <Row {...rest}>
        <StyledSelectableCol>
          <InputCheckbox
            checked={checked}
            indeterminate={indeterminate}
            onChange={onChange}
          />
          <div>{data.fileType}</div>
        </StyledSelectableCol>
        <Col hideable>{new Date(data.lastBackup).toLocaleString()}</Col>
        <Col hideable>{data.size}</Col>
      </Row>
    )
  }

  return (
    <CustomizedNestedTable sidebarOpened={sidebarOpened}>
      <Labels>
        <StyledSelectableCol>
          <InputCheckbox
            onChange={toggleAll}
            checked={allRowsChecked}
            indeterminate={!allRowsChecked && !noneRowsChecked}
          />
          <div>File type</div>
        </StyledSelectableCol>
        <Col hideable data-testid="column-label">
          Last backup
        </Col>
        <Col hideable data-testid="column-label">
          Size
        </Col>
      </Labels>
      {nestedRows.map((row, index) => (
        <React.Fragment key={index}>
          <SingleRow data={row} size={RowSize.Small} data-testid="row" />
          {row._children && (
            <NestedGroup>
              {row._children.map((childRow, childIndex) => (
                <SingleRow
                  data={childRow}
                  key={childIndex}
                  size={RowSize.Tiny}
                  data-testid="nested-row"
                />
              ))}
            </NestedGroup>
          )}
        </React.Fragment>
      ))}
    </CustomizedNestedTable>
  )
}

storiesOf("Components|Table/Nested", module)
  .add("With column labels", () => <NestedTableExample />)
  .add("With column labels and hideable columns disabled", () => (
    <NestedTableExample sidebarOpened />
  ))
  .add("With selectable rows", () => <SelectableNestedTableExample />)

export const GroupedTableExample = ({ sidebarOpened = false }) => {
  const SingleRow = ({ data }: { data: typeof basicRows[number] }) => (
    <Row data-testid="row">
      <ColWithPadding>
        {data.firstName} {data.lastName}
      </ColWithPadding>
      <Col hideable>{data.phoneNumber}</Col>
    </Row>
  )

  return (
    <CustomizedBasicTable sidebarOpened={sidebarOpened}>
      {Object.keys(labeledRows).map(group => (
        <Group key={group} data-testid="group">
          <Labels data-testid="group-label">
            <ColWithPadding>{group}</ColWithPadding>
          </Labels>
          {labeledRows[group].map((row: any, rowIndex: number) => (
            <SingleRow key={rowIndex} data={row} />
          ))}
        </Group>
      ))}
    </CustomizedBasicTable>
  )
}

export const SelectableGroupedTableExample = ({ sidebarOpened = false }) => {
  const { toggleRow, getRowStatus } = useTableSelect(sortedBasicRows)

  const SingleRow = ({ data }: { data: typeof basicRows[number] }) => {
    const onChange = () => {
      toggleRow(data)
    }
    const { checked, indeterminate } = getRowStatus(data)
    return (
      <Row data-testid="row">
        <StyledSelectableCol>
          <InputCheckbox
            onChange={onChange}
            checked={checked}
            indeterminate={indeterminate}
          />
          <div>
            {data.firstName} {data.lastName}
          </div>
        </StyledSelectableCol>
        <Col hideable>{data.phoneNumber}</Col>
      </Row>
    )
  }

  return (
    <CustomizedBasicTable sidebarOpened={sidebarOpened}>
      {Object.keys(labeledRows).map(group => (
        <Group key={group} data-testid="group">
          <Labels data-testid="group-label">
            <ColWithPadding>{group}</ColWithPadding>
          </Labels>
          {labeledRows[group].map((row: any, rowIndex: number) => (
            <SingleRow key={rowIndex} data={row} />
          ))}
        </Group>
      ))}
    </CustomizedBasicTable>
  )
}

storiesOf("Components|Table/Grouped", module)
  .add("With all columns", () => <GroupedTableExample />)
  .add("With hideable columns disabled", () => (
    <GroupedTableExample sidebarOpened />
  ))
  .add("With selectable rows", () => <SelectableGroupedTableExample />)
