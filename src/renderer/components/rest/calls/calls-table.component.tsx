import React, { useState } from "react"
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
import useTableSidebar from "Renderer/utils/hooks/use-table-sidebar"
import { intl } from "Renderer/utils/intl"
import { defineMessages } from "react-intl"
import { CallerSearchParams } from "Renderer/models/messages/utils/caller-utils.ts"

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
  calls: Details[]
  deleteCall?: (ids: Details) => void
  isTopicThreadOpening: (params: CallerSearchParams) => boolean
}

const CallsTable: FunctionComponent<Props> = ({
  calls,
  getRowStatus,
  toggleRow,
  noneRowsSelected,
  deleteCall,
  isTopicThreadOpening,
}) => {
  const {
    openSidebar,
    closeSidebar,
    sidebarOpened,
    activeRow,
  } = useTableSidebar<Details>()

  const [callDetails, setCallDetails] = useState<Details>()

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
        {calls.map((row, i) => (
          <CallRow
            key={i}
            open={openSidebar}
            getRowStatus={getRowStatus}
            toggleRow={toggleRow}
            callData={row}
            setDetails={setCallDetails}
            noneRowsSelected={noneRowsSelected}
            sidebarOpened={Boolean(sidebarOpened)}
            activeRow={activeRow}
            deleteCall={deleteCall}
          />
        ))}
      </SelectableCalls>
      {sidebarOpened && (
        <CallDetails
          calls={[callDetails] as Details[]}
          onClose={closeSidebar}
          isTopicThreadOpening={isTopicThreadOpening}
        />
      )}
    </TableWithSidebarWrapper>
  )
}

export default CallsTable
