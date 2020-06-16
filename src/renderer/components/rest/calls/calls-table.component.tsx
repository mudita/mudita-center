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

const SelectableContacts = styled(Table)<{ mouseLock?: boolean }>`
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
  calls: any[]
}

const isToday = (date: string) => moment(date).isSame(Date.now(), "days")

const CallsTable: FunctionComponent<Props> = ({ calls }) => {
  const { getRowStatus, toggleRow } = useTableSelect(basicRows)
  return (
    <SelectableContacts>
      <Labels>
        <Col />
        <Col>Name</Col>
        <Col>Duration</Col>
        <Col>Date</Col>
      </Labels>
      {calls.map(({ caller, id, date, duration }, index) => {
        const { selected, indeterminate } = getRowStatus(id)
        const onChange = () => toggleRow(id)
        return (
          <Row key={index}>
            <Col>
              <Checkbox
                checked={selected}
                indeterminate={indeterminate}
                onChange={onChange}
                size={Size.Small}
              />
            </Col>
            <Col>
              {caller.firstName.length > 0 && caller.lastName.length > 0
                ? createFullName(caller)
                : caller.phoneNumber}
            </Col>
            <Col>{formatDuration(duration)}</Col>
            <Col>
              {isToday(date)
                ? moment(date).format("h:mm")
                : moment(date).format("LL")}
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
                />
              </Actions>
            </Col>
          </Row>
        )
      })}
    </SelectableContacts>
  )
}

export default CallsTable
