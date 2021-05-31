/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps, useEffect, useRef } from "react"
import moment from "moment"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { MessageBubblesWrapper } from "App/messages/components/thread-details.styled"
import MessageDayBubble from "App/messages/components/message-day-bubble.component"
import { Message, MessageType } from "App/messages/store/messages.interface"
import { Contact } from "App/contacts/store/contacts.type"

interface Properties {
  messages: Message[]
  contact: Contact
}

const ThreadDetailsMessages: FunctionComponent<Properties> = ({
  messages,
  contact,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView()
    }
  }, [ref.current])

  return (
    <MessageBubblesWrapper>
      {messages.map(({ messageType, date, content, id }, index) => {
        const interlocutor = messageType === MessageType.OUTBOX
        const user = interlocutor ? contact : {}
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
