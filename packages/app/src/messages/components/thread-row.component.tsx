/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { Size } from "App/__deprecated__/renderer/components/core/input-checkbox/input-checkbox.component"
import Avatar, {
  AvatarSize,
} from "App/__deprecated__/renderer/components/core/avatar/avatar.component"
import { ThreadListTestIds } from "App/messages/components/thread-list-test-ids.enum"
import {
  DataWrapper,
  Message,
  Name,
  NameWrapper,
  Time,
} from "App/__deprecated__/renderer/components/rest/messages/threads-table.component"
import Text, {
  TextDisplayStyle,
} from "App/__deprecated__/renderer/components/core/text/text.component"
import getPrettyCaller from "App/__deprecated__/renderer/models/calls/get-pretty-caller"
import { isToday } from "App/__deprecated__/renderer/utils/is-today"
import moment from "moment"
import {
  Actions,
  Col,
} from "App/__deprecated__/renderer/components/core/table/table.component"
import Dropdown from "App/__deprecated__/renderer/components/core/dropdown/dropdown.component"
import { HiddenButton } from "App/contacts/components/contact-list/contact-list.styled"
import { noop } from "App/__deprecated__/renderer/utils/noop"
import { DisplayStyle } from "App/__deprecated__/renderer/components/core/button/button.config"
import { Feature } from "App/feature-flags/constants/feature.enum"
import { flags } from "App/feature-flags/helpers/feature-flag.helpers"
import ButtonComponent from "App/__deprecated__/renderer/components/core/button/button.component"
import ScrollAnchorContainer from "App/__deprecated__/renderer/components/rest/scroll-anchor-container/scroll-anchor-container.component"
import { Thread } from "App/messages/dto"
import { MessageType } from "App/messages/constants"
import { Contact } from "App/contacts/reducers/contacts.interface"
import {
  RowStatus,
  UseTableSelect,
} from "App/__deprecated__/renderer/utils/hooks/useTableSelect"
import styled, { css } from "styled-components"
import { backgroundColor } from "App/__deprecated__/renderer/styles/theming/theme-getters"
import {
  animatedOpacityActiveStyles,
  animatedOpacityStyles,
} from "App/__deprecated__/renderer/components/rest/animated-opacity/animated-opacity"
import { lightAvatarStyles } from "App/contacts/components/contact-list/contact-list.component"
import { VisibleCheckbox } from "App/__deprecated__/renderer/components/rest/visible-checkbox/visible-checkbox"
import { Settings } from "App/settings/dto"
import ThreadBaseRow from "App/messages/components/thread-base-row.component"
import { ListRowProps } from "react-virtualized"
import { IconButtonWithSecondaryTooltip } from "App/__deprecated__/renderer/components/core/icon-button-with-tooltip/icon-button-with-secondary-tooltip.component"
import { defineMessages } from "react-intl"
import { ElementWithTooltipPlace } from "App/__deprecated__/renderer/components/core/tooltip/element-with-tooltip.component"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"
import Icon from "App/__deprecated__/renderer/components/core/icon/icon.component"

const messages = defineMessages({
  dropdownTogglerTooltipDescription: {
    id: "component.dropdownTogglerTooltipDescription",
  },
})

const checkboxShowedStyles = css`
  margin-left: 4.4rem;
  margin-right: 2.8rem;
  display: block;
`

export const Checkbox = styled(VisibleCheckbox)<{ visible?: boolean }>`
  ${({ visible }) => (visible ? checkboxShowedStyles : "display: none;")};
`

const dotStyles = css`
  &:after {
    display: block;
    content: "";
    position: absolute;
    top: 0.8rem;
    margin-left: -1.4rem;
    height: 0.6rem;
    width: 0.6rem;
    border-radius: 50%;
    background-color: ${backgroundColor("activity")};
  }
`

const ThreadCol = styled(Col)`
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export const InitialsAvatar = styled(Avatar)`
  margin-right: 1.6rem;
  margin-left: 3.2rem;
`

const LastMessageText = styled(Message)<{ unread?: boolean }>`
  padding-left: ${({ unread }) => (unread ? "1.4rem" : "0")};
  position: relative;
  ${({ unread }) => unread && dotStyles};
`

const activeRowStyles = css`
  ${InitialsAvatar} {
    ${lightAvatarStyles};
  }
`

const ThreadRowContainer = styled(ThreadBaseRow)`
  ${({ active }) => active && activeRowStyles};
  :hover {
    background-color: ${backgroundColor("minor")};
    ${Checkbox} {
      ${animatedOpacityActiveStyles};
      ${checkboxShowedStyles};
    }

    ${InitialsAvatar} {
      ${flags.get(Feature.MessagesThreadDeleteEnabled)
        ? css`
            display: none;
            ${animatedOpacityStyles}
          `
        : lightAvatarStyles}
    }
  }
`

const ThreadDataWrapper = styled(DataWrapper)<{
  sidebarOpened: boolean
  isMessageFailed: boolean
}>`
  margin-right: ${({ sidebarOpened, isMessageFailed }) =>
    sidebarOpened && !isMessageFailed ? "4rem" : "0"};
`
const WarningIconWrapper = styled.div`
  margin-right: 1.7rem;
`

const NewThreadWrapper = styled.div``

type SelectHook = Pick<UseTableSelect<Thread>, "noneRowsSelected">

interface Props
  extends SelectHook,
    RowStatus,
    Pick<Settings, "language">,
    Pick<ListRowProps, "style"> {
  sidebarOpened: boolean
  active: boolean
  thread: Thread
  contact: Contact | undefined
  onCheckboxChange: (thread: Thread) => void
  onRowClick: (thread: Thread) => void
  onDeleteClick: (id: Thread["id"]) => void
  onToggleReadClick: (threads: Thread[]) => void
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
  const isMessageFailed = thread.messageType === MessageType.FAILED

  const handleCheckboxChange = () => onCheckboxChange(thread)
  const handleRowClick = () => onRowClick(thread)
  const handleDeleteClick = () => onDeleteClick(id)
  const handleToggleClick = () => {
    if (!thread.unread) {
      return
    }

    onToggleReadClick([thread])
  }
  const handleContactClick = () => onContactClick(phoneNumber)

  return (
    <ThreadRowContainer key={id} selected={selected} active={active} {...props}>
      <Col>
        {flags.get(Feature.MessagesThreadDeleteEnabled) && (
          <Checkbox
            checked={selected}
            onChange={handleCheckboxChange}
            size={Size.Large}
            indeterminate={indeterminate}
            visible={!noneRowsSelected}
            data-testid="checkbox"
          />
        )}
        {noneRowsSelected && (
          <InitialsAvatar user={contact} light={active} size={AvatarSize.Big} />
        )}
      </Col>
      <ThreadCol onClick={handleRowClick} data-testid={ThreadListTestIds.Row}>
        {getPrettyCaller(contact, phoneNumber) === newConversation ||
        !thread.messageSnippet ? (
          <NewThreadWrapper>
            <Name displayStyle={TextDisplayStyle.Headline4}>
              {getPrettyCaller(contact, phoneNumber)}
            </Name>
          </NewThreadWrapper>
        ) : (
          <>
            <ThreadDataWrapper
              sidebarOpened={sidebarOpened}
              isMessageFailed={isMessageFailed}
            >
              <NameWrapper>
                <Name displayStyle={TextDisplayStyle.Headline4}>
                  {getPrettyCaller(contact, phoneNumber)}
                </Name>
                {Boolean(phoneNumber && contact?.secondaryPhoneNumber) && (
                  <Text displayStyle={TextDisplayStyle.Paragraph2}>
                    &nbsp;
                    {phoneNumber.split(" ").join("") ===
                    contact?.secondaryPhoneNumber?.split(" ").join("")
                      ? "#2"
                      : "#1"}
                  </Text>
                )}
              </NameWrapper>
              <Time displayStyle={TextDisplayStyle.Label} color="secondary">
                {isToday(thread.lastUpdatedAt)
                  ? moment(thread.lastUpdatedAt).format("h:mm A")
                  : moment(thread.lastUpdatedAt)
                      .locale(language ?? "en")
                      .format("ll")}
              </Time>
              {flags.get(Feature.ReadAndUnreadMessages) ? (
                <LastMessageText
                  unread={unread}
                  color="secondary"
                  displayStyle={
                    unread
                      ? TextDisplayStyle.Paragraph3
                      : TextDisplayStyle.Paragraph4
                  }
                >
                  {thread?.messageSnippet}
                </LastMessageText>
              ) : (
                <LastMessageText
                  unread={false}
                  color="secondary"
                  displayStyle={TextDisplayStyle.Paragraph4}
                >
                  {thread?.messageSnippet}
                </LastMessageText>
              )}
            </ThreadDataWrapper>
            {isMessageFailed && (
              <WarningIconWrapper>
                <Icon
                  type={IconType.Warning}
                  width={1.6}
                  data-testid={ThreadListTestIds.NotSendIcon}
                />
              </WarningIconWrapper>
            )}
          </>
        )}
      </ThreadCol>
      <Col>
        <Actions>
          <Dropdown
            toggler={
              <IconButtonWithSecondaryTooltip
                iconType={IconType.More}
                description={messages.dropdownTogglerTooltipDescription}
                // FIXME: The position based on offset is a sticky. However, this is a quick workaround
                //  for buggy overridePosition lib feature
                place={ElementWithTooltipPlace.Bottom}
                offset={{ left: 15, bottom: 5 }}
              />
            }
          >
            <HiddenButton
              labelMessage={{
                id: "component.dropdownCall",
                values: {
                  name: contact?.firstName || phoneNumber,
                },
              }}
              Icon={IconType.Calls}
              onClick={noop}
              displayStyle={DisplayStyle.Dropdown}
              data-testid="dropdown-call"
              hide={!flags.get(Feature.MessagesCallFromThreadEnabled)}
            />
            {contactCreated ? (
              <ButtonComponent
                labelMessage={{
                  id: "module.messages.dropdownContactDetails",
                }}
                Icon={IconType.Contact}
                onClick={handleContactClick}
                displayStyle={DisplayStyle.Dropdown}
                data-testid="dropdown-contact-details"
              />
            ) : (
              <ButtonComponent
                labelMessage={{
                  id: "module.messages.dropdownAddToContacts",
                }}
                Icon={IconType.NewContact}
                onClick={handleContactClick}
                displayStyle={DisplayStyle.Dropdown}
                data-testid="dropdown-add-to-contacts"
              />
            )}
            {flags.get(Feature.MessagesThreadDeleteEnabled) && (
              <ButtonComponent
                labelMessage={{
                  id: "module.messages.dropdownDelete",
                }}
                Icon={IconType.Delete}
                onClick={handleDeleteClick}
                displayStyle={DisplayStyle.Dropdown}
                data-testid="dropdown-delete"
              />
            )}
            {flags.get(Feature.ReadAndUnreadMessages) && (
              <ButtonComponent
                labelMessage={{
                  id: unread
                    ? "module.messages.markAsRead"
                    : "module.messages.markAsUnread",
                }}
                Icon={unread ? IconType.MarkAsRead : IconType.MarkAsUnread}
                onClick={handleToggleClick}
                displayStyle={DisplayStyle.Dropdown}
                data-testid="dropdown-mark-as-read"
              />
            )}
          </Dropdown>
        </Actions>
      </Col>
      <ScrollAnchorContainer key={id} active={active} />
    </ThreadRowContainer>
  )
}

export default ThreadRow
