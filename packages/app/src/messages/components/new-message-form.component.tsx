/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ChangeEvent, useState } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { NewMessage } from "App/messages/store/messages.interface"
import {
  MessagesSidebar,
  MessagesWrapper,
} from "App/messages/components/thread-details.styled"
import ThreadDetailsMessages from "App/messages/components/thread-details-messages.component"
import ThreadDetailsTextArea from "App/messages/components/thread-details-text-area.component"

interface Props {
  onClose: () => void
  onAttachContactClick: () => void
  onAddNewMessage: (newMessage: NewMessage) => void
}

const NewMessageForm: FunctionComponent<Props> = ({
  onClose,
  onAttachContactClick,
  onAddNewMessage,
  ...props
}) => {
  const [value, setValue] = useState("")
  const handleTextAreaChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue((previousValue) => {
      return event.target.value.length >= 115
        ? previousValue
        : event.target.value
    })
  }
  const handleTextAreaSendClick = () => {
    onAddNewMessage({
      number: "thread.number",
      content: value,
    })
    setValue("")
  }
  return (
    <MessagesSidebar
      show
      withBottomBorder
      padded={false}
      onClose={onClose}
      {...props}
    >
      <MessagesWrapper>
        <ThreadDetailsMessages messages={[]} />
      </MessagesWrapper>
      <ThreadDetailsTextArea
        value={value}
        onSendClick={handleTextAreaSendClick}
        onChange={handleTextAreaChange}
        onAttachContactClick={onAttachContactClick}
      />
    </MessagesSidebar>
  )
}

export default NewMessageForm
