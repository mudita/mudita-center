/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ChangeEvent, ComponentProps, useState } from "react"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { MessagesWrapper } from "App/messages/components/thread-details.styled"
import ThreadDetailsMessages from "App/messages/components/thread-details-messages.component"
import ThreadDetailsTextArea from "App/messages/components/thread-details-text-area.component"
import { phoneNumberRegexp } from "App/__deprecated__/renderer/utils/form-validators"
import NewMessageFormSidebar from "App/messages/components/new-message-form-sidebar/new-message-form-sidebar.component"
import { Sidebar } from "App/__deprecated__/renderer/components/core/table/table.component"
import { Receiver } from "App/messages/reducers/messages.interface"
import { filterReceivers } from "App/messages/helpers/messages.helpers"

export const isReceiverMatching = (
  receiver: Receiver,
  search: string
): boolean => {
  const query: (keyof Receiver)[] = ["firstName", "lastName", "phoneNumber"]
  for (const key of query) {
    const param: typeof receiver[keyof typeof receiver] = receiver[key]
    if (
      param !== undefined &&
      typeof param === "string" &&
      param.toLowerCase().includes(search.toLowerCase())
    ) {
      return true
    }
  }
  return false
}

type SidebarProps = ComponentProps<typeof Sidebar>

interface Props extends SidebarProps {
  content: string
  receivers: Receiver[]
  onContentChange: (content: string) => void
  onSendClick: (phoneNumber: string) => void
  onPhoneNumberSelect: (phoneNumber: string) => void
  onReceiverSelect: (receiver: Receiver) => void
  onAttachContactClick: () => void
  onBrowseContactsClick: () => void
  onAttachTemplateClick: () => void
}

const NewMessageForm: FunctionComponent<Props> = ({
  content,
  receivers,
  onSendClick,
  onContentChange,
  onPhoneNumberSelect,
  onReceiverSelect,
  onAttachContactClick,
  onBrowseContactsClick,
  onAttachTemplateClick,
  ...props
}) => {
  const [searchValue, setSearchValue] = useState<string>("")

  const handleSearchValueChange = (value: string): void => {
    setSearchValue(value)
  }

  const handleTextAreaChange = (
    event: ChangeEvent<HTMLTextAreaElement>
  ): void => {
    onContentChange(event.target.value)
  }

  const handleSendClick = (): void => {
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/prefer-regexp-exec
    if (searchValue.match(phoneNumberRegexp) && searchValue.length > 0) {
      onSendClick(searchValue)
    }
  }

  const handleSearchEnterClick = () => {
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/prefer-regexp-exec
    if (searchValue.match(phoneNumberRegexp)) {
      onPhoneNumberSelect(searchValue)
    }
  }

  const filteredReceivers = filterReceivers(receivers, searchValue)

  return (
    <NewMessageFormSidebar
      results={filteredReceivers}
      searchValue={searchValue}
      onSearchValueChange={handleSearchValueChange}
      onSearchEnterClick={handleSearchEnterClick}
      onReceiverSelect={onReceiverSelect}
      onBrowseContactsClick={onBrowseContactsClick}
      {...props}
    >
      <MessagesWrapper>
        <ThreadDetailsMessages
          messages={[]}
          currentlyDeletingMessageId={null}
          selectedMessage={null}
          searchQuery={""}
        />
      </MessagesWrapper>
      <ThreadDetailsTextArea
        value={content}
        onSendClick={handleSendClick}
        onChange={handleTextAreaChange}
        onAttachContactClick={onAttachContactClick}
        onAttachTemplateClick={onAttachTemplateClick}
      />
    </NewMessageFormSidebar>
  )
}

export default NewMessageForm
