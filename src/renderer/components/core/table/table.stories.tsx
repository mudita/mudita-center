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
import useTableSidebar from "Renderer/utils/hooks/use-table-sidebar"
import { noop } from "Renderer/utils/noop"
import styled, { css } from "styled-components"
import Story from "Renderer/components/storybook/story.component"
import StoryContainer from "Renderer/components/storybook/story-container.component"

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

const CustomSidebarTitle = styled(Text)`
  margin: 0 !important;
`

const partsStoryStyles = css`
  min-height: 5rem;
  > * {
    min-width: 40rem;
  }
`

const partsStoryContainerStyles = css`
  main {
    ${partsStoryStyles};
  }
`

const sidebarStoryStyles = css`
  > * {
    margin-right: 0 !important;
  }
`

const fullPageStoryStyles = css`
  height: 90vh;
  width: auto;
  align-items: initial;
  justify-content: initial;
`

storiesOf("Components|Core/Table/Parts", module)
  .add("Labels", () => (
    <>
      <Story title="Column labels" customStyle={partsStoryStyles}>
        <Files>
          <Labels>
            <Col>File type</Col>
            <Col>Last backup</Col>
            <Col>Size</Col>
          </Labels>
        </Files>
      </Story>
      <Story title="Group label" customStyle={partsStoryStyles}>
        <Files>
          <Group>
            <Labels>
              <Col>Favourites</Col>
            </Labels>
          </Group>
        </Files>
      </Story>
    </>
  ))
  .add("Rows", () => (
    <>
      <StoryContainer
        title="Sizes"
        column
        customStyle={partsStoryContainerStyles}
      >
        <Story title="Big">
          <Files>
            <Row size={RowSize.Big}>
              <Col>Music</Col>
              <Col>{new Date().toLocaleString()}</Col>
              <Col>50 MB</Col>
            </Row>
          </Files>
        </Story>
        <Story title="Medium (default)">
          <Files>
            <Row size={RowSize.Medium}>
              <Col>Music</Col>
              <Col>{new Date().toLocaleString()}</Col>
              <Col>50 MB</Col>
            </Row>
          </Files>
        </Story>
        <Story title="Small">
          <Files>
            <Row size={RowSize.Small}>
              <Col>Music</Col>
              <Col>{new Date().toLocaleString()}</Col>
              <Col>50 MB</Col>
            </Row>
          </Files>
        </Story>
        <Story title="Tiny">
          <Files>
            <Row size={RowSize.Tiny}>
              <Col>Music</Col>
              <Col>{new Date().toLocaleString()}</Col>
              <Col>50 MB</Col>
            </Row>
          </Files>
        </Story>
      </StoryContainer>
      <StoryContainer
        title="Types"
        column
        customStyle={partsStoryContainerStyles}
      >
        <Story title="Nested (big and default)">
          <Files>
            <Row size={RowSize.Big}>
              <Col>Music</Col>
              <Col>{new Date().toLocaleString()}</Col>
              <Col>50 MB</Col>
            </Row>
            <NestedGroup>
              <Row>
                <Col>Ringtones</Col>
                <Col>{new Date().toLocaleString()}</Col>
                <Col>10 MB</Col>
              </Row>
              <Row>
                <Col>Songs</Col>
                <Col>{new Date().toLocaleString()}</Col>
                <Col>40 MB</Col>
              </Row>
            </NestedGroup>
          </Files>
        </Story>
        <Story title="Nested (default and small)">
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
        </Story>
      </StoryContainer>
      <StoryContainer
        title="States"
        column
        customStyle={partsStoryContainerStyles}
      >
        <Story title="Default">
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
        </Story>
        <Story title="Hovered">
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
        </Story>
        <Story title="Active">
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
        </Story>
        <Story title="Selected">
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
        </Story>
      </StoryContainer>
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
        <Story title="Default" customStyle={sidebarStoryStyles} transparentMode>
          <Sidebar onClose={action("Close sidebar")}>
            <p>Some content</p>
            <p>Some content</p>
            <p>Some content</p>
          </Sidebar>
        </Story>
        <Story
          title="With title"
          customStyle={sidebarStoryStyles}
          transparentMode
        >
          <Sidebar
            onClose={action("Close sidebar")}
            headerLeft={<HeaderLeft />}
          >
            <p>Some content</p>
            <p>Some content</p>
            <p>Some content</p>
          </Sidebar>
        </Story>
        <Story
          title="With icons"
          customStyle={sidebarStoryStyles}
          transparentMode
        >
          <Sidebar
            onClose={action("Close sidebar")}
            headerRight={<HeaderRight />}
          >
            <p>Some content</p>
            <p>Some content</p>
            <p>Some content</p>
          </Sidebar>
        </Story>
        <Story
          title="With title and icons"
          customStyle={sidebarStoryStyles}
          transparentMode
        >
          <Sidebar
            onClose={action("Close sidebar")}
            headerLeft={<HeaderLeft />}
            headerRight={<HeaderRight />}
          >
            <p>Some content</p>
            <p>Some content</p>
            <p>Some content</p>
          </Sidebar>
        </Story>
      </>
    )
  })

storiesOf("Components|Core/Table/Empty states", module)
  .add("Loading", () => (
    <Story customStyle={fullPageStoryStyles} transparentMode>
      <LoadingState />
    </Story>
  ))
  .add("Empty", () => (
    <Story customStyle={fullPageStoryStyles} transparentMode>
      <EmptyState
        title={{ id: "view.name.phone.contacts.emptyList.title" }}
        description={{
          id: "view.name.phone.contacts.emptyList.emptyPhonebook.description",
        }}
      />
    </Story>
  ))

storiesOf("Components|Core/Table/Basic", module)
  .add("Default", () => (
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
  ))
  .add("Without labels", () => (
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
  ))
  .add("With columns hidden", () => (
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
  })
  .add("With selectable rows", () => {
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
      <Story customStyle={fullPageStoryStyles} transparentMode>
        <Contacts>
          <Labels>
            <Col onClick={sortByName}>
              Name{" "}
              <TableSortButton
                sortDirection={
                  sortDirection.firstName || SortDirection.Ascending
                }
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
      </Story>
    )
  })

storiesOf("Components|Core/Table/Nested", module)
  .add("Default", () => {
    const SingleRow = ({ data, ...rest }: any) => (
      <Row {...rest}>
        <Col>{data.fileType}</Col>
        <Col>{new Date(data.lastBackup).toLocaleString()}</Col>
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
  })

storiesOf("Components|Core/Table/Grouped", module)
  .add("Default", () => (
    <Story customStyle={fullPageStoryStyles} transparentMode>
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
    </Story>
  ))
  .add("With hidden columns", () => (
    <Story customStyle={fullPageStoryStyles} transparentMode>
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
    </Story>
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
      <Story customStyle={fullPageStoryStyles} transparentMode>
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
      </Story>
    )
  })
  .add("With selectable rows", () => {
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
      </Story>
    )
  })
