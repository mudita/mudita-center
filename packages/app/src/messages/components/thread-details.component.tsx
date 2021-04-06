/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect, useRef } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { SidebarHeaderButton } from "Renderer/components/core/table/table.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import { noop } from "Renderer/utils/noop"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import Icon, { IconSize } from "Renderer/components/core/icon/icon.component"
import MessageBubble from "App/messages/components/message-bubble.component"
import getPrettyCaller from "Renderer/models/calls/get-pretty-caller"
import { isNameAvailable } from "Renderer/components/rest/messages/is-name-available"
import { intl } from "Renderer/utils/intl"
import {
  Message,
  MessageType,
  ResultState,
  Thread,
} from "App/messages/store/messages.interface"
import { Contact } from "App/contacts/store/contacts.type"
import { LoaderType } from "Renderer/components/core/loader/loader.interface"
import Loader from "Renderer/components/core/loader/loader.component"
import { ThreadDetailsTestIds } from "App/messages/components/thread-details-test-ids.enum"
import { defineMessages } from "react-intl"
import {
  LeadingButton,
  Content,
  MessageBubblesWrapper,
  MessagesSidebar,
  MessagesWrapper,
  NameWrapper,
  PhoneNumberText,
  Textarea,
  TextareaWrapper,
  ColumnContent,
  RetryButton,
} from "App/messages/components/thread-details.styled"
import { DisplayStyle } from "Renderer/components/core/button/button.config"

export interface ThreadDetailsProps {
  thread: Thread
  onClose?: () => void
  onDeleteClick: (id: string) => void
  onUnreadStatus: (ids: string[]) => void
  onContactClick: (phoneNumber: string) => void
  onAttachContactClick: () => void
  getMessagesByThreadId: (threadId: string) => Message[]
  getContact: (contactId: string) => Contact
  loadMessagesByThreadId: (threadId: string) => Message[]
  getMessagesResultMapStateByThreadId: (threadId: string) => ResultState
}

const trailingIcon = [
  <Icon type={Type.Send} key={Type.Send} size={IconSize.Big} />,
]

const translations = defineMessages({
  errorText: {
    id: "view.name.messages.modal.loadingThreadError.body",
  },
  tryAgainButtonText: { id: "component.modal.data.errorWithRetry.button" },
})

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
}) => {
  const resultState = getMessagesResultMapStateByThreadId(thread.id)
  const messages = getMessagesByThreadId(thread.id)
  const contact = getContact(thread.contactId)
  const loadThread = () => loadMessagesByThreadId(thread.id)
  useEffect(() => {
    loadThread()
  }, [thread.id])
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView()
    }
  }, [ref.current])
  const markAsUnread = () => {
    onUnreadStatus([thread.id])
    onClose()
  }
  const handleDeleteClick = () => onDeleteClick(thread.id)
  const handleContactClick = () => onContactClick(thread.id)
  const icons = (
    <>
      {process.env.NODE_ENV !== "production" && (
        <SidebarHeaderButton
          Icon={Type.Calls}
          onClick={noop}
          iconSize={IconSize.Big}
        />
      )}
      <SidebarHeaderButton
        Icon={Type.Contact}
        onClick={handleContactClick}
        iconSize={IconSize.Big}
      />
      {/* TODO: turn on in https://appnroll.atlassian.net/browse/PDA-802 */}
      {process.env.NODE_ENV !== "production" && (
        <>
          <SidebarHeaderButton
            Icon={Type.BorderCheckIcon}
            onClick={markAsUnread}
            iconSize={IconSize.Big}
          />
          <SidebarHeaderButton
            Icon={Type.Delete}
            onClick={handleDeleteClick}
            iconSize={IconSize.Big}
          />
        </>
      )}
    </>
  )

  const leadingIcons = [
    <LeadingButton
      key={Type.AttachContact}
      Icon={Type.AttachContact}
      onClick={onAttachContactClick}
    />,
    <Icon type={Type.Template} key={Type.Template} size={IconSize.Big} />,
  ]

  return (
    <MessagesSidebar
      show
      headerLeft={
        <>
          <NameWrapper>
            <Text
              displayStyle={TextDisplayStyle.LargeBoldText}
              data-testid="sidebar-fullname"
            >
              {getPrettyCaller(contact, thread.id)}
            </Text>
            {Boolean(thread.id && contact?.secondaryPhoneNumber) && (
              <Text
                displayStyle={TextDisplayStyle.LargeFadedText}
                data-testid="multiple-number"
              >
                &nbsp;
                {thread.id.split(" ").join("") ===
                contact.secondaryPhoneNumber?.split(" ").join("")
                  ? "#2"
                  : "#1"}
              </Text>
            )}
          </NameWrapper>
          {isNameAvailable(contact) && (
            <PhoneNumberText
              displayStyle={TextDisplayStyle.MediumFadedLightText}
              data-testid="sidebar-phone-number"
            >
              {thread.id}
            </PhoneNumberText>
          )}
        </>
      }
      headerRight={icons}
      onClose={onClose}
      appColorSidebarHeader
      padded={false}
    >
      <MessagesWrapper>
        {resultState === ResultState.Error && (
          <ColumnContent>
            <Text
              displayStyle={TextDisplayStyle.LargeFadedText}
              message={translations.errorText}
              data-testid={ThreadDetailsTestIds.ErrorText}
            />
            <RetryButton
              displayStyle={DisplayStyle.Primary}
              labelMessage={translations.tryAgainButtonText}
              onClick={loadThread}
              data-testid={ThreadDetailsTestIds.RetryButton}
            />
          </ColumnContent>
        )}
        {resultState === ResultState.Loading && (
          <Content>
            <Loader
              size={4}
              type={LoaderType.Spinner}
              data-testid={ThreadDetailsTestIds.Loader}
            />
          </Content>
        )}
        {resultState === ResultState.Loaded && (
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
        )}
      </MessagesWrapper>
      {process.env.NODE_ENV !== "production" && (
        <TextareaWrapper>
          <Textarea
            type="textarea"
            value={""}
            onChange={noop}
            leadingIcons={leadingIcons}
            trailingIcons={trailingIcon}
            label={intl.formatMessage({
              id: "view.name.messages.textAreaPlaceholder",
            })}
          />
        </TextareaWrapper>
      )}
    </MessagesSidebar>
  )
}

export default ThreadDetails
