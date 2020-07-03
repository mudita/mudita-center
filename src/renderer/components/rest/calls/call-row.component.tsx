import moment from "moment"
import React from "react"
import ButtonComponent from "Renderer/components/core/button/button.component"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import Dropdown from "Renderer/components/core/dropdown/dropdown.component"
import Icon from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import { Size } from "Renderer/components/core/input-checkbox/input-checkbox.component"
import { Col, Row } from "Renderer/components/core/table/table.component"
import { CallsTableTestIds } from "Renderer/components/rest/calls/calls-table.enum"
import {
  Checkbox,
  ClickableCol,
} from "Renderer/components/rest/calls/calls-table.styled"
import { Details } from "Renderer/components/rest/calls/contact-details.types"
import { isNameAvailable } from "Renderer/components/rest/messages/is-name-available"
import {
  Actions,
  ActionsButton,
} from "Renderer/components/rest/messages/messages-list.component"
import { callTypeResolver } from "Renderer/components/rest/calls/contact-details.helpers"
import { createFullName } from "Renderer/models/phone/phone.utils"
import FunctionComponent from "Renderer/types/function-component.interface"
import formatDuration from "Renderer/utils/format-duration"
import { isToday } from "Renderer/utils/is-today"
import { noop } from "Renderer/utils/noop"

export interface CallRowProps {
  open: (row: Details) => void
  getRowStatus: (
    input: Details
  ) => {
    selected: boolean
    indeterminate: boolean
  }
  toggleRow: (input: Details) => void
  callData: Details
  setDetails: (input: Details) => void
  activeRow?: Details
  noneRowsSelected: boolean
  sidebarOpened: boolean
}

export const CallRow: FunctionComponent<CallRowProps> = ({
  open,
  getRowStatus,
  toggleRow,
  callData,
  setDetails,
  activeRow,
  noneRowsSelected,
  sidebarOpened,
}) => {
  const { caller, id, date, duration, timesMissed } = callData
  const { selected, indeterminate } = getRowStatus(callData)
  const toggle = () => toggleRow(callData)
  const nameAvailable = isNameAvailable(caller)
  const details = callTypeResolver(callData.status)

  const openSidebar = () => {
    open(callData)
    setDetails({ ...details, ...caller, ...callData } as Details)
  }

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
        onClick={openSidebar}
        active={activeRow?.id === id}
      >
        <Icon type={details.icon} width="auto" />
        {nameAvailable ? createFullName(caller) : caller.primaryPhoneNumber}
        {timesMissed > 1 && ` (${timesMissed})`}
      </ClickableCol>
      {!sidebarOpened && <Col>{formatDuration(duration)}</Col>}
      <Col data-testid="call-date">
        {isToday(date)
          ? moment(date).format("h:mm")
          : moment(date).format("ll")}
      </Col>
      {!sidebarOpened && (
        <>
          <Col>
            <Actions>
              <Dropdown
                toggler={
                  <ActionsButton>
                    <Icon type={Type.More} />
                  </ActionsButton>
                }
                onOpen={noop}
                onClose={noop}
              >
                <ButtonComponent
                  labelMessage={{
                    id: "component.dropdown.call",
                    values: nameAvailable
                      ? { name: caller.firstName || caller.lastName }
                      : {
                          name: caller.primaryPhoneNumber,
                        },
                  }}
                  Icon={Type.Calls}
                  onClick={noop}
                  displayStyle={DisplayStyle.Dropdown}
                  data-testid="dropdown-call"
                />
                <ButtonComponent
                  labelMessage={{
                    id: "view.name.phone.calls.sendMessage",
                  }}
                  Icon={Type.BorderCheckIcon}
                  onClick={noop}
                  displayStyle={DisplayStyle.Dropdown}
                  data-testid="send-message"
                />
                <ButtonComponent
                  labelMessage={{
                    id: "view.name.phone.calls.details",
                  }}
                  Icon={Type.Contacts}
                  onClick={noop}
                  displayStyle={DisplayStyle.Dropdown}
                  data-testid="call-details"
                />
                <ButtonComponent
                  labelMessage={{
                    id: "view.name.phone.calls.deleteCall",
                  }}
                  Icon={Type.Delete}
                  onClick={noop}
                  displayStyle={DisplayStyle.Dropdown}
                  data-testid="delete-call"
                />
              </Dropdown>
            </Actions>
          </Col>
        </>
      )}
    </Row>
  )
}
