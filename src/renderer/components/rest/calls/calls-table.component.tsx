import React from "react"
import {
  Col,
  Labels,
  TableWithSidebarWrapper,
} from "Renderer/components/core/table/table.component"
import { CallRow } from "Renderer/components/rest/calls/call-row.component"
import { SelectableCalls } from "Renderer/components/rest/calls/calls-table.styled"
import { CallDetails } from "Renderer/components/rest/calls/call-details.component"
import { Details } from "Renderer/components/rest/calls/call-details.types"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { UseTableSelect } from "Renderer/utils/hooks/useTableSelect"
import { intl } from "Renderer/utils/intl"
import { defineMessages } from "react-intl"
import { AutoSizer, List } from "react-virtualized"

const messages = defineMessages({
  name: { id: "view.name.phone.calls.name" },
  duration: { id: "view.name.phone.calls.duration" },
  date: { id: "view.name.phone.calls.date" },
})

type SelectHook = Pick<
  UseTableSelect<Details>,
  "getRowStatus" | "toggleRow" | "noneRowsSelected"
>

interface Props extends SelectHook {
  onRowClick: (detail: Details) => void
  sidebarOpened: boolean
  activeRow?: Details
  onDetailsCloseClick: () => void
  calls: Details[]
  onDeleteClick: (id: string) => void
  isTopicThreadOpened: (phoneNumber: string) => boolean
  isContactCreated: (phoneNumber: string) => boolean
}

const CallsTable: FunctionComponent<Props> = ({
  onRowClick,
  sidebarOpened,
  activeRow,
  onDetailsCloseClick,
  calls,
  getRowStatus,
  toggleRow,
  noneRowsSelected,
  isTopicThreadOpened,
  isContactCreated,
  onDeleteClick,
}) => {
  const renderRow = ({ index, style }: any) => (
    <CallRow
      key={index}
      onRowClick={onRowClick}
      getRowStatus={getRowStatus}
      toggleRow={toggleRow}
      callData={calls[index]}
      noneRowsSelected={noneRowsSelected}
      sidebarOpened={sidebarOpened}
      activeRow={activeRow}
      onDeleteClick={onDeleteClick}
      style={style}
    />
  )
  return (
    <TableWithSidebarWrapper>
      <SelectableCalls
        active={sidebarOpened}
        hideColumns={sidebarOpened}
        hideableColumnsIndexes={[3, 4]}
      >
        <Labels>
          <Col />
          <Col>{intl.formatMessage(messages.name)}</Col>
          <Col>{intl.formatMessage(messages.duration)}</Col>
          <Col>{intl.formatMessage(messages.date)}</Col>
        </Labels>
        <AutoSizer disableHeight>
          {({ width }) => (
            <List
              height={595}
              width={width}
              overscanRowCount={10}
              rowRenderer={renderRow}
              rowCount={calls.length}
              rowHeight={64}
            />
          )}
        </AutoSizer>
      </SelectableCalls>
      {sidebarOpened && (
        <CallDetails
          calls={activeRow ? [activeRow] : []}
          onClose={onDetailsCloseClick}
          onDeleteClick={onDeleteClick}
          isTopicThreadOpened={isTopicThreadOpened}
          isContactCreated={isContactCreated}
        />
      )}
    </TableWithSidebarWrapper>
  )
}

export default CallsTable
