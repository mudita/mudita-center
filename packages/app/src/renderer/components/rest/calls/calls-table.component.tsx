/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

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
import { Contact } from "App/contacts/store/contacts.type"

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
  isThreadOpened: (phoneNumber: string) => boolean
  isContactCreated: (phoneNumber: string) => boolean
  getContactByContactId: (contactId: string) => Contact
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
  isThreadOpened,
  isContactCreated,
  onDeleteClick,
  getContactByContactId,
}) => {
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
            onRowClick={onRowClick}
            getRowStatus={getRowStatus}
            toggleRow={toggleRow}
            callData={row}
            noneRowsSelected={noneRowsSelected}
            sidebarOpened={sidebarOpened}
            activeRow={activeRow}
            onDeleteClick={onDeleteClick}
            getContactByContactId={getContactByContactId}
          />
        ))}
      </SelectableCalls>
      {sidebarOpened && (
        <CallDetails
          calls={activeRow ? [activeRow] : []}
          onClose={onDetailsCloseClick}
          onDeleteClick={onDeleteClick}
          isThreadOpened={isThreadOpened}
          isContactCreated={isContactCreated}
          getContactByContactId={getContactByContactId}
        />
      )}
    </TableWithSidebarWrapper>
  )
}

export default CallsTable
