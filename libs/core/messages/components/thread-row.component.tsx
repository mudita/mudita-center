/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Contact } from "Core/contacts/reducers/contacts.interface"
import { ThreadListTestIds } from "Core/messages/components/thread-list-test-ids.enum"
import ThreadRowName from "Core/messages/components/thread-row-name"
import { MessageType } from "Core/messages/constants"
import { Thread } from "Core/messages/dto"
import { Settings } from "Core/settings/dto"
import { AvatarSize } from "Core/__deprecated__/renderer/components/core/avatar/avatar.component"
import ButtonComponent from "Core/__deprecated__/renderer/components/core/button/button.component"
import { DisplayStyle } from "Core/__deprecated__/renderer/components/core/button/button.config"
import Dropdown from "Core/__deprecated__/renderer/components/core/dropdown/dropdown.component"
import { IconButtonWithSecondaryTooltip } from "Core/__deprecated__/renderer/components/core/icon-button-with-tooltip/icon-button-with-secondary-tooltip.component"
import { IconType } from "Core/__deprecated__/renderer/components/core/icon/icon-type"
import Icon from "Core/__deprecated__/renderer/components/core/icon/icon.component"
import { Size } from "Core/__deprecated__/renderer/components/core/input-checkbox/input-checkbox.component"
import {
  Actions,
  Col,
} from "Core/__deprecated__/renderer/components/core/table/table.component"
import { TextDisplayStyle } from "Core/__deprecated__/renderer/components/core/text/text.component"
import { ElementWithTooltipPlace } from "Core/__deprecated__/renderer/components/core/tooltip/element-with-tooltip.component"
import { Time } from "Core/__deprecated__/renderer/components/rest/messages/threads-table.component"
import ScrollAnchorContainer from "Core/__deprecated__/renderer/components/rest/scroll-anchor-container/scroll-anchor-container.component"
import getPrettyCaller from "Core/messages/helpers/get-pretty-caller"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import {
  RowStatus,
  UseTableSelect,
} from "Core/__deprecated__/renderer/utils/hooks/useTableSelect"
import { isToday } from "Core/__deprecated__/renderer/utils/is-today"
import moment from "moment"
import React from "react"
import { defineMessages } from "react-intl"
import { ListRowProps } from "react-virtualized"
import {
  ThreadRowContainer,
  Checkbox,
  InitialsAvatar,
  ThreadCol,
  NewThreadWrapper,
  ThreadDataWrapper,
  LastMessageText,
  WarningIconWrapper,
} from "Core/messages/components/thread-row.styled"
import { isPhoneNumberValid } from "Core/messages/helpers/threads.helpers"

const messages = defineMessages({
  dropdownTogglerTooltipDescription: {
    id: "component.dropdownTogglerTooltipDescription",
  },
})

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
  onCheckboxChange: (threadId: string) => void
  onRowClick: (thread: Thread) => void
  onDeleteClick: (id: Thread["id"]) => void
  onToggleReadClick: (threads: Thread[]) => void
  onContactClick: (phoneNumber: Thread["phoneNumber"]) => void
  newConversation: string
  threadsOffset?: { left: number; top: number }
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
  threadsOffset,
  ...props
}) => {
  const contactCreated = contact !== undefined
  const { unread, id, phoneNumber } = thread
  const isMessageFailed = thread.messageType === MessageType.FAILED
  const newConversationOpen =
    getPrettyCaller(contact, phoneNumber) === newConversation
  const handleCheckboxChange = () => onCheckboxChange(thread.id)
  const handleRowClick = () => onRowClick(thread)
  const handleDeleteClick = () => onDeleteClick(id)
  const handleToggleClick = () => {
    onToggleReadClick([thread])
  }
  const handleContactClick = () => onContactClick(phoneNumber)

  return (
    <ThreadRowContainer
      key={id}
      selected={selected}
      active={active}
      notNewConversation={!newConversationOpen}
      {...props}
    >
      <Col>
        {!newConversationOpen && (
          <Checkbox
            checked={selected}
            onChange={handleCheckboxChange}
            size={Size.Large}
            indeterminate={indeterminate}
            visible={!noneRowsSelected}
            data-testid="checkbox"
            threadsOffset={threadsOffset}
          />
        )}
        {(noneRowsSelected || newConversationOpen) && (
          <InitialsAvatar user={contact} light={active} size={AvatarSize.Big} />
        )}
      </Col>
      <ThreadCol onClick={handleRowClick} data-testid={ThreadListTestIds.Row}>
        {newConversationOpen || !thread.messageSnippet ? (
          <NewThreadWrapper>
            <ThreadRowName contact={contact} phoneNumber={phoneNumber} />
          </NewThreadWrapper>
        ) : (
          <>
            <ThreadDataWrapper
              sidebarOpened={sidebarOpened}
              isMessageFailed={isMessageFailed}
            >
              <ThreadRowName contact={contact} phoneNumber={phoneNumber} />
              <Time displayStyle={TextDisplayStyle.Label} color="secondary">
                {isToday(thread.lastUpdatedAt)
                  ? moment(thread.lastUpdatedAt).format("h:mm A")
                  : moment(thread.lastUpdatedAt)
                      .locale(language ?? "en")
                      .format("ll")}
              </Time>
              <LastMessageText
                unread={unread}
                color="secondary"
                displayStyle={
                  unread
                    ? TextDisplayStyle.Paragraph3
                    : TextDisplayStyle.Paragraph4
                }
                data-testid={ThreadListTestIds.LastMessage}
              >
                {thread?.messageSnippet}
              </LastMessageText>
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
                testId={"thread-row-toggler"}
              />
            }
          >
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
                disabled={!isPhoneNumberValid(phoneNumber)}
              />
            )}
            <ButtonComponent
              labelMessage={{
                id: "module.messages.dropdownDelete",
              }}
              Icon={IconType.Delete}
              onClick={handleDeleteClick}
              displayStyle={DisplayStyle.Dropdown}
              data-testid="dropdown-delete"
            />
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
          </Dropdown>
        </Actions>
      </Col>
      <ScrollAnchorContainer key={id} active={active} />
    </ThreadRowContainer>
  )
}

export default ThreadRow
