/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect, useRef } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { MessageBubblesWrapper } from "App/messages/components/thread-details.styled"
import MessageBubble from "App/messages/components/message-bubble.component"
import { Message, MessageType } from "App/messages/store/messages.interface"
import { Contact } from "App/contacts/store/contacts.type"

interface Properties {
  messages: Message[]
  getContact: (contactId: string) => Contact
}

const ThreadDetailsMessages: FunctionComponent<Properties> = ({
  messages,
  getContact,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView()
    }
  }, [ref.current])

  return (
    <MessageBubblesWrapper>
      {messages.map(({ contactId, content, messageType, id }, index) => {
        const prevMessage = messages[index - 1]
        const previousAuthor = prevMessage?.contactId !== contactId
        if (index === messages.length - 1) {
          return (
            <div ref={ref} key={id}>
              <MessageBubble
                id={id}
                user={getContact(contactId)}
                message={content}
                interlocutor={messageType === MessageType.OUTBOX}
                previousAuthor={previousAuthor}
              />
            </div>
          )
        }
        return (
          <MessageBubble
            key={id}
            id={id}
            user={getContact(contactId)}
            message={content}
            interlocutor={messageType === MessageType.OUTBOX}
            previousAuthor={previousAuthor}
          />
        )
      })}
    </MessageBubblesWrapper>
  )
}

export default ThreadDetailsMessages
