/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, {
  ComponentProps,
  useRef,
  useEffect,
  useState,
  useCallback,
} from "react"
import moment from "moment"
import ViewportList from "react-viewport-list"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { MessageBubblesWrapper } from "App/messages/components/thread-details.styled"
import MessageDayBubble from "App/messages/components/message-day-bubble.component"
import {
  Message,
  MessageType,
  Receiver,
} from "App/messages/reducers/messages.interface"
import NewMessageBadge from "App/messages/components/new-message-badge.component"
import { Notification } from "App/notification/types"
import { noop } from "Renderer/utils/noop"

interface Properties {
  messages: Message[]
  receiver?: Receiver
  messageLayoutNotifications?: Notification[]
  removeLayoutNotification?: (notificationId: string) => void
  onMessageRead?: () => void
}

const ThreadDetailsMessages: FunctionComponent<Properties> = ({
  messages,
  receiver,
  messageLayoutNotifications,
  removeLayoutNotification = noop,
  onMessageRead = noop,
}) => {
  const wrapperBottomRef = useRef<HTMLDivElement>(null)
  const ref = useRef<HTMLDivElement>(null)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [onBottom, setOnBottom] = useState<boolean>(false)
  const prevMessages = useRef({ messages }).current

  useEffect(() => {
    if (
      prevMessages.messages.length < messages.length &&
      messages[messages.length - 1].messageType === MessageType.OUTBOX
    ) {
      wrapperBottomRef.current &&
        wrapperBottomRef.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
        })
    }

    return () => {
      prevMessages.messages = messages
    }
  }, [messages])

  const closeNewMessageBadge = useCallback(() => {
    const notificationOnThread = messageLayoutNotifications?.find(
      (item) =>
        (item.content as Message)?.threadId === messages[0].threadId &&
        (item.content as Message)?.messageType === MessageType.INBOX
    )
    if (notificationOnThread) {
      removeLayoutNotification(notificationOnThread.id)
      onMessageRead()
    }
  }, [messageLayoutNotifications])

  const handleNotificationButtonClick = () => {
    wrapperBottomRef.current &&
      wrapperBottomRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      })
    closeNewMessageBadge()
  }

  let observer: IntersectionObserver

  const callback = (entries: IntersectionObserverEntry[]) => {
    // notification when user during scroll
    setOnBottom(entries[0].isIntersecting)
    if (entries[0] && entries[0].isIntersecting) {
      closeNewMessageBadge()
    }
  }

  useEffect(() => {
    // notification when user in bottom
    if (
      onBottom &&
      prevMessages.messages.length < messages.length &&
      messages[messages.length - 1].messageType === MessageType.INBOX
    ) {
      onMessageRead()
    }
    return () => {
      prevMessages.messages = messages
    }
  }, [messages, onBottom])

  useEffect(() => {
    const currentNotifications = messageLayoutNotifications?.filter(
      (item) =>
        (item.content as Message)?.threadId === messages[0].threadId &&
        (item.content as Message)?.messageType === MessageType.INBOX
    )
    setNotifications(currentNotifications ? currentNotifications : [])
    if (!wrapperBottomRef.current) {
      return
    }

    observer = new IntersectionObserver(callback, {
      rootMargin: "150px",
      threshold: 1.0,
    })

    observer.observe(wrapperBottomRef.current)

    return () => {
      if (wrapperBottomRef.current) {
        observer.unobserve(wrapperBottomRef.current)
      }
    }
  }, [wrapperBottomRef, messageLayoutNotifications])

  return (
    <MessageBubblesWrapper ref={ref}>
      {notifications.length > 0 && (
        <NewMessageBadge
          onClose={closeNewMessageBadge}
          messagesCount={notifications.length}
          onClick={handleNotificationButtonClick}
        />
      )}
      <ViewportList
        viewportRef={ref}
        items={messages}
        itemMinSize={32}
        margin={28}
        initialIndex={messages.length - 1}
        overscan={5}
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
      <div ref={wrapperBottomRef}></div>
    </MessageBubblesWrapper>
  )
}

export default ThreadDetailsMessages
