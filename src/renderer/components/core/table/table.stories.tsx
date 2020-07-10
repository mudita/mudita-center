import { action } from "@storybook/addon-actions"
import { storiesOf } from "@storybook/react"
import React from "react"
import { Type } from "Renderer/components/core/icon/icon.config"
import InputCheckbox from "Renderer/components/core/input-checkbox/input-checkbox.component"
import Table, {
  Col,
  EmptyState,
  Group,
  Labels,
  LoadingState,
  NestedGroup,
  Row,
  RowSize,
  Sidebar,
  SidebarHeaderIcon,
  TableSortButton,
  TableWithSidebarWrapper,
} from "Renderer/components/core/table/table.component"
import {
  basicRows,
  labeledRows,
  nestedRows,
} from "Renderer/components/core/table/table.fake-data"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import theme from "Renderer/styles/theming/theme"
import useSort from "Renderer/utils/hooks/use-sort/use-sort"
import { SortDirection } from "Renderer/utils/hooks/use-sort/use-sort.types"
import useTableSelect from "Renderer/utils/hooks/useTableSelect"
import useTableSidebar from "Renderer/utils/hooks/useTableSidebar"
import { noop } from "Renderer/utils/noop"
import styled from "styled-components"

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

const Part = styled.div`
  padding: 2rem;
  p {
    margin-bottom: 2rem;
  }
`

const PartWrapper = styled.div`
  display: flex;
  height: 100vh;
`

const CustomSidebarTitle = styled(Text)`
  margin: 0 !important;
`

const CustomizedSidebar = styled(Sidebar)`
  --header-height: 8rem;
  --header-background: #eee;

  max-height: 24rem;
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
          <Row style={{ backgroundColor: theme.color.background.minor }}>
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
  .add("Sidebar", () => {
    const HeaderLeft = () => (
      <CustomSidebarTitle displayStyle={TextDisplayStyle.LargeBoldText}>
        Sidebar title
      </CustomSidebarTitle>
    )
    const HeaderRight = () => (
      <>
        <SidebarHeaderIcon
          Icon={Type.Notes}
          onClick={action("Notes icon click")}
        />
        <SidebarHeaderIcon
          Icon={Type.Upload}
          onClick={action("Upload icon click")}
        />
        <SidebarHeaderIcon
          Icon={Type.Delete}
          onClick={action("Delete icon click")}
        />
      </>
    )
    return (
      <>
        <Part>
          <Text displayStyle={TextDisplayStyle.SmallText}>Default</Text>
          <Sidebar onClose={action("Close sidebar")}>
            <p>Some content</p>
            <p>Some content</p>
            <p>Some content</p>
          </Sidebar>
        </Part>
        <Part>
          <Text displayStyle={TextDisplayStyle.SmallText}>With title</Text>
          <Sidebar
            onClose={action("Close sidebar")}
            headerLeft={<HeaderLeft />}
          >
            <p>Some content</p>
            <p>Some content</p>
            <p>Some content</p>
          </Sidebar>
        </Part>
        <Part>
          <Text displayStyle={TextDisplayStyle.SmallText}>With icons</Text>
          <Sidebar
            onClose={action("Close sidebar")}
            headerRight={<HeaderRight />}
          >
            <p>Some content</p>
            <p>Some content</p>
            <p>Some content</p>
          </Sidebar>
        </Part>
        <Part>
          <Text displayStyle={TextDisplayStyle.SmallText}>
            With title and icons
          </Text>
          <Sidebar
            onClose={action("Close sidebar")}
            headerLeft={<HeaderLeft />}
            headerRight={<HeaderRight />}
          >
            <p>Some content</p>
            <p>Some content</p>
            <p>Some content</p>
          </Sidebar>
        </Part>
        <Part>
          <Text displayStyle={TextDisplayStyle.SmallText}>
            With custom header styles
          </Text>
          <CustomizedSidebar
            onClose={action("Close sidebar")}
            headerLeft={<HeaderLeft />}
            headerRight={<HeaderRight />}
          >
            <p>Some content</p>
            <p>Some content</p>
            <p>Some content</p>
          </CustomizedSidebar>
        </Part>
        <Part>
          <Text displayStyle={TextDisplayStyle.SmallText}>
            With scrollable content
          </Text>
          <CustomizedSidebar
            onClose={action("Close sidebar")}
            headerLeft={<HeaderLeft />}
            headerRight={<HeaderRight />}
          >
            <p>Some content</p>
            <p>Some content</p>
            <p>Some content</p>
            <p>Some content</p>
            <p>Some content</p>
            <p>Some content</p>
            <p>Some content</p>
            <p>Some content</p>
            <p>Some content</p>
          </CustomizedSidebar>
        </Part>
      </>
    )
  })
  .add("Loading state", () => (
    <PartWrapper>
      <LoadingState />
    </PartWrapper>
  ))
  .add("Empty state", () => (
    <PartWrapper>
      <EmptyState
        title={{ id: "view.name.phone.contacts.emptyList.title" }}
        description={{
          id: "view.name.phone.contacts.emptyList.emptyPhonebook.description",
        }}
      />
    </PartWrapper>
  ))

storiesOf("Components|Table/Basic", module)
  .add("Empty", () => (
    <Contacts>
      <Labels>
        <Col>Name</Col>
        <Col>Phone</Col>
      </Labels>
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
  ))
  .add("Without labels", () => (
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
  ))
  .add("With columns hidden", () => (
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
  ))
  .add("With sidebar", () => {
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
  })
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
    )
  })
  .add("Sortable", () => {
    const { data, sort, sortDirection } = useSort(basicRows)

    const sortByName = () => {
      sort("firstName")
    }

    const sortByPhoneNumber = () => {
      sort("phoneNumber")
    }

    return (
      <Contacts>
        <Labels>
          <Col onClick={sortByName}>
            Name{" "}
            <TableSortButton
              sortDirection={sortDirection.firstName || SortDirection.Ascending}
            />
          </Col>
          <Col onClick={sortByPhoneNumber}>
            Phone{" "}
            <TableSortButton
              sortDirection={
                sortDirection.phoneNumber || SortDirection.Ascending
              }
            />
          </Col>
        </Labels>
        {data.map((row) => {
          return (
            <Row key={`${row.firstName} ${row.lastName}`}>
              <Col>
                {row.firstName} {row.lastName}
              </Col>
              <Col>{row.phoneNumber}</Col>
            </Row>
          )
        })}
      </Contacts>
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
      <EmptyState
        title={{ id: "view.name.phone.contacts.emptyList.title" }}
        description={{
          id: "view.name.phone.contacts.emptyList.emptyPhonebook.description",
        }}
      />
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
      {Object.keys(labeledRows).map((group) => (
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
      {Object.keys(labeledRows).map((group) => (
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
          {Object.keys(labeledRows).map((group) => (
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
        {Object.keys(labeledRows).map((group) => (
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
