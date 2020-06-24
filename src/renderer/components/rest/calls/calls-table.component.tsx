import React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import Table, {
  Col,
  Labels,
  Row,
} from "Renderer/components/core/table/table.component"
import { basicRows } from "Renderer/components/core/table/table.fake-data"
import useTableSelect from "Renderer/utils/hooks/useTableSelect"
import styled, { css } from "styled-components"
import InputCheckbox, {
  Size,
} from "Renderer/components/core/input-checkbox/input-checkbox.component"
import {
  transitionTime,
  transitionTimingFunction,
} from "Renderer/styles/theming/theme-getters"
import Dropdown from "Renderer/components/core/dropdown/dropdown.component"
import Icon from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import { noop } from "Renderer/utils/noop"
import {
  Actions,
  ActionsButton,
} from "Renderer/components/rest/messages/messages-list.component"
import moment from "moment"
import { createFullName } from "Renderer/models/phone/phone.utils"
import formatDuration from "Renderer/utils/format-duration"
import { Call } from "Renderer/models/calls/calls.interface"
import { isNameAvailable } from "Renderer/components/rest/messages/is-name-available"
import ButtonComponent from "Renderer/components/core/button/button.component"
import { DisplayStyle } from "Renderer/components/core/button/button.config"

const visibleCheckboxStyles = css`
  opacity: 1;
  visibility: visible;
`

const Checkbox = styled(InputCheckbox)<{ visible?: boolean }>`
  opacity: 0;
  visibility: hidden;
  transition: opacity ${transitionTime("faster")}
      ${transitionTimingFunction("smooth")},
    visibility ${transitionTime("faster")} ${transitionTimingFunction("smooth")};
  margin: 0 auto;

  ${({ visible }) => visible && visibleCheckboxStyles};
`

const SelectableCalls = styled(Table)<{ mouseLock?: boolean }>`
  flex: 1;
  overflow: auto;
  --columnsTemplate: 4rem 53.8rem 19.5rem 11.5rem auto;
  --columnsTemplateWithOpenedSidebar: 4rem 1fr;
  --columnsGap: 0;
  pointer-events: ${({ mouseLock }) => (mouseLock ? "none" : "all")};

  ${Row} {
    :hover {
      ${Checkbox} {
        ${visibleCheckboxStyles};
      }
    }
  }
`

interface Props {
  calls: Call[]
}

const isToday = (date: Date) => moment(date).isSame(Date.now(), "days")

const CallsTable: FunctionComponent<Props> = ({ calls }) => {
  const { getRowStatus, toggleRow, noneRowsSelected } = useTableSelect(
    basicRows
  )
  return (
    <SelectableCalls>
      <Labels>
        <Col />
        <Col>Name</Col>
        <Col>Duration</Col>
        <Col>Date</Col>
      </Labels>
      {calls.map(({ caller, id, date, duration, timesMissed }, index) => {
        const { selected, indeterminate } = getRowStatus(id)
        const toggle = () => toggleRow(id)
        const nameAvailable = isNameAvailable(caller)
        return (
          <Row key={id} data-testid="calls-row">
            <Col>
              <Checkbox
                checked={selected}
                indeterminate={indeterminate}
                onChange={toggle}
                size={Size.Small}
                visible={!noneRowsSelected}
              />
            </Col>
            <Col data-testid="caller-name">
              {nameAvailable
                ? createFullName(caller)
                : caller.primaryPhoneNumber}
              {timesMissed > 1 && ` (${timesMissed})`}
            </Col>
            <Col>{formatDuration(duration)}</Col>
            <Col data-testid="call-date">
              {isToday(date)
                ? moment(date).format("h:mm")
                : moment(date).format("ll")}
            </Col>
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
                      values: caller.firstName
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
          </Row>
        )
      })}
    </SelectableCalls>
  )
}

export default CallsTable
