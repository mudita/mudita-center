import React, { Ref } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import styled, { css } from "styled-components"
import Table, {
  Col,
  Row,
  TextPlaceholder,
} from "Renderer/components/core/table/table.component"
import { UseTableSelect } from "Renderer/utils/hooks/useTableSelect"
import {
  animatedOpacityActiveStyles,
  animatedOpacityStyles,
  VisibleCheckbox,
} from "Renderer/components/rest/visible-checkbox/visible-checkbox"
import { Size } from "Renderer/components/core/input-checkbox/input-checkbox.component"
import { backgroundColor } from "Renderer/styles/theming/theme-getters"
import { TextDisplayStyle } from "Renderer/components/core/text/text.component"
import Icon from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import Dropdown from "Renderer/components/core/dropdown/dropdown.component"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import ButtonComponent from "Renderer/components/core/button/button.component"
import useTableScrolling from "Renderer/utils/hooks/use-table-scrolling"
import {
  Author,
  Message as Msg,
  Topic,
} from "Renderer/models/messages/messages.interface"
import { noop } from "Renderer/utils/noop"
import {
  DataWrapper,
  Message,
  Name,
  Time,
} from "Renderer/components/rest/messages/topics-table.component"
import moment from "moment"
import {
  AvatarPlaceholder,
  lightAvatarStyles,
} from "Renderer/components/rest/phone/contact-list.component"
import { InView } from "react-intersection-observer"
import Avatar, {
  AvatarSize,
} from "Renderer/components/core/avatar/avatar.component"
import { last } from "lodash"
import { isNameAvailable } from "Renderer/components/rest/messages/is-name-available"
import { createFullName } from "Renderer/models/phone/phone.helpers"
import { MessagesListTestIds } from "Renderer/modules/messages/messages-list-test-ids.enum"
import MessageRowContainer from "Renderer/components/rest/messages/message-row-container.component"

const MessageRow = styled(Row)`
  height: 9rem;
`

const Checkbox = styled(VisibleCheckbox)`
  position: absolute;
  left: 5.4rem;
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
    background-color: ${backgroundColor("activity")};
  }
`

const MessageCol = styled(Col)`
  height: 100%;
`

const AvatarCol = styled(Col)`
  position: relative;
`

const InitialsAvatar = styled(Avatar)<{ light?: boolean }>`
  height: 4.8rem;
  width: 4.8rem;
  position: absolute;
  right: 2.4rem;
  ${animatedOpacityStyles};
  ${animatedOpacityActiveStyles};
  ${({ light }) => light && lightAvatarStyles};
`

const LastMessageText = styled(Message)<{ unread?: boolean }>`
  margin-top: 0.8rem;
  padding-left: ${({ unread }) => (unread ? "1.8rem" : "0")};
  position: relative;
  ${({ unread }) => unread && dotStyles};
`

export const ActionsButton = styled.span`
  cursor: pointer;
`

export const Actions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  flex: 1;
  padding-right: 3rem;
  box-sizing: border-box;
`

const Messages = styled(Table)<{
  noneRowsSelected?: boolean
}>`
  --columnsTemplate: 11.2rem 60.5rem 1fr;
  --columnsTemplateWithOpenedSidebar: 11.2rem 1fr;
  --columnsGap: 0;

  ${({ noneRowsSelected }) =>
    !noneRowsSelected &&
    css`
      ${InitialsAvatar} {
        ${animatedOpacityStyles};
      }
      ${Checkbox} {
        ${animatedOpacityActiveStyles};
      }
    `};

  ${Row} {
    :hover {
      ${Checkbox} {
        ${animatedOpacityActiveStyles};
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

type SelectHook = Pick<
  UseTableSelect<Topic>,
  "getRowStatus" | "toggleRow" | "noneRowsSelected"
>

export interface ActiveRow {
  caller: Author
  messages: Msg[]
}

interface Props extends SelectHook {
  list: Topic[]
  openSidebar?: (row: Topic) => void
  activeRow?: Topic
  onRemove: (ids: string[]) => void
  onToggleReadStatus: (ids: string[]) => void
}

const MessagesList: FunctionComponent<Props> = ({
  activeRow,
  list,
  openSidebar = noop,
  onRemove,
  onToggleReadStatus,
  getRowStatus,
  toggleRow,
  noneRowsSelected,
}) => {
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
      {list.map((item) => {
        const { messages, caller, unread, id } = item
        const { selected, indeterminate } = getRowStatus(item)
        const lastMessage = last(messages)
        const toggle = () => toggleRow(item)
        const open = () => openSidebar(item)
        const nameAvailable = isNameAvailable(caller)
        const active = activeRow?.id === item.id
        const remove = () => onRemove([id])
        const toggleReadStatus = () => onToggleReadStatus([id])
        const interactiveRow = (ref: Ref<HTMLDivElement>) => (
          <MessageRow key={id} ref={ref} selected={selected} active={active}>
            <AvatarCol>
              <Checkbox
                checked={selected}
                onChange={toggle}
                size={Size.Large}
                indeterminate={indeterminate}
                visible={!noneRowsSelected}
                data-testid="checkbox"
              />
              <InitialsAvatar
                user={caller}
                light={active}
                size={AvatarSize.Big}
              />
            </AvatarCol>
            <MessageCol onClick={open} data-testid={MessagesListTestIds.Row}>
              <MessageDataWrapper sidebarOpened={Boolean(activeRow)}>
                <Name displayStyle={TextDisplayStyle.LargeBoldText}>
                  {nameAvailable
                    ? createFullName(caller)
                    : caller.primaryPhoneNumber}
                </Name>
                <Time displayStyle={TextDisplayStyle.SmallFadedText}>
                  {moment(lastMessage?.date).format("h:mm A")}
                </Time>
                <LastMessageText
                  unread={unread}
                  displayStyle={
                    unread
                      ? TextDisplayStyle.MediumText
                      : TextDisplayStyle.MediumFadedLightText
                  }
                >
                  {lastMessage?.content}
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
                      id: "component.dropdown.call",
                      values: {
                        name: caller.firstName || caller.primaryPhoneNumber,
                      },
                    }}
                    Icon={Type.Calls}
                    onClick={noop}
                    displayStyle={DisplayStyle.Dropdown}
                    data-testid="dropdown-call"
                  />
                  {nameAvailable ? (
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
                      id: unread
                        ? "view.name.messages.markAsRead"
                        : "view.name.messages.markAsUnread",
                    }}
                    Icon={Type.BorderCheckIcon}
                    onClick={toggleReadStatus}
                    displayStyle={DisplayStyle.Dropdown}
                    data-testid="dropdown-mark-as-read"
                  />
                  <ButtonComponent
                    labelMessage={{
                      id: "view.name.messages.dropdownDelete",
                    }}
                    Icon={Type.Delete}
                    onClick={remove}
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
              <TextPlaceholder charsCount={caller.firstName?.length || 0} />
            </Col>
          </MessageRow>
        )

        return (
          <MessageRowContainer key={id} active={active}>
            <InView>
              {({ inView, ref }) =>
                inView ? interactiveRow(ref) : placeholderRow(ref)
              }
            </InView>
          </MessageRowContainer>
        )
      })}
    </Messages>
  )
}

export default MessagesList
