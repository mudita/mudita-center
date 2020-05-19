import React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled, { css } from "styled-components"
import Table, { Col, Row } from "Renderer/components/core/table/table.component"
import useTableSelect from "Renderer/utils/hooks/useTableSelect"
import InputCheckbox, {
  Size,
} from "Renderer/components/core/input-checkbox/input-checkbox.component"
import { backgroundColor } from "Renderer/styles/theming/theme-getters"
import { TextDisplayStyle } from "Renderer/components/core/text/text.component"
import Icon from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import Dropdown from "Renderer/components/core/dropdown/dropdown.component"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import ButtonComponent from "Renderer/components/core/button/button.component"
import useTableScrolling from "Renderer/utils/hooks/use-table-scrolling"
import {
  Caller,
  Topic,
  Message as Msg,
} from "Renderer/models/messages/messages.interface"
import { noop } from "Renderer/utils/noop"
import { rowsMessages } from "Renderer/components/core/table/table.fake-data"
import {
  DataWrapper,
  Message,
  Name,
  Time,
} from "Renderer/components/rest/messages/topics-table.component"
import moment from "moment"
import {
  visibleCheckboxStyles,
  InitialsAvatar,
  lightAvatarStyles,
} from "Renderer/components/rest/phone/contact-list.component"

const checkboxHoverAndCheckedStyles = css`
  position: absolute;
  right: 0;
  margin-right: 1.8rem;
`

const MessageRow = styled(Row)`
  height: 9rem;
`

const Checkbox = styled(InputCheckbox)<{ visible?: boolean }>`
  opacity: 0;
  visibility: hidden;
  margin: 0 auto;

  ${({ visible }) => visible && visibleCheckboxStyles};
`

const dotStyles = css`
  &:after {
    display: block;
    content: "";
    position: absolute;
    top: 0.2rem;
    left: -1.8rem;
    height: 0.6rem;
    width: 0.6rem;
    border-radius: 50%;
    background-color: ${backgroundColor("blue")};
  }
`

const MessageCol = styled(Col)`
  flex-direction: column;
  align-items: flex-start;
`

const AvatarCol = styled(Col)`
  position: relative;
`

const LastMessageText = styled(Message)<{ unread?: boolean }>`
  margin-top: 0.8rem;
  margin-left: ${({ unread }) => (unread ? "1.8rem" : "0")};
  position: relative;
  overflow: initial;

  ${({ unread }) => unread && dotStyles};
`

const ActionsButton = styled.span`
  cursor: pointer;
`

const Actions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  flex: 1;
  padding-right: 3rem;
  box-sizing: border-box;
`

const Messages = styled(Table)<{
  mouseLock?: boolean
  noneRowsSelected?: boolean
}>`
  flex: 1;
  overflow: auto;
  --columnsTemplate: 8rem 1fr;
  --columnsTemplateWithOpenedSidebar: 6rem 1fr;
  --columnsGap: 0;
  pointer-events: ${({ mouseLock }) => (mouseLock ? "none" : "all")};

  ${({ noneRowsSelected }) =>
    !noneRowsSelected &&
    css`
      ${InitialsAvatar} {
        display: none;
      }
      ${Checkbox} {
        ${visibleCheckboxStyles};
        ${checkboxHoverAndCheckedStyles};
      }
    `};

  ${Row} {
    :hover {
      ${Checkbox} {
        ${visibleCheckboxStyles};
        ${checkboxHoverAndCheckedStyles};
      }
      ${InitialsAvatar} {
        ${lightAvatarStyles};
      }
      ${InitialsAvatar} {
        display: none;
      }
    }
  }
`

export interface ActiveRow {
  caller: Caller
  messages: Msg[]
}

interface Props {
  list: Topic[]
  openSidebar?: (row: any) => void
  activeRow?: ActiveRow
}

const MessagesList: FunctionComponent<Props> = ({
  activeRow,
  list,
  openSidebar = noop,
}) => {
  const { getRowStatus, toggleRow, noneRowsSelected } = useTableSelect(
    rowsMessages
  )
  const { enableScroll, disableScroll } = useTableScrolling()
  return (
    <Messages
      noneRowsSelected={noneRowsSelected}
      hideableColumnsIndexes={[2, 3, 4]}
      hideColumns={Boolean(activeRow)}
    >
      {list.map(({ caller, messages, unread }, index) => {
        const { selected, indeterminate } = getRowStatus(caller)
        const lastMessage = messages[messages.length - 1]
        const onChange = () => toggleRow(caller)
        const onClick = () => openSidebar({ caller, messages })
        return (
          <MessageRow
            key={index}
            onClick={onClick}
            active={activeRow === { caller, messages }}
          >
            <AvatarCol>
              <Checkbox
                checked={selected}
                onChange={onChange}
                size={Size.Large}
                indeterminate={indeterminate}
                visible={!noneRowsSelected}
                data-testid="checkbox"
              />
              <InitialsAvatar
                user={{
                  firstName: caller.firstName,
                  lastName: caller.lastName,
                }}
                light={selected}
              />
            </AvatarCol>
            <MessageCol>
              <DataWrapper>
                <Name displayStyle={TextDisplayStyle.LargeBoldText}>
                  {caller.firstName} {caller.lastName}
                </Name>
                <Time displayStyle={TextDisplayStyle.SmallFadedText}>
                  {moment(lastMessage.date).format("h:mm:ss A, MMM Do YYYY")}
                </Time>
                <LastMessageText
                  unread={unread}
                  displayStyle={
                    unread
                      ? TextDisplayStyle.MediumText
                      : TextDisplayStyle.MediumFadedLightText
                  }
                >
                  {lastMessage.content}
                </LastMessageText>
              </DataWrapper>
            </MessageCol>
            <Col>
              <Actions>
                <Dropdown
                  toggler={
                    <ActionsButton>
                      <Icon type={Type.More} />
                    </ActionsButton>
                  }
                  onOpen={disableScroll}
                  onClose={enableScroll}
                >
                  <ButtonComponent
                    labelMessage={{
                      id: "view.name.messages.dropdownCall",
                      values: { name: caller.firstName },
                    }}
                    Icon={Type.Calls}
                    onClick={noop}
                    displayStyle={DisplayStyle.Dropdown}
                    data-testid="dropdown-call"
                  />
                  <ButtonComponent
                    labelMessage={{
                      id: "view.name.messages.dropdownContactDetails",
                    }}
                    Icon={Type.Contacts}
                    onClick={noop}
                    displayStyle={DisplayStyle.Dropdown}
                    data-testid="dropdown-contact-details"
                  />
                  <ButtonComponent
                    labelMessage={{
                      id: "view.name.messages.dropdownMarkAsRead",
                    }}
                    Icon={Type.BorderCheckIcon}
                    onClick={noop}
                    displayStyle={DisplayStyle.Dropdown}
                    data-testid="dropdown-mark-as-read"
                  />
                  <ButtonComponent
                    labelMessage={{
                      id: "view.name.messages.dropdownDelete",
                    }}
                    Icon={Type.Delete}
                    onClick={noop}
                    displayStyle={DisplayStyle.Dropdown}
                    data-testid="dropdown-delete"
                  />
                </Dropdown>
              </Actions>
            </Col>
          </MessageRow>
        )
      })}
    </Messages>
  )
}

export default MessagesList
