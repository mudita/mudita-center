/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import {
  Col,
  Labels,
  TableWithSidebarWrapper,
} from "App/__deprecated__/renderer/components/core/table/table.component"
import { CallRow } from "App/__deprecated__/renderer/components/rest/calls/call-row.component"
import { SelectableCalls } from "App/__deprecated__/renderer/components/rest/calls/calls-table.styled"
import { CallDetails } from "App/__deprecated__/renderer/components/rest/calls/call-details.component"
import { Details } from "App/__deprecated__/renderer/components/rest/calls/call-details.types"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { UseTableSelect } from "App/__deprecated__/renderer/utils/hooks/useTableSelect"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import { defineMessages } from "react-intl"
import { Contact } from "App/contacts/reducers/contacts.interface"

const messages = defineMessages({
  name: { id: "module.phone.callsName" },
  duration: { id: "module.phone.callsDuration" },
  date: { id: "module.phone.callsDate" },
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
  getContact: (contactId: string) => Contact | undefined
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
  getContact,
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
            getContact={getContact}
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
          getContact={getContact}
        />
      )}
    </TableWithSidebarWrapper>
  )
}

export default CallsTable
