/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ChangeEvent, ComponentProps } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import {
  Message,
  Receiver,
  ResultState,
} from "App/messages/reducers/messages.interface"
import { MessagesWrapper } from "App/messages/components/thread-details.styled"
import { Sidebar } from "Renderer/components/core/table/table.component"
import ThreadDetailsError from "App/messages/components/thread-details-error.component"
import ThreadDetailsLoading from "App/messages/components/thread-details-loading.component"
import ThreadDetailsMessages from "App/messages/components/thread-details-messages.component"
import ThreadDetailsTextArea from "App/messages/components/thread-details-text-area.component"
import ThreadDetailsSidebar from "App/messages/components/thread-details-sidebar.component"
import ThreadDetailsSidebarRightHeader from "App/messages/components/thread-details-sidebar-right-header.component"

type SidebarProps = ComponentProps<typeof Sidebar>
type ThreadDetailsRightHeaderProps = ComponentProps<
  typeof ThreadDetailsSidebarRightHeader
>

interface Props extends SidebarProps, ThreadDetailsRightHeaderProps {
  content: string
  receiver: Receiver
  messages: Message[]
  resultState: ResultState
  onLoadMessagesClick: () => void
  onAttachContactClick: () => void
  onSendClick: () => void
  onContentChange: (content: string) => void
}

const ThreadDetails: FunctionComponent<Props> = ({
  content,
  receiver,
  messages,
  resultState,
  onLoadMessagesClick,
  onAttachContactClick,
  onSendClick,
  onContentChange,
  ...props
}) => {
  const handleTextAreaChange = (event: ChangeEvent<HTMLInputElement>): void => {
    onContentChange(event.target.value)
  }

  return (
    <ThreadDetailsSidebar receiver={receiver} {...props}>
      <MessagesWrapper>
        {resultState === ResultState.Error && (
          <ThreadDetailsError onClick={onLoadMessagesClick} />
        )}
        {resultState === ResultState.Loading && <ThreadDetailsLoading />}
        {resultState === ResultState.Loaded && (
          <ThreadDetailsMessages messages={messages} receiver={receiver} />
        )}
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
