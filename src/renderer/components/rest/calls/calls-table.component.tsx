import React, { useState } from "react"
import {
  Col,
  Labels,
  TableWithSidebarWrapper,
} from "Renderer/components/core/table/table.component"
import { CallRow } from "Renderer/components/rest/calls/call-row.component"
import { SelectableCells } from "Renderer/components/rest/calls/calls-table.styled"
import { ContactDetails } from "Renderer/components/rest/calls/contact-details.component"
import { Details } from "Renderer/components/rest/calls/contact-details.types"
import FunctionComponent from "Renderer/types/function-component.interface"
import { UseTableSelect } from "Renderer/utils/hooks/useTableSelect"

import useTableSidebar from "Renderer/utils/hooks/useTableSidebar"
import { intl } from "Renderer/utils/intl"

type SelectHook = Pick<
  UseTableSelect<Details>,
  "getRowStatus" | "toggleRow" | "noneRowsSelected"
>

interface Props extends SelectHook {
  calls: Details[]
}

const CallsTable: FunctionComponent<Props> = ({
  calls,
  getRowStatus,
  toggleRow,
  noneRowsSelected,
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
      <SelectableCells active={sidebarOpened}>
        <Labels>
          <Col />
          <Col>{intl.formatMessage({ id: "view.name.generic.name" })}</Col>
          {!sidebarOpened && (
            <Col>
              {intl.formatMessage({ id: "view.name.generic.duration" })}
            </Col>
          )}
          <Col>{intl.formatMessage({ id: "view.name.generic.date" })}</Col>
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
