/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect } from "react"
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
  ResultState,
  Thread,
} from "App/messages/store/messages.interface"
import {
  LeadingButton,
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

export interface ThreadDetailsProps {
  thread: Thread
  onClose?: () => void
  onDeleteClick: (id: string) => void
  onUnreadStatus: (ids: string[]) => void
  onContactClick: (phoneNumber: string) => void
  onAttachContactClick: () => void
  getContact: (contactId: string) => Contact
  getMessagesByThreadId: (threadId: string) => Message[]
  loadMessagesByThreadId: (threadId: string) => Message[]
  getMessagesResultMapStateByThreadId: (threadId: string) => ResultState
  isContactCreated: (id: string) => boolean
}

const trailingIcon = [
  <Icon type={Type.Send} key={Type.Send} size={IconSize.Big} />,
]

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
}) => {
  const resultState = getMessagesResultMapStateByThreadId(thread.id)
  const messages = getMessagesByThreadId(thread.id)
  const contact = getContact(thread.contactId)
  const loadThread = () => loadMessagesByThreadId(thread.id)
  useEffect(() => {
    loadThread()
  }, [thread.id])
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
      {isContactCreated(thread.contactId) ? (
        <SidebarHeaderButton
          Icon={Type.Contact}
          onClick={handleContactClick}
          iconSize={IconSize.Big}
        />
      ) : (
        <SidebarHeaderButton
          Icon={Type.NewContact}
          onClick={handleContactClick}
          iconSize={IconSize.Big}
        />
      )}
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
      withBottomBorder
      padded={false}
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
      {process.env.NODE_ENV !== "production" && (
        <TextareaWrapper>
          <Textarea
            type="textarea"
            value={""}
            onChange={noop}
            leadingIcons={leadingIcons}
            trailingIcons={trailingIcon}
            label={intl.formatMessage({
              id: "module.messages.textAreaPlaceholder",
            })}
          />
        </TextareaWrapper>
      )}
    </MessagesSidebar>
  )
}

export default ThreadDetails
