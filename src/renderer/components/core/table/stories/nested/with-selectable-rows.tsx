import React from "react"
import {
  Checkbox,
  SelectableFiles,
} from "Renderer/components/core/table/stories/styles"
import {
  Col,
  Labels,
  NestedGroup,
  Row,
  RowSize,
} from "Renderer/components/core/table/table.component"
import { nestedRows } from "Renderer/components/core/table/table.fake-data"
import useTableSelect from "Renderer/utils/hooks/useTableSelect"

export default () => {
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
}
