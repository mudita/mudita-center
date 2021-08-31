/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ChangeEvent, useEffect, useState } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { noop } from "Renderer/utils/noop"
import getPrettyCaller from "Renderer/models/calls/get-pretty-caller"
import { isNameAvailable } from "Renderer/components/rest/messages/is-name-available"
import { Message, NewMessage, ResultState, Thread } from "App/messages/store/messages.interface"
import { MessagesSidebar, MessagesWrapper } from "App/messages/components/thread-details.styled"
import ThreadDetailsError from "App/messages/components/thread-details-error.component"
import ThreadDetailsLoading from "App/messages/components/thread-details-loading.component"
import ThreadDetailsMessages from "App/messages/components/thread-details-messages.component"
import { Contact } from "App/contacts/store/contacts.type"
import ThreadDetailsTextArea from "App/messages/components/thread-details-text-area.component"
import ThreadDetailsRightHeader from "App/messages/components/thread-details-right-header.component"
import ThreadDetailsLeftHeader from "App/messages/components/thread-details-left-header.component"

const getCallerIdentification = (
  contact: Contact | undefined,
  number: string
): string | undefined => {
  if (Boolean(number) && contact?.secondaryPhoneNumber) {
    return number.split(" ").join("") ===
      contact.secondaryPhoneNumber.split(" ").join("")
      ? "#2"
      : "#1"
  } else {
    return undefined
  }
}


interface Props {
  thread: Thread
  onClose?: () => void
  onDeleteClick: (id: string) => void
  onUnreadStatus: (ids: string[]) => void
  onContactClick: (phoneNumber: string) => void
  onAttachContactClick: () => void
  getContact: (contactId: string) => Contact | undefined
  getMessagesByThreadId: (threadId: string) => Message[]
  loadMessagesByThreadId: (threadId: string) => Message[]
  getMessagesResultMapStateByThreadId: (threadId: string) => ResultState
  isContactCreated: (id: string) => boolean
  onAddNewMessage: (newMessage: NewMessage) => void
}

const ThreadDetails: FunctionComponent<Props> = ({
  thread,
  onClose = noop,
  onUnreadStatus,
  onDeleteClick,
  onContactClick,
  onAttachContactClick,
  getMessagesByThreadId,
  loadMessagesByThreadId,
  getContact,
  getMessagesResultMapStateByThreadId,
  isContactCreated,
  onAddNewMessage,
}) => {
  const [value, setValue] = useState("")
  const resultState = getMessagesResultMapStateByThreadId(thread.id)
  const messages = getMessagesByThreadId(thread.id)
  const contact = getContact(thread.contactId)
  const loadThread = () => loadMessagesByThreadId(thread.id)
  const handleDeleteClick = () => onDeleteClick(thread.id)
  const handleContactClick = () => onContactClick(thread.number)
  const handleTextAreaChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue((previousValue) => {
      return event.target.value.length >= 115
        ? previousValue
        : event.target.value
    })
  }

  useEffect(() => {
    loadThread()
  }, [thread.id])
  const markAsUnread = () => {
    onUnreadStatus([thread.id])
    onClose()
  }

  const handleTextAreaSendClick = () => {
    onAddNewMessage({
      number: thread.number,
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
      headerLeft={
        <ThreadDetailsLeftHeader
          prettyCaller={getPrettyCaller(contact, thread.number)}
          callerIdentification={getCallerIdentification(contact, thread.number)}
          callerNumber={isNameAvailable(contact) ? thread.number : undefined}
        />
      }
      headerRight={
        <ThreadDetailsRightHeader
          contactCreated={isContactCreated(thread.contactId)}
          onContactClick={handleContactClick}
          onDeleteClick={handleDeleteClick}
          onCheckClick={markAsUnread}
        />
      }
    >
      <MessagesWrapper>
        {resultState === ResultState.Error && (
          <ThreadDetailsError onClick={loadThread} />
        )}
        {resultState === ResultState.Loading && <ThreadDetailsLoading />}
        {resultState === ResultState.Loaded && (
          <ThreadDetailsMessages messages={messages} contact={contact} />
        )}
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

export default ThreadDetails
