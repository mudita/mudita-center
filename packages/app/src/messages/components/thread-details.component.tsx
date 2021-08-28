/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { SidebarHeaderButton } from "Renderer/components/core/table/table.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import { noop } from "Renderer/utils/noop"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import Icon, { IconSize } from "Renderer/components/core/icon/icon.component"
import getPrettyCaller from "Renderer/models/calls/get-pretty-caller"
import { isNameAvailable } from "Renderer/components/rest/messages/is-name-available"
import { intl } from "Renderer/utils/intl"
import {
  Message,
  NewMessage,
  ResultState,
  Thread,
} from "App/messages/store/messages.interface"
import {
  IconButton,
  MessagesSidebar,
  MessagesWrapper,
  NameWrapper,
  PhoneNumberText,
  Textarea,
  TextareaWrapper,
} from "App/messages/components/thread-details.styled"
import ThreadDetailsError from "App/messages/components/thread-details-error.component"
import ThreadDetailsLoading from "App/messages/components/thread-details-loading.component"
import ThreadDetailsMessages from "App/messages/components/thread-details-messages.component"
import { Contact } from "App/contacts/store/contacts.type"

const production = process.env.NODE_ENV === "production"

interface ThreadDetailsLeftHeaderProps {
  prettyCaller: string
  callerIdentification?: string
  callerNumber?: string
}

const ThreadDetailsLeftHeader: FunctionComponent<ThreadDetailsLeftHeaderProps> =
  ({ prettyCaller, callerIdentification = "", callerNumber = "" }) => {
    return (
      <>
        <NameWrapper>
          <Text
            displayStyle={TextDisplayStyle.LargeBoldText}
            data-testid="sidebar-fullname"
          >
            {prettyCaller}
          </Text>
          {callerIdentification !== "" && (
            <Text
              displayStyle={TextDisplayStyle.LargeFadedText}
              data-testid="multiple-number"
            >
              &nbsp;
              {callerIdentification}
            </Text>
          )}
        </NameWrapper>
        {callerNumber !== "" && (
          <PhoneNumberText
            displayStyle={TextDisplayStyle.MediumFadedLightText}
            data-testid="sidebar-phone-number"
          >
            {callerNumber}
          </PhoneNumberText>
        )}
      </>
    )
  }

interface ThreadDetailsRightHeaderProps {
  contactCreated: boolean
  onContactClick: () => void
  onDeleteClick: () => void
  onCheckClick: () => void
}

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

const ThreadDetailsRightHeader: FunctionComponent<ThreadDetailsRightHeaderProps> =
  ({ contactCreated, onContactClick, onDeleteClick, onCheckClick }) => {
    return (
      <>
        {!production && (
          <SidebarHeaderButton
            Icon={Type.Calls}
            onClick={noop}
            iconSize={IconSize.Big}
          />
        )}
        {contactCreated ? (
          <SidebarHeaderButton
            Icon={Type.Contact}
            onClick={onContactClick}
            iconSize={IconSize.Big}
          />
        ) : (
          <SidebarHeaderButton
            Icon={Type.NewContact}
            onClick={onContactClick}
            iconSize={IconSize.Big}
          />
        )}
        {/* TODO: turn on in https://appnroll.atlassian.net/browse/PDA-802 */}
        {!production && (
          <>
            <SidebarHeaderButton
              Icon={Type.BorderCheckIcon}
              onClick={onCheckClick}
              iconSize={IconSize.Big}
            />
            <SidebarHeaderButton
              Icon={Type.Delete}
              onClick={onDeleteClick}
              iconSize={IconSize.Big}
            />
          </>
        )}
      </>
    )
  }

interface ThreadDetailsTextAreaProps {
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  onSendClick: () => void
  onAttachContactClick: () => void
}

const ThreadDetailsTextArea: FunctionComponent<ThreadDetailsTextAreaProps> = ({
  value,
  onSendClick,
  onChange,
  onAttachContactClick,
}) => {
  const leadingIcons = [
    !production && (
      <IconButton
        key={Type.AttachContact}
        Icon={Type.AttachContact}
        onClick={onAttachContactClick}
      />
    ),
    !production && (
      <Icon type={Type.Template} key={Type.Template} size={IconSize.Big} />
    ),
  ]
  const trailingIcon = [
    value.length > 0 && (
      <IconButton key={Type.Send} Icon={Type.Send} onClick={onSendClick} />
    ),
  ]

  const handleKeyDown = (event: KeyboardEvent): void => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      onSendClick()
    }
  }

  return (
    <TextareaWrapper>
      <Textarea
        type="textarea"
        value={value}
        leadingIcons={leadingIcons}
        trailingIcons={trailingIcon}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        label={intl.formatMessage({
          id: "module.messages.textAreaPlaceholder",
        })}
      />
    </TextareaWrapper>
  )
}

export interface ThreadDetailsProps {
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

const ThreadDetails: FunctionComponent<ThreadDetailsProps> = ({
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
