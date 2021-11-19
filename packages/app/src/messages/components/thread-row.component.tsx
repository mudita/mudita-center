/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { Size } from "Renderer/components/core/input-checkbox/input-checkbox.component"
import Avatar, {
  AvatarSize,
} from "Renderer/components/core/avatar/avatar.component"
import { ThreadListTestIds } from "App/messages/components/thread-list-test-ids.enum"
import {
  DataWrapper,
  Message,
  Name,
  NameWrapper,
  Time,
} from "Renderer/components/rest/messages/threads-table.component"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import getPrettyCaller from "Renderer/models/calls/get-pretty-caller"
import { isToday } from "Renderer/utils/is-today"
import moment from "moment"
import {
  Actions,
  ActionsButton,
  Col,
} from "Renderer/components/core/table/table.component"
import Dropdown from "Renderer/components/core/dropdown/dropdown.component"
import Icon from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import { HiddenButton } from "App/contacts/components/contact-list/contact-list.styled"
import { noop } from "Renderer/utils/noop"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import { Feature, flags } from "App/feature-flags"
import ButtonComponent from "Renderer/components/core/button/button.component"
import ScrollAnchorContainer from "Renderer/components/rest/scroll-anchor-container/scroll-anchor-container.component"
import { Thread } from "App/messages/reducers"
import { Contact } from "App/contacts/store/contacts.type"
import { RowStatus, UseTableSelect } from "Renderer/utils/hooks/useTableSelect"
import styled, { css } from "styled-components"
import { backgroundColor } from "Renderer/styles/theming/theme-getters"
import {
  animatedOpacityActiveStyles,
  animatedOpacityStyles,
} from "Renderer/components/rest/animated-opacity/animated-opacity"
import { lightAvatarStyles } from "App/contacts/components/contact-list/contact-list.component"
import { VisibleCheckbox } from "Renderer/components/rest/visible-checkbox/visible-checkbox"
import { AppSettings } from "App/main/store/settings.interface"
import ThreadBaseRow from "App/messages/components/thread-base-row.component"
import { ListRowProps } from "react-virtualized"

export const Checkbox = styled(VisibleCheckbox)`
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

export const InitialsAvatar = styled(Avatar)<{ light?: boolean }>`
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

const ThreadRowContainer = styled(ThreadBaseRow)`
  &:hover {
    background-color: ${backgroundColor("minor")};
    ${InitialsAvatar} {
      background-color: ${backgroundColor("lightIcon")};
    }
  }
`

const ThreadDataWrapper = styled(DataWrapper)<{ sidebarOpened: boolean }>`
  margin-right: ${({ sidebarOpened }) => (sidebarOpened ? "4rem" : "0")};
`

const NewThreadWrapper = styled.div``

type SelectHook = Pick<UseTableSelect<Thread>, "noneRowsSelected">

interface Props
  extends SelectHook,
    RowStatus,
    Pick<AppSettings, "language">,
    Pick<ListRowProps, "style"> {
  sidebarOpened: boolean
  active: boolean
  thread: Thread
  contact: Contact | undefined
  onCheckboxChange: (thread: Thread) => void
  onRowClick: (thread: Thread) => void
  onDeleteClick: (id: Thread["id"]) => void
  onToggleReadClick: (ids: Thread["id"][]) => void
  onContactClick: (phoneNumber: Thread["phoneNumber"]) => void
  newConversation: string
}

const ThreadRow: FunctionComponent<Props> = ({
  sidebarOpened,
  active,
  selected,
  indeterminate,
  noneRowsSelected,
  thread,
  contact,
  language,
  onCheckboxChange,
  onRowClick,
  onDeleteClick,
  onToggleReadClick,
  onContactClick,
  newConversation,
  ...props
}) => {
  const contactCreated = contact !== undefined
  const { unread, id, phoneNumber } = thread

  const handleCheckboxChange = () => onCheckboxChange(thread)
  const handleRowClick = () => onRowClick(thread)
  const handleDeleteClick = () => onDeleteClick(id)
  const handleToggleClick = () => onToggleReadClick([id])
  const handleContactClick = () => onContactClick(phoneNumber)

  return (
    <ThreadRowContainer key={id} selected={selected} active={active} {...props}>
      <AvatarCol>
        <Checkbox
          checked={selected}
          onChange={handleCheckboxChange}
          size={Size.Large}
          indeterminate={indeterminate}
          visible={!noneRowsSelected}
          data-testid="checkbox"
        />
        <InitialsAvatar user={contact} light={active} size={AvatarSize.Big} />
      </AvatarCol>
      <ThreadCol onClick={handleRowClick} data-testid={ThreadListTestIds.Row}>
        {getPrettyCaller(contact, phoneNumber) === newConversation ? (
          <NewThreadWrapper>
            <Name displayStyle={TextDisplayStyle.LargeBoldText}>
              {getPrettyCaller(contact, phoneNumber)}
            </Name>
          </NewThreadWrapper>
        ) : (
          <ThreadDataWrapper sidebarOpened={sidebarOpened}>
            <NameWrapper>
              <Name displayStyle={TextDisplayStyle.LargeBoldText}>
                {getPrettyCaller(contact, phoneNumber)}
              </Name>
              {Boolean(phoneNumber && contact?.secondaryPhoneNumber) && (
                <Text displayStyle={TextDisplayStyle.LargeFadedText}>
                  &nbsp;
                  {phoneNumber.split(" ").join("") ===
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
        )}
      </ThreadCol>
      <Col>
        <Actions>
          <Dropdown
            toggler={
              <ActionsButton>
                <Icon type={Type.More} />
              </ActionsButton>
            }
          >
            <HiddenButton
              labelMessage={{
                id: "component.dropdownCall",
                values: {
                  name: contact?.firstName || phoneNumber,
                },
              }}
              Icon={Type.Calls}
              onClick={noop}
              displayStyle={DisplayStyle.Dropdown}
              data-testid="dropdown-call"
              hide={flags.get(Feature.ProductionAndAlpha)}
            />
            {contactCreated ? (
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
            {!flags.get(Feature.ProductionAndAlpha) && (
              <>
                <HiddenButton
                  labelMessage={{
                    id: unread
                      ? "module.messages.markAsRead"
                      : "module.messages.markAsUnread",
                  }}
                  Icon={Type.BorderCheckIcon}
                  onClick={handleToggleClick}
                  displayStyle={DisplayStyle.Dropdown}
                  data-testid="dropdown-mark-as-read"
                  hide={flags.get(Feature.ProductionAndAlpha)}
                />

                <ButtonComponent
                  labelMessage={{
                    id: "module.messages.dropdownDelete",
                  }}
                  Icon={Type.Delete}
                  onClick={handleDeleteClick}
                  displayStyle={DisplayStyle.Dropdown}
                  data-testid="dropdown-delete"
                />
              </>
            )}
          </Dropdown>
        </Actions>
      </Col>
      <ScrollAnchorContainer key={id} active={active} />
    </ThreadRowContainer>
  )
}

export default ThreadRow
