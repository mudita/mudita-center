/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps, useRef } from "react"
import moment from "moment"
import ViewportList from "react-viewport-list";
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { MessageBubblesWrapper } from "App/messages/components/thread-details.styled"
import MessageDayBubble from "App/messages/components/message-day-bubble.component"
import {
  Message,
  MessageType,
  Receiver,
} from "App/messages/reducers/messages.interface"

interface Properties {
  messages: Message[]
  receiver?: Receiver
}

const ThreadDetailsMessages: FunctionComponent<Properties> = ({
  messages,
  receiver,
}) => {
  const ref = useRef(null);

  return (
    <MessageBubblesWrapper ref={ref}>
      <ViewportList
        viewportRef={ref}
        items={messages}
        itemMinSize={48}
        initialIndex={messages.length - 1}
      >
        {(item, index) => {
          const { messageType, date, content, id } = item
          const interlocutor = messageType === MessageType.INBOX
          const user = interlocutor && receiver ? receiver : {}
          const prevMessage = messages[index - 1]
          const displayAvatar = prevMessage
            ? prevMessage.messageType !== messageType
            : true
          const previousDateIsSame = prevMessage
            ? moment(prevMessage.date).isSame(date, "day")
            : false
          const messageDayBubble: ComponentProps<typeof MessageDayBubble> = {
            user,
            id,
            date,
            interlocutor,
            displayAvatar,
            displayDate: previousDateIsSame,
            message: content,
          }

          return <MessageDayBubble key={id} {...messageDayBubble} />
        }}
      </ViewportList>
    </MessageBubblesWrapper>
  )
}

export default ThreadDetailsMessages
