/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { Ref } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import styled, { css } from "styled-components"
import Table, {
  Actions,
  ActionsButton,
  Col,
  Row,
  TextPlaceholder,
} from "Renderer/components/core/table/table.component"
import { UseTableSelect } from "Renderer/utils/hooks/useTableSelect"
import { VisibleCheckbox } from "Renderer/components/rest/visible-checkbox/visible-checkbox"
import { Size } from "Renderer/components/core/input-checkbox/input-checkbox.component"
import { backgroundColor } from "Renderer/styles/theming/theme-getters"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import Icon from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import Dropdown from "Renderer/components/core/dropdown/dropdown.component"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import ButtonComponent from "Renderer/components/core/button/button.component"
import useTableScrolling from "Renderer/utils/hooks/use-table-scrolling"
import { noop } from "Renderer/utils/noop"
import {
  DataWrapper,
  Message,
  Name,
  NameWrapper,
  Time,
} from "Renderer/components/rest/messages/threads-table.component"
import moment from "moment"
import {
  AvatarPlaceholder,
  lightAvatarStyles,
} from "App/contacts/components/contact-list/contact-list.component"
import { InView } from "react-intersection-observer"
import Avatar, {
  AvatarSize,
} from "Renderer/components/core/avatar/avatar.component"
import getPrettyCaller from "Renderer/models/calls/get-pretty-caller"
import { ThreadListTestIds } from "App/messages/components/thread-list-test-ids.enum"
import ScrollAnchorContainer from "Renderer/components/rest/scroll-anchor-container/scroll-anchor-container.component"
import {
  animatedOpacityActiveStyles,
  animatedOpacityStyles,
} from "Renderer/components/rest/animated-opacity/animated-opacity"
import { isToday } from "Renderer/utils/is-today"
import { AppSettings } from "App/main/store/settings.interface"
import { HiddenButton } from "App/contacts/components/contact-list/contact-list.styled"
import { productionEnvironment } from "Renderer/constants/menu-elements"
import { Thread } from "App/messages/store/messages.interface"
import { Contact } from "App/contacts/store/contacts.type"

const ThreadRow = styled(Row)`
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

const ThreadCol = styled(Col)`
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

// TODO: turn on in https://appnroll.atlassian.net/browse/PDA-802
// const Threads = styled(Table)<{
//   noneRowsSelected?: boolean
// }>`
//   --columnsTemplate: 11.2rem 60.5rem 1fr;
//   --columnsTemplateWithOpenedSidebar: 11.2rem 1fr;
//   --columnsGap: 0;
//
//   ${({ noneRowsSelected }) =>
//     !noneRowsSelected &&
//     css`
//       ${InitialsAvatar} {
//         ${animatedOpacityStyles};
//       }
//
//       ${Checkbox} {
//         ${animatedOpacityActiveStyles};
//       }
//     `};
//
//   ${Row} {
//     :hover {
//       ${Checkbox} {
//         ${animatedOpacityActiveStyles};
//       }
//
//       ${InitialsAvatar} {
//         display: none;
//       }
//     }
//   }
// `

const Threads = styled(Table)<{
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
`

const ThreadDataWrapper = styled(DataWrapper)<{ sidebarOpened: boolean }>`
  margin-right: ${({ sidebarOpened }) => (sidebarOpened ? "4rem" : "0")};
`

type SelectHook = Pick<
  UseTableSelect<Thread>,
  "getRowStatus" | "toggleRow" | "noneRowsSelected"
>

interface Props extends SelectHook, Pick<AppSettings, "language"> {
  threads: Thread[]
  openSidebar?: (thread: Thread) => void
  activeThread?: Thread
  onDeleteClick: (id: string) => void
  onToggleReadStatus: (ids: string[]) => void
  getContact: (contactId: string) => Contact
  onContactClick: (phoneNumber: string) => void
  isContactCreated: (id: string) => boolean
}

const ThreadList: FunctionComponent<Props> = ({
  activeThread,
  threads,
  openSidebar = noop,
  onDeleteClick,
  onToggleReadStatus,
  getRowStatus,
  toggleRow,
  noneRowsSelected,
  language,
  getContact,
  onContactClick,
  isContactCreated,
}) => {
  /* TODO in new message feature task:
          1. Destructure scrollable from useTableScrolling
              and use it in <Messages />
          2. Add mouseLock prop to <Messages />
   */
  const { enableScroll, disableScroll } = useTableScrolling()

  return (
    <Threads
      noneRowsSelected={noneRowsSelected}
      hideableColumnsIndexes={[2, 3, 4]}
      hideColumns={Boolean(activeThread)}
    >
      {threads.map((thread) => {
        const { unread, id } = thread
        const contact = getContact(thread.contactId)
        const { selected, indeterminate } = getRowStatus(thread)

        const toggle = () => toggleRow(thread)
        const open = () => openSidebar(thread)
        const active = activeThread?.id === thread.id
        const emitDeleteClick = () => onDeleteClick(id)
        const toggleReadStatus = () => onToggleReadStatus([id])
        const handleContactClick = () => onContactClick(id)
        const interactiveRow = (ref: Ref<HTMLDivElement>) => (
          <ThreadRow ref={ref} selected={selected} active={active}>
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
                user={contact}
                light={active}
                size={AvatarSize.Big}
              />
            </AvatarCol>
            <ThreadCol onClick={open} data-testid={ThreadListTestIds.Row}>
              <ThreadDataWrapper sidebarOpened={Boolean(activeThread)}>
                <NameWrapper>
                  <Name displayStyle={TextDisplayStyle.LargeBoldText}>
                    {getPrettyCaller(contact, thread.id)}
                  </Name>
                  {Boolean(thread.id && contact?.secondaryPhoneNumber) && (
                    <Text displayStyle={TextDisplayStyle.LargeFadedText}>
                      &nbsp;
                      {thread.id.split(" ").join("") ===
                      contact?.secondaryPhoneNumber?.split(" ").join("")
                        ? "#2"
                        : "#1"}
                    </Text>
                  )}
                </NameWrapper>
                <Time displayStyle={TextDisplayStyle.SmallFadedText}>
                  {isToday(thread.lastUpdatedAt)
                    ? moment(thread.lastUpdatedAt).format("h:mm A")
                    : moment(thread.lastUpdatedAt)
                        .locale(language ?? "en")
                        .format("ll")}
                </Time>
                <LastMessageText
                  unread={unread}
                  displayStyle={
                    unread
                      ? TextDisplayStyle.MediumText
                      : TextDisplayStyle.MediumFadedLightText
                  }
                >
                  {thread?.messageSnippet}
                </LastMessageText>
              </ThreadDataWrapper>
            </ThreadCol>
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
                  <HiddenButton
                    labelMessage={{
                      id: "component.dropdownCall",
                      values: {
                        name: contact?.firstName || thread.id,
                      },
                    }}
                    Icon={Type.Calls}
                    onClick={noop}
                    displayStyle={DisplayStyle.Dropdown}
                    data-testid="dropdown-call"
                    hide={productionEnvironment}
                  />
                  {isContactCreated(thread.contactId) ? (
                    <ButtonComponent
                      labelMessage={{
                        id: "module.messages.dropdownContactDetails",
                      }}
                      Icon={Type.Contact}
                      onClick={handleContactClick}
                      displayStyle={DisplayStyle.Dropdown}
                      data-testid="dropdown-contact-details"
                    />
                  ) : (
                    <ButtonComponent
                      labelMessage={{
                        id: "module.messages.dropdownAddToContacts",
                      }}
                      Icon={Type.NewContact}
                      onClick={handleContactClick}
                      displayStyle={DisplayStyle.Dropdown}
                      data-testid="dropdown-add-to-contacts"
                    />
                  )}
                  {/* TODO: turn on in https://appnroll.atlassian.net/browse/PDA-802 */}
                  {process.env.NODE_ENV !== "production" && (
                    <>
                      <HiddenButton
                        labelMessage={{
                          id: unread
                            ? "module.messages.markAsRead"
                            : "module.messages.markAsUnread",
                        }}
                        Icon={Type.BorderCheckIcon}
                        onClick={toggleReadStatus}
                        displayStyle={DisplayStyle.Dropdown}
                        data-testid="dropdown-mark-as-read"
                        hide={productionEnvironment}
                      />

                      <ButtonComponent
                        labelMessage={{
                          id: "module.messages.dropdownDelete",
                        }}
                        Icon={Type.Delete}
                        onClick={emitDeleteClick}
                        displayStyle={DisplayStyle.Dropdown}
                        data-testid="dropdown-delete"
                      />
                    </>
                  )}
                </Dropdown>
              </Actions>
            </Col>
            <ScrollAnchorContainer key={id} active={active} />
          </ThreadRow>
        )

        const placeholderRow = (ref: Ref<HTMLDivElement>) => (
          <ThreadRow ref={ref}>
            <Col />
            <Col>
              <AvatarPlaceholder />
              <TextPlaceholder charsCount={contact?.firstName?.length || 0} />
            </Col>
            <ScrollAnchorContainer key={id} active={active} />
          </ThreadRow>
        )

        return (
          <InView key={id}>
            {({ inView, ref }) =>
              inView ? interactiveRow(ref) : placeholderRow(ref)
            }
          </InView>
        )
      })}
    </Threads>
  )
}

export default ThreadList
