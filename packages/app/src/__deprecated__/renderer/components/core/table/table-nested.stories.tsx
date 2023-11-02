/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import {
  Col,
  Labels,
  NestedGroup,
  Row,
  RowSize,
} from "App/__deprecated__/renderer/components/core/table/table.component"
import Story from "App/__deprecated__/renderer/components/storybook/story.component"
import { fullPageStoryStyles } from "App/__deprecated__/renderer/components/core/table/table-shared.stories"
import { nestedRows } from "App/__deprecated__/renderer/components/core/table/table.fake-data"
import useTableSelect from "App/__deprecated__/renderer/utils/hooks/useTableSelect"
import { Checkbox, Files, SelectableFiles } from "App/__deprecated__/renderer/components/core/table/table-grouped.stories"

export default {
  title: 'Components|Core/Table/Nested',
};

export const _Default = () => {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const SingleRow = ({ data, ...rest }: any) => (
    <Row {...rest}>
      {/* AUTO DISABLED - fix me if you like :) */}
      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
      <Col>{data.fileType}</Col>
      {/* AUTO DISABLED - fix me if you like :) */}
      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
      <Col>{new Date(data.lastBackup).toLocaleString()}</Col>
      {/* AUTO DISABLED - fix me if you like :) */}
      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
      <Col>{data.size}</Col>
    </Row>
  )
  return (
    <Story customStyle={fullPageStoryStyles} transparentMode>
      <Files>
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
    </Story>
  )
};

_Default.story = {
  name: 'Default labels',
};


export const _WithoutLabels = () => {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const SingleRow = ({ data, ...rest }: any) => (
    <Row {...rest}>
      {/* AUTO DISABLED - fix me if you like :) */}
      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
      <Col>{data.fileType}</Col>
      {/* AUTO DISABLED - fix me if you like :) */}
      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
      <Col>{new Date(data.lastBackup).toLocaleString()}</Col>
      {/* AUTO DISABLED - fix me if you like :) */}
      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
      <Col>{data.size}</Col>
    </Row>
  )
  return (
    <Story customStyle={fullPageStoryStyles} transparentMode>
      <Files>
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
    </Story>
  )
};

_WithoutLabels.story = {
  name: 'Without labels',
};

export const _WithColumnsHidden = () => {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const SingleRow = ({ data, ...rest }: any) => (
    <Row {...rest}>
      {/* AUTO DISABLED - fix me if you like :) */}
      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
      <Col>{data.fileType}</Col>
      {/* AUTO DISABLED - fix me if you like :) */}
      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
      <Col>{new Date(data.lastBackup).toLocaleString()}</Col>
      {/* AUTO DISABLED - fix me if you like :) */}
      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
      <Col>{data.size}</Col>
    </Row>
  )
  return (
    <Story customStyle={fullPageStoryStyles} transparentMode>
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
    </Story>
  )
};

_WithColumnsHidden.story = {
  name: 'With columns hidden',
};

export const _WithSelectableRows = () => {
  const {
    toggleRow,
    toggleAll,
    getRowStatus,
    allRowsSelected,
    noneRowsSelected,
  } = useTableSelect(nestedRows)

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
          {/* AUTO DISABLED - fix me if you like :) */}
          {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
          <div>{data.fileType}</div>
        </Col>
        {/* AUTO DISABLED - fix me if you like :) */}
        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
        <Col>{new Date(data.lastBackup).toLocaleString()}</Col>
        {/* AUTO DISABLED - fix me if you like :) */}
        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
        <Col>{data.size}</Col>
      </Row>
    )
  }
  return (
    <Story customStyle={fullPageStoryStyles} transparentMode>
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
    </Story>
  )
};

_WithSelectableRows.story = {
  name: 'With selectable rows',
};
