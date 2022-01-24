/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps, useEffect, useRef } from "react"
import moment from "moment"
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
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView()
    }
  }, [ref.current])

  return (
    <MessageBubblesWrapper>
      {messages
        .slice(0, 100)
        .map(({ messageType, date, content, id }, index) => {
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

          if (index === messages.length - 1) {
            return (
              <div ref={ref} key={id}>
                <MessageDayBubble {...messageDayBubble} />
              </div>
            )
          } else {
            return <MessageDayBubble key={id} {...messageDayBubble} />
          }
        })}
    </MessageBubblesWrapper>
  )
}

export default ThreadDetailsMessages
