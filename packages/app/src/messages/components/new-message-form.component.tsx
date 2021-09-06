/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ChangeEvent, ComponentProps, useState } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { MessagesWrapper } from "App/messages/components/thread-details.styled"
import ThreadDetailsMessages from "App/messages/components/thread-details-messages.component"
import ThreadDetailsTextArea from "App/messages/components/thread-details-text-area.component"
import { phoneNumberRegexp } from "Renderer/utils/form-validators"
import NewMessageFormSidebar from "App/messages/components/new-message-form-sidebar.component"
import { Sidebar } from "Renderer/components/core/table/table.component"

type SidebarProps = ComponentProps<typeof Sidebar>

interface Props extends SidebarProps {
  content: string
  onSendClick: (number: string) => void
  onContentChange: (content: string) => void
  onAttachContactClick: () => void
}

const NewMessageForm: FunctionComponent<Props> = ({
  content,
  onSendClick,
  onContentChange,
  onAttachContactClick,
  ...props
}) => {
  const [searchValue, setSearchValue] = useState("")

  const handleSearchValueChange = (value: string): void => {
    setSearchValue(value)
  }

  const handleTextAreaChange = (event: ChangeEvent<HTMLInputElement>): void => {
    onContentChange(event.target.value)
  }

  const handleSendClick = (): void => {
    if (searchValue.match(phoneNumberRegexp)) {
      onSendClick(searchValue)
    }
  }

  return (
    <NewMessageFormSidebar
      results={[]}
      searchValue={searchValue}
      onSearchValueChange={handleSearchValueChange}
      {...props}
    >
      <MessagesWrapper>
        <ThreadDetailsMessages messages={[]} />
      </MessagesWrapper>
      <ThreadDetailsTextArea
        value={content}
        onSendClick={handleSendClick}
        onChange={handleTextAreaChange}
        onAttachContactClick={onAttachContactClick}
      />
    </NewMessageFormSidebar>
  )
}

export default NewMessageForm
