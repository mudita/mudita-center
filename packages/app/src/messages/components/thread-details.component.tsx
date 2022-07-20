/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import ThreadDetailsMessages from "App/messages/components/thread-details-messages.component"
import ThreadDetailsSidebarRightHeader from "App/messages/components/thread-details-sidebar-right-header.component"
import ThreadDetailsSidebar from "App/messages/components/thread-details-sidebar.component"
import ThreadDetailsTextArea from "App/messages/components/thread-details-text-area.component"
import { MessagesWrapper } from "App/messages/components/thread-details.styled"
import { Message } from "App/messages/dto"
import { Receiver } from "App/messages/reducers/messages.interface"
import { Notification } from "App/notification/types"
import { Sidebar } from "App/__deprecated__/renderer/components/core/table/table.component"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import React, { ChangeEvent, ComponentProps } from "react"

type SidebarProps = ComponentProps<typeof Sidebar>
type ThreadDetailsRightHeaderProps = ComponentProps<
  typeof ThreadDetailsSidebarRightHeader
>

interface Props extends SidebarProps, ThreadDetailsRightHeaderProps {
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
