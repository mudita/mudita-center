import { storiesOf } from "@storybook/react"
import React from "react"
import Table, {
  Col,
  EmptyState,
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
} from "Renderer/components/core/table/table.fake-data"
import useTableSelect from "Renderer/utils/hooks/useTableSelect"
import styled from "styled-components"
import InputCheckbox from "Renderer/components/core/input-checkbox/input-checkbox.component"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { noop } from "Renderer/utils/noop"
import theme from "Renderer/styles/theming/theme"

const Checkbox = styled(InputCheckbox)``

const Contacts = styled(Table)`
  --columnsTemplate: 1fr 1fr;
  --columnsTemplateWithOpenedSidebar: 1fr;
  --columnsGap: 2rem;
`

const SelectableContacts = styled(Contacts)`
  --columnsTemplate: 4rem 1fr 1fr;
  --columnsTemplateWithOpenedSidebar: 4rem 1fr;

  ${Col} {
    &:first-of-type {
      justify-content: flex-end;
    }
  }
`

const Files = styled(Table)`
  --columnsTemplate: 1fr 1fr 10rem;
  --columnsTemplateWithOpenedSidebar: 1fr;
  --columnsGap: 2rem;
`

const SelectableFiles = styled(Files)`
  ${Checkbox} {
    margin-right: 2rem;
  }
`

const Part = styled.div`
  padding: 2rem;
  p {
    margin-bottom: 2rem;
  }
`

storiesOf("Components|Table/Parts", module)
  .add("Labels", () => (
    <>
      <Part>
        <Text displayStyle={TextDisplayStyle.SmallText}>Column labels</Text>
        <Files>
          <Labels>
            <Col>File type</Col>
            <Col>Last backup</Col>
            <Col>Size</Col>
          </Labels>
        </Files>
      </Part>
      <Part>
        <Text displayStyle={TextDisplayStyle.SmallText}>Group label</Text>
        <Files>
          <Group>
            <Labels>
              <Col>Favourites</Col>
            </Labels>
          </Group>
        </Files>
      </Part>
    </>
  ))
  .add("Rows / types", () => (
    <>
      <Part>
        <Text displayStyle={TextDisplayStyle.SmallText}>Big row</Text>
        <Files>
          <Row size={RowSize.Big}>
            <Col>Music</Col>
            <Col>{new Date().toLocaleString()}</Col>
            <Col>50 MB</Col>
          </Row>
        </Files>
      </Part>
      <Part>
        <Text displayStyle={TextDisplayStyle.SmallText}>
          Medium (default) row
        </Text>
        <Files>
          <Row>
            <Col>Music</Col>
            <Col>{new Date().toLocaleString()}</Col>
            <Col>50 MB</Col>
          </Row>
        </Files>
      </Part>
      <Part>
        <Text displayStyle={TextDisplayStyle.SmallText}>Small row</Text>
        <Files>
          <Row size={RowSize.Small}>
            <Col>Music</Col>
            <Col>{new Date().toLocaleString()}</Col>
            <Col>50 MB</Col>
          </Row>
        </Files>
      </Part>
      <Part>
        <Text displayStyle={TextDisplayStyle.SmallText}>Tiny row</Text>
        <Files>
          <Row size={RowSize.Tiny}>
            <Col>Music</Col>
            <Col>{new Date().toLocaleString()}</Col>
            <Col>50 MB</Col>
          </Row>
        </Files>
      </Part>
      <Part>
        <Text displayStyle={TextDisplayStyle.SmallText}>
          Nested rows (default and small)
        </Text>
        <Files>
          <Row>
            <Col>Music</Col>
            <Col>{new Date().toLocaleString()}</Col>
            <Col>50 MB</Col>
          </Row>
          <NestedGroup>
            <Row size={RowSize.Small}>
              <Col>Ringtones</Col>
              <Col>{new Date().toLocaleString()}</Col>
              <Col>10 MB</Col>
            </Row>
            <Row size={RowSize.Small}>
              <Col>Songs</Col>
              <Col>{new Date().toLocaleString()}</Col>
              <Col>40 MB</Col>
            </Row>
          </NestedGroup>
        </Files>
      </Part>
    </>
  ))
  .add("Rows / states", () => (
    <>
      <Part>
        <Text displayStyle={TextDisplayStyle.SmallText}>Default</Text>
        <SelectableFiles>
          <Row>
            <Col>
              <Checkbox checked={false} onChange={noop} />
              <div>Music</div>
            </Col>
            <Col>{new Date().toLocaleString()}</Col>
            <Col>50 MB</Col>
          </Row>
        </SelectableFiles>
      </Part>
      <Part>
        <Text displayStyle={TextDisplayStyle.SmallText}>Hovered</Text>
        <SelectableFiles>
          <Row style={{ backgroundColor: theme.color.background.accent }}>
            <Col>
              <Checkbox checked={false} onChange={noop} />
              <div>Music</div>
            </Col>
            <Col>{new Date().toLocaleString()}</Col>
            <Col>50 MB</Col>
          </Row>
        </SelectableFiles>
      </Part>
      <Part>
        <Text displayStyle={TextDisplayStyle.SmallText}>
          Active (clickable)
        </Text>
        <SelectableFiles>
          <Row active onClick={noop}>
            <Col>
              <Checkbox checked={false} onChange={noop} />
              <div>Music</div>
            </Col>
            <Col>{new Date().toLocaleString()}</Col>
            <Col>50 MB</Col>
          </Row>
        </SelectableFiles>
      </Part>
      <Part>
        <Text displayStyle={TextDisplayStyle.SmallText}>Selected</Text>
        <SelectableFiles>
          <Row selected>
            <Col>
              <Checkbox checked={true} onChange={noop} />
              <div>Music</div>
            </Col>
            <Col>{new Date().toLocaleString()}</Col>
            <Col>50 MB</Col>
          </Row>
        </SelectableFiles>
      </Part>
    </>
  ))

storiesOf("Components|Table/Basic", module)
  .add("Empty", () => (
    <Contacts>
      <Labels>
        <Col>Name</Col>
        <Col>Phone</Col>
      </Labels>
      <EmptyState>
        <Col>No contacts available</Col>
      </EmptyState>
    </Contacts>
  ))
  .add("With data", () => (
    <Contacts>
      <Labels>
        <Col>Name</Col>
        <Col>Phone</Col>
      </Labels>
      {basicRows.map((row, index) => {
        return (
          <Row data-testid="row" key={index}>
            <Col>
              {row.firstName} {row.lastName}
            </Col>
            <Col>{row.phoneNumber}</Col>
          </Row>
        )
      })}
    </Contacts>
  ))
  .add("Without labels", () => (
    <Contacts>
      {basicRows.map((row, index) => {
        return (
          <Row data-testid="row" key={index}>
            <Col>
              {row.firstName} {row.lastName}
            </Col>
            <Col>{row.phoneNumber}</Col>
          </Row>
        )
      })}
    </Contacts>
  ))
  .add("With columns hidden", () => (
    <Contacts hideableColumnsIndexes={[1]} hideColumns>
      <Labels>
        <Col>Name</Col>
        <Col>Phone</Col>
      </Labels>
      {basicRows.map((row, index) => {
        return (
          <Row data-testid="row" key={index}>
            <Col>
              {row.firstName} {row.lastName}
            </Col>
            <Col>{row.phoneNumber}</Col>
          </Row>
        )
      })}
    </Contacts>
  ))
  .add("With selectable rows", () => {
    const { getRowStatus, toggleRow } = useTableSelect(basicRows)
    return (
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
            <Row data-testid="row" key={index}>
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
    )
  })

storiesOf("Components|Table/Nested", module)
  .add("Empty", () => (
    <Files>
      <Labels>
        <Col>File type</Col>
        <Col>Last backup</Col>
        <Col>Size</Col>
      </Labels>
      <EmptyState>
        <Col>No files available</Col>
      </EmptyState>
    </Files>
  ))
  .add("With data", () => {
    const SingleRow = ({ data, ...rest }: any) => (
      <Row {...rest}>
        <Col>{data.fileType}</Col>
        <Col>{new Date(data.lastBackup).toLocaleString()}</Col>
        <Col>{data.size}</Col>
      </Row>
    )
    return (
      <Files>
        <Labels>
          <Col>File type</Col>
          <Col>Last backup</Col>
          <Col>Size</Col>
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
      </Files>
    )
  })
  .add("Without labels", () => {
    const SingleRow = ({ data, ...rest }: any) => (
      <Row {...rest}>
        <Col>{data.fileType}</Col>
        <Col>{new Date(data.lastBackup).toLocaleString()}</Col>
        <Col>{data.size}</Col>
      </Row>
    )
    return (
      <Files>
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
      </Files>
    )
  })
  .add("With columns hidden", () => {
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
      </Files>
    )
  })
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
          <Col data-testid="column-label">Last backup</Col>
          <Col data-testid="column-label">Size</Col>
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
      </SelectableFiles>
    )
  })

storiesOf("Components|Table/Grouped", module)
  .add("Empty", () => (
    <Contacts>
      <EmptyState>
        <Col>No contacts available</Col>
      </EmptyState>
    </Contacts>
  ))
  .add("With data", () => (
    <Contacts>
      {Object.keys(labeledRows).map(group => (
        <Group key={group} data-testid="group">
          <Labels data-testid="group-label">
            <Col>{group}</Col>
          </Labels>
          {labeledRows[group].map((row: any, index: number) => (
            <Row data-testid="row" key={index}>
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
        <Group key={group} data-testid="group">
          <Labels data-testid="group-label">
            <Col>{group}</Col>
          </Labels>
          {labeledRows[group].map((row: any, index: number) => (
            <Row data-testid="row" key={index}>
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
  .add("With selectable rows", () => {
    const { toggleRow, getRowStatus } = useTableSelect(nestedRows)
    return (
      <SelectableContacts>
        {Object.keys(labeledRows).map(group => (
          <Group key={group} data-testid="group">
            <Labels data-testid="group-label">
              <Col />
              <Col>{group}</Col>
            </Labels>
            {labeledRows[group].map((row: any, index: number) => {
              const { selected, indeterminate } = getRowStatus(row)
              const onChange = () => toggleRow(row)
              return (
                <Row data-testid="row" key={index}>
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
