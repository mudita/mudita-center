/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ChangeEvent, ComponentProps } from "react"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { Receiver } from "App/messages/reducers/messages.interface"
import { Message } from "App/messages/dto"
import { MessagesWrapper } from "App/messages/components/thread-details.styled"
import { Sidebar } from "App/__deprecated__/renderer/components/core/table/table.component"
import ThreadDetailsMessages from "App/messages/components/thread-details-messages.component"
import ThreadDetailsTextArea from "App/messages/components/thread-details-text-area.component"
import ThreadDetailsSidebar from "App/messages/components/thread-details-sidebar.component"
import ThreadDetailsSidebarRightHeader from "App/messages/components/thread-details-sidebar-right-header.component"
import { Notification } from "App/notification/types"

type SidebarProps = ComponentProps<typeof Sidebar>
type ThreadDetailsRightHeaderProps = ComponentProps<
  typeof ThreadDetailsSidebarRightHeader
>

interface Props extends SidebarProps, ThreadDetailsRightHeaderProps {
  content: string
  receiver: Receiver
  messages: Message[]
  onAttachContactClick: () => void
  onSendClick: () => void
  onContentChange: (content: string) => void
  messageLayoutNotifications: Notification[]
  removeLayoutNotification: (notificationId: string) => void
  onMessageRead: () => void
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
          receiver={receiver}
          messageLayoutNotifications={messageLayoutNotifications}
          removeLayoutNotification={removeLayoutNotification}
          onMessageRead={onMessageRead}
        />
      </MessagesWrapper>
      <ThreadDetailsTextArea
        value={content}
        onSendClick={onSendClick}
        onChange={handleTextAreaChange}
        onAttachContactClick={onAttachContactClick}
      />
    </ThreadDetailsSidebar>
  )
}

export default ThreadDetails
