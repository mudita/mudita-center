import moment from "moment"
import React, { useState } from "react"
import {
  Col,
  Labels,
  TableWithSidebarWrapper,
} from "Renderer/components/core/table/table.component"
import { basicRows } from "Renderer/components/core/table/table.fake-data"
import { CallRow } from "Renderer/components/rest/calls/call-row"
import { SelectableCells } from "Renderer/components/rest/calls/calls-table.styled"
import {
  ContactDetails,
  Details,
} from "Renderer/components/rest/calls/contact-details.component"
import FunctionComponent from "Renderer/types/function-component.interface"
import useTableSelect from "Renderer/utils/hooks/useTableSelect"

import useTableSidebar from "Renderer/utils/hooks/useTableSidebar"

interface Props {
  calls: Details[]
}

export const isToday = (date: Date) => moment(date).isSame(Date.now(), "days")

const CallsTable: FunctionComponent<Props> = ({ calls }) => {
  const { getRowStatus, toggleRow, noneRowsSelected } = useTableSelect(
    basicRows
  )
  const [callDetails, setCallDetails] = useState<Details>()

  const {
    openSidebar,
    closeSidebar,
    sidebarOpened,
    activeRow,
  } = useTableSidebar<Details>()

  return (
    <TableWithSidebarWrapper>
      <SelectableCells active={sidebarOpened}>
        <Labels>
          <Col />
          <Col>Name</Col>
          <Col>Duration</Col>
          <Col>Date</Col>
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
          />
        ))}
      </SelectableCells>
      {sidebarOpened && (
        <ContactDetails
          calls={[callDetails] as Details[]}
          onClose={closeSidebar}
        />
      )}
    </TableWithSidebarWrapper>
  )
}

export default CallsTable
