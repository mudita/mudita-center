/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import moment from "moment"
import React from "react"
import ButtonComponent from "Renderer/components/core/button/button.component"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import Dropdown from "Renderer/components/core/dropdown/dropdown.component"
import Icon from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import { Size } from "Renderer/components/core/input-checkbox/input-checkbox.component"
import {
  Actions,
  ActionsButton,
  Col,
  Row,
} from "Renderer/components/core/table/table.component"
import { CallsTableTestIds } from "Renderer/components/rest/calls/calls-table.enum"
import {
  Checkbox,
  ClickableCol,
  StatusCallIcon,
} from "Renderer/components/rest/calls/calls-table.styled"
import { Details } from "Renderer/components/rest/calls/call-details.types"
import getPrettyCaller from "Renderer/models/calls/get-pretty-caller"
import { resolveCallType } from "Renderer/components/rest/calls/call-details.helpers"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import formatDuration from "Renderer/utils/format-duration"
import { isToday } from "Renderer/utils/is-today"
import { noop } from "Renderer/utils/noop"
import { Contact } from "App/contacts/reducers/contacts.interface"

export interface CallRowProps {
  onRowClick: (detail: Details) => void
  getRowStatus: (input: Details) => {
    selected: boolean
    indeterminate: boolean
  }
  toggleRow: (input: Details) => void
  callData: Details
  activeRow?: Details
  noneRowsSelected: boolean
  sidebarOpened: boolean
  onDeleteClick: (id: string) => void
  getContact: (contactId: string) => Contact | undefined
}

export const CallRow: FunctionComponent<CallRowProps> = ({
  onRowClick,
  getRowStatus,
  toggleRow,
  callData,
  activeRow,
  noneRowsSelected,
  onDeleteClick,
  getContact,
}) => {
  const { caller, id, date, duration, timesMissed } = callData
  const { selected, indeterminate } = getRowStatus(callData)
  const toggle = () => toggleRow(callData)
  const details = resolveCallType(callData.status)
  const contact = getContact(caller.id)

  const callDetails = { ...details, ...caller, ...callData }

  const emitClickRow = () => onRowClick(callData)

  const emitDeleteClick = () => onDeleteClick(callDetails.id)

  return (
    <Row
      key={id}
      data-testid={CallsTableTestIds.CallsRow}
      active={activeRow?.id === id}
    >
      <Col>
        <Checkbox
          checked={selected}
          indeterminate={indeterminate}
          onChange={toggle}
          size={Size.Small}
          visible={!noneRowsSelected}
        />
      </Col>
      <ClickableCol
        data-testid={CallsTableTestIds.CallerName}
        onClick={emitClickRow}
        active={activeRow?.id === id}
      >
        <StatusCallIcon type={details.icon} height={2.8} width={2.8} />
        {getPrettyCaller(contact, caller.phoneNumber)}
        {timesMissed > 1 && ` (${timesMissed})`}
      </ClickableCol>
      <Col>{formatDuration(duration)}</Col>
      <Col data-testid="call-date">
        {isToday(date)
          ? moment(date).format("h:mm")
          : moment(date).format("ll")}
      </Col>
      <Col>
        <Actions>
          <Dropdown onOpen={noop} onClose={noop}>
            <ButtonComponent
              labelMessage={{
                id: "component.dropdownCall",
                values: { name: getPrettyCaller(contact, caller.phoneNumber) },
              }}
              Icon={Type.Calls}
              onClick={noop}
              displayStyle={DisplayStyle.Dropdown}
              data-testid="dropdown-call"
            />
            <ButtonComponent
              labelMessage={{
                id: "module.phone.callsSendMessage",
              }}
              Icon={Type.BorderCheckIcon}
              onClick={noop}
              displayStyle={DisplayStyle.Dropdown}
              data-testid="send-message"
            />
            <ButtonComponent
              labelMessage={{
                id: "module.phone.callsDetails",
              }}
              Icon={Type.Contact}
              onClick={emitClickRow}
              displayStyle={DisplayStyle.Dropdown}
              data-testid="call-details"
            />
            <ButtonComponent
              labelMessage={{
                id: "module.phone.callsDeleteCall",
              }}
              Icon={Type.Delete}
              onClick={emitDeleteClick}
              displayStyle={DisplayStyle.Dropdown}
              data-testid="delete-call"
            />
          </Dropdown>
        </Actions>
      </Col>
    </Row>
  )
}
