import React from "react"
import { Files } from "Renderer/components/core/table/stories/styles"
import {
  Col,
  Labels,
  NestedGroup,
  Row,
  RowSize,
} from "Renderer/components/core/table/table.component"
import { nestedRows } from "Renderer/components/core/table/table.fake-data"

export default () => {
  const SingleRow = ({ data, ...rest }: any) => (
    <Row {...rest}>
      <Col>{data.fileType}</Col>
      <Col>{new Date(data.lastBackup).toLocaleString()}</Col>
      <Col>{data.size}</Col>
    </Row>
  )
  return (
    <Files hideableColumnsIndexes={[1, 2]} hideColumns>
      <Labels>
        <Col>File type</Col>
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
    </Files>
  )
}
