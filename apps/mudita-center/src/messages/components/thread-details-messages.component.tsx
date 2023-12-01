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
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import {
  MessageBubblesWrapper,
  BottomWrapper,
} from "App/messages/components/thread-details.styled"
import MessageDayBubble from "App/messages/components/message-day-bubble.component"
import { Receiver } from "App/messages/reducers/messages.interface"
import { Message } from "App/messages/dto"
import { MessageType } from "App/messages/constants"
import { Notification } from "App/notification/types"
import { noop } from "App/__deprecated__/renderer/utils/noop"
import NewMessageBadge from "App/messages/components/new-message-badge/new-message-badge.component"

interface Properties {
  messages: Message[]
  currentlyDeletingMessageId: string | null
  receiver?: Receiver
  messageLayoutNotifications?: Notification[]
  removeLayoutNotification?: (notificationId: string) => void
  onMessageRead?: () => void
  onMessageRemove?: (messageId: string) => void
  resendMessage?: (messageId: string) => void
  selectedMessage: Message | null
  searchQuery: string
}

const ThreadDetailsMessages: FunctionComponent<Properties> = ({
  messages,
  currentlyDeletingMessageId,
  receiver,
  messageLayoutNotifications,
  removeLayoutNotification = noop,
  onMessageRead = noop,
  onMessageRemove = noop,
  resendMessage,
  selectedMessage,
  searchQuery,
}) => {
  const wrapperBottomRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [onBottom, setOnBottom] = useState<boolean>(false)
  const prevMessages = useRef({ messages }).current
  const messageIndex =
    selectedMessage &&
    messages.findIndex((message) => message.id === selectedMessage.id)

  const scrollToBottom = () => {
    wrapperRef.current?.scrollIntoView({
      behavior: "auto",
      block: "end",
    })
  }

  useEffect(() => {
    scrollToBottom()
  }, [])

  useEffect(() => {
    if (
      prevMessages.messages.length < messages.length &&
      messages[messages.length - 1]?.messageType === MessageType.QUEUED
    ) {
      scrollToBottom()
    }

    return () => {
      prevMessages.messages = messages
    }
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages])

  const isMessageIncomingWhileScrollOnBottom = (): boolean => {
    return (
      onBottom &&
      prevMessages.messages.length < messages.length &&
      messages[messages.length - 1]?.messageType === MessageType.INBOX
    )
  }

  const closeNewMessageBadge = useCallback(() => {
    if (isMessageIncomingWhileScrollOnBottom()) {
      // when the application will stop supporting `messages.observer` than this condition is to remove
      onMessageRead()
    }

    const notificationOnThread = messageLayoutNotifications?.find(
      (item) =>
        (item.content as Message)?.threadId === messages[0]?.threadId &&
        (item.content as Message)?.messageType === MessageType.INBOX
    )
    if (notificationOnThread) {
      removeLayoutNotification(notificationOnThread.id)
      onMessageRead()
    }
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messageLayoutNotifications])

  const handleNotificationButtonClick = () => {
    scrollToBottom()
    closeNewMessageBadge()
  }

  let observer: IntersectionObserver

  const callback = (entries: IntersectionObserverEntry[]) => {
    // notification when user during scroll
    const isIntersecting = entries[0].isIntersecting
    setOnBottom(isIntersecting)

    if (isIntersecting) {
      closeNewMessageBadge()
    }
  }

  useEffect(() => {
    // notification when user in bottom
    if (isMessageIncomingWhileScrollOnBottom()) {
      closeNewMessageBadge()
    }
    return () => {
      prevMessages.messages = messages
    }
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages, onBottom])

  useEffect(() => {
    const currentNotifications = messageLayoutNotifications?.filter(
      (item) =>
        (item.content as Message)?.threadId === messages[0]?.threadId &&
        (item.content as Message)?.messageType === MessageType.INBOX
    )
    setNotifications(currentNotifications ? currentNotifications : [])
    if (!wrapperBottomRef.current) {
      return
    }

    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    observer = new IntersectionObserver(callback, {
      rootMargin: "150px",
      threshold: 1.0,
    })

    observer.observe(wrapperBottomRef.current)

    return () => {
      if (wrapperBottomRef.current) {
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(wrapperBottomRef.current)
      }
    }
  }, [wrapperBottomRef, messageLayoutNotifications])

  return (
    <MessageBubblesWrapper ref={wrapperRef}>
      {notifications.length > 0 && !onBottom && (
        <NewMessageBadge
          onClose={closeNewMessageBadge}
          messagesCount={notifications.length}
          onClick={handleNotificationButtonClick}
        />
      )}
      <ViewportList
        viewportRef={wrapperRef}
        items={messages}
        itemMinSize={32}
        margin={28}
        initialIndex={messageIndex ? messageIndex : messages.length - 1}
        overscan={5}
      >
        {(item, index) => {
          const { messageType, date, content, id } = item
          const interlocutor = messageType === MessageType.INBOX
          const isMessageBeingDeleted = id === currentlyDeletingMessageId
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
            messageType,
            removeMessage: onMessageRemove,
            isMessageBeingDeleted,
            resendMessage,
            searchQuery,
            selected: selectedMessage?.id === id,
          }

          return <MessageDayBubble key={id} {...messageDayBubble} />
        }}
      </ViewportList>
      <BottomWrapper ref={wrapperBottomRef} />
    </MessageBubblesWrapper>
  )
}

export default ThreadDetailsMessages
