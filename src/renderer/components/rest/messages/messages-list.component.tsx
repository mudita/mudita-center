import React, { Ref } from "react"
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
  lightAvatarStyles,
  TextPlaceholder,
  AvatarPlaceholder,
} from "Renderer/components/rest/phone/contact-list.component"
import { InView } from "react-intersection-observer"
import Avatar from "Renderer/components/core/avatar/avatar.component"
import { isEqual } from "lodash"

const checkboxVisibleStyles = css`
  display: block;
`

const MessageRow = styled(Row)`
  height: 9rem;
`

const Checkbox = styled(InputCheckbox)`
  position: absolute;
  left: 5.4rem;
  display: none;
`

const dotStyles = css`
  &:after {
    display: block;
    content: "";
    position: absolute;
    top: 0.2rem;
    margin-left: -1.8rem;
    height: 0.6rem;
    width: 0.6rem;
    border-radius: 50%;
    background-color: ${backgroundColor("blue")};
  }
`

const MessageCol = styled(Col)`
  height: 100%;
`

const AvatarCol = styled(Col)`
  position: relative;
`

const InitialsAvatar = styled(Avatar)`
  height: 4.8rem;
  width: 4.8rem;
  position: absolute;
  right: 2.4rem;
`

const LastMessageText = styled(Message)<{ unread?: boolean }>`
  margin-top: 0.8rem;
  padding-left: ${({ unread }) => (unread ? "1.8rem" : "0")};
  position: relative;
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
  --columnsTemplate: 11.2rem 60.5rem 1fr;
  --columnsTemplateWithOpenedSidebar: 11.2rem 1fr;
  --columnsGap: 0;
  pointer-events: ${({ mouseLock }) => (mouseLock ? "none" : "all")};

  ${({ noneRowsSelected }) =>
    !noneRowsSelected &&
    css`
      ${InitialsAvatar} {
        display: none;
      }
      ${Checkbox} {
        ${checkboxVisibleStyles};
      }
    `};

  ${Row} {
    :hover {
      ${Checkbox} {
        display: block;
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

const MessageDataWrapper = styled(DataWrapper)<{ sidebarOpened: boolean }>`
  margin-right: ${({ sidebarOpened }) => (sidebarOpened ? "4rem" : "0")};
`

export interface ActiveRow {
  caller: Caller
  messages: Msg[]
  contact: boolean
}

interface Props {
  list: Topic[]
  openSidebar?: (row: ActiveRow) => void
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
  /* TODO in new message feature task:
          1. Destructure scrollable from useTableScrolling
              and use it in <Messages />
          2. Add mouseLock prop to <Messages />
   */
  const { enableScroll, disableScroll } = useTableScrolling()
  return (
    <Messages
      noneRowsSelected={noneRowsSelected}
      hideableColumnsIndexes={[2, 3, 4]}
      hideColumns={Boolean(activeRow)}
    >
      {list.map(({ id, caller, messages, unread, contact }) => {
        const { selected, indeterminate } = getRowStatus(caller)
        const lastMessage = messages[messages.length - 1]
        const onChange = () => toggleRow(caller)
        const onClick = () => openSidebar({ caller, messages, contact })

        const interactiveRow = (ref: Ref<HTMLDivElement>) => (
          <MessageRow
            key={id}
            ref={ref}
            selected={selected}
            active={isEqual(activeRow, { caller, messages, contact })}
          >
            <AvatarCol>
              <Checkbox
                checked={selected}
                onChange={onChange}
                size={Size.Large}
                indeterminate={indeterminate}
                data-testid="checkbox"
              />
              <InitialsAvatar
                user={
                  contact
                    ? {
                        firstName: caller.firstName,
                        lastName: caller.lastName,
                      }
                    : undefined
                }
                light={selected}
              />
            </AvatarCol>
            <MessageCol onClick={onClick} data-testid="message-row">
              <MessageDataWrapper sidebarOpened={Boolean(activeRow)}>
                <Name displayStyle={TextDisplayStyle.LargeBoldText}>
                  {caller.firstName} {caller.lastName}
                </Name>
                <Time displayStyle={TextDisplayStyle.SmallFadedText}>
                  {moment(lastMessage.date).format("h:mm A")}
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
              </MessageDataWrapper>
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
                  {contact ? (
                    <ButtonComponent
                      labelMessage={{
                        id: "view.name.messages.dropdownContactDetails",
                      }}
                      Icon={Type.Contacts}
                      onClick={noop}
                      displayStyle={DisplayStyle.Dropdown}
                      data-testid="dropdown-contact-details"
                    />
                  ) : (
                    <ButtonComponent
                      labelMessage={{
                        id: "view.name.messages.dropdownAddToContacts",
                      }}
                      Icon={Type.Contacts}
                      onClick={noop}
                      displayStyle={DisplayStyle.Dropdown}
                      data-testid="dropdown-add-to-contacts"
                    />
                  )}
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

        const placeholderRow = (ref: Ref<HTMLDivElement>) => (
          <MessageRow key={id} ref={ref}>
            <Col />
            <Col>
              <AvatarPlaceholder />
              <TextPlaceholder charsCount={caller.firstName.length} />
            </Col>
          </MessageRow>
        )

        return (
          <InView key={id}>
            {({ inView, ref }) =>
              inView ? interactiveRow(ref) : placeholderRow(ref)
            }
          </InView>
        )
      })}
    </Messages>
  )
}

export default MessagesList
