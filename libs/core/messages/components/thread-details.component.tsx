/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import ThreadDetailsMessages from "Core/messages/components/thread-details-messages.component"
import ThreadDetailsSidebarRightHeader from "Core/messages/components/thread-details-sidebar-right-header.component"
import ThreadDetailsSidebar from "Core/messages/components/thread-details-sidebar.component"
import ThreadDetailsTextArea from "Core/messages/components/thread-details-text-area.component"
import { MessagesWrapper } from "Core/messages/components/thread-details.styled"
import { Message } from "Core/messages/dto"
import { Receiver } from "Core/messages/reducers/messages.interface"
import { Notification } from "Core/notification/types"
import { Sidebar } from "Core/__deprecated__/renderer/components/core/table/table.component"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import React, { ChangeEvent, ComponentProps } from "react"

type SidebarProps = ComponentProps<typeof Sidebar>
type ThreadDetailsRightHeaderProps = ComponentProps<
  typeof ThreadDetailsSidebarRightHeader
>

interface Props
  extends SidebarProps,
    Omit<ThreadDetailsRightHeaderProps, "emptyThread" | "validPhoneNumber"> {
  content: string
  receiver: Receiver
  messages: Message[]
  currentlyDeletingMessageId: string | null
  onAttachContactClick: () => void
  onSendClick: () => void
  onContentChange: (content: string) => void
  messageLayoutNotifications: Notification[]
  removeLayoutNotification: (notificationId: string) => void
  onMessageRead: () => void
  onMessageDelete: (messageId: string) => void
  resendMessage: (messageId: string) => void
  onAttachTemplateClick: () => void
  selectedMessage: Message | null
  searchQuery: string
}

const ThreadDetails: FunctionComponent<Props> = ({
  content,
  receiver,
  messages,
  onAttachContactClick,
  onSendClick,
  onContentChange,
  messageLayoutNotifications,
  removeLayoutNotification,
  onMessageRead,
  onMessageDelete,
  currentlyDeletingMessageId,
  resendMessage,
  onAttachTemplateClick,
  selectedMessage,
  searchQuery,
  ...props
}) => {
  const handleTextAreaChange = (
    event: ChangeEvent<HTMLTextAreaElement>
  ): void => {
    onContentChange(event.target.value)
  }

  return (
    <ThreadDetailsSidebar
      receiver={receiver}
      key={receiver.phoneNumber}
      emptyThread={messages.length <= 0}
      {...props}
    >
      <MessagesWrapper>
        <ThreadDetailsMessages
          messages={messages}
          currentlyDeletingMessageId={currentlyDeletingMessageId}
          receiver={receiver}
          messageLayoutNotifications={messageLayoutNotifications}
          removeLayoutNotification={removeLayoutNotification}
          onMessageRead={onMessageRead}
          onMessageRemove={onMessageDelete}
          resendMessage={resendMessage}
          selectedMessage={selectedMessage}
          searchQuery={searchQuery}
        />
      </MessagesWrapper>
      <ThreadDetailsTextArea
        value={content}
        onSendClick={onSendClick}
        onChange={handleTextAreaChange}
        onAttachContactClick={onAttachContactClick}
        onAttachTemplateClick={onAttachTemplateClick}
      />
    </ThreadDetailsSidebar>
  )
}

export default ThreadDetails
