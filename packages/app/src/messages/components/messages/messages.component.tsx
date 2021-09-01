/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect, useState } from "react"
import { defineMessages } from "react-intl"
import { TableWithSidebarWrapper } from "Renderer/components/core/table/table.component"
import ThreadList from "App/messages/components/thread-list.component"
import { ComponentProps as MessagesComponentProps } from "App/messages/components/messages/messages.interface"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { noop } from "Renderer/utils/noop"
import useTableSidebar from "Renderer/utils/hooks/use-table-sidebar"
import ThreadDetails from "App/messages/components/thread-details.component"
import MessagesPanel from "App/messages/components/messages-panel.component"
import useTableSelect from "Renderer/utils/hooks/useTableSelect"
import useURLSearchParams from "Renderer/utils/hooks/use-url-search-params"
import findThreadBySearchParams from "App/messages/components/find-thread-by-search-params"
import { intl, textFormatters } from "Renderer/utils/intl"
import modalService from "Renderer/components/core/modal/modal.service"
import DeleteModal from "Renderer/components/core/modal/delete-modal.component"
import { Message as TranslationMessage } from "Renderer/interfaces/message.interface"
import getPrettyCaller from "Renderer/models/calls/get-pretty-caller"
import { AppSettings } from "App/main/store/settings.interface"
import { useHistory } from "react-router-dom"
import createRouterPath from "Renderer/utils/create-router-path"
import { URL_MAIN } from "Renderer/constants/urls"
import AttachContactModal from "App/messages/components/attach-contact-modal.component"
import { Contact } from "App/contacts/store/contacts.type"
import { ContactCategory } from "App/contacts/store/contacts.interface"
import {
  Thread,
  NewMessage,
  ResultState,
} from "App/messages/store/messages.interface"
import { Message } from "App/messages/store/messages.interface"
import NewMessageForm from "App/messages/components/new-message-form.component"
import { MessagesTestIds } from "App/messages/components/messages/messages-test-ids.enum"

const deleteModalMessages = defineMessages({
  title: { id: "module.messages.deleteModalTitle" },
  body: {
    id: "module.messages.deleteModalBody",
  },
})

enum MessagesState {
  List,
  ThreadDetails,
  NewMessage,
}

interface Props extends MessagesComponentProps, Pick<AppSettings, "language"> {
  attachContactList: ContactCategory[]
  attachContactFlatList: Contact[]
  getMessagesByThreadId: (threadId: string) => Message[]
  getContact: (contactId: string) => Contact
  loadMessagesByThreadId: (threadId: string) => Message[]
  getMessagesResultMapStateByThreadId: (threadId: string) => ResultState
  isContactCreated: (id: string) => boolean
  addNewMessage: (newMessage: NewMessage) => Promise<void>
}

const Messages: FunctionComponent<Props> = ({
  searchValue,
  changeSearchValue = noop,
  deleteThreads = noop,
  threads,
  getMessagesByThreadId,
  getContact,
  toggleReadStatus = noop,
  language,
  attachContactList,
  attachContactFlatList,
  loadMessagesByThreadId,
  getMessagesResultMapStateByThreadId,
  isContactCreated,
  addNewMessage,
}) => {
  const [messagesState, setMessagesState] = useState(MessagesState.List)
  const {
    openSidebar,
    closeSidebar,
    activeRow: activeThread,
  } = useTableSidebar<Thread>(
    findThreadBySearchParams(useURLSearchParams(), threads)
  )

  useEffect(() => {
    if (
      messagesState == MessagesState.ThreadDetails &&
      activeThread === undefined
    ) {
      setMessagesState(MessagesState.List)
    } else if (
      messagesState !== MessagesState.ThreadDetails &&
      activeThread !== undefined
    ) {
      setMessagesState(MessagesState.ThreadDetails)
    }
  }, [activeThread])

  const { selectedRows, allRowsSelected, toggleAll, resetRows, ...rest } =
    useTableSelect<Thread>(threads)

  const getDeletingMessage = (ids: string[]): TranslationMessage => {
    const findById = (thread: Thread) => thread.id === ids[0]
    const thread = threads.find(findById) as Thread

    return {
      ...deleteModalMessages.body,
      values: {
        caller: getPrettyCaller(getContact(thread.contactId), thread.id),
        num: allRowsSelected ? -1 : ids.length,
        ...textFormatters,
      },
    }
  }

  const remove = (ids: string[]) => {
    const title = intl.formatMessage(deleteModalMessages.title)
    const message = getDeletingMessage(ids)
    const onDelete = () => {
      deleteThreads(ids)
      resetRows()
      closeSidebar()
      modalService.closeModal()
    }

    modalService.openModal(
      <DeleteModal
        title={title}
        message={message}
        onClose={resetRows}
        onDelete={onDelete}
      />
    )
  }

  const removeSingleConversation = (id: string) => remove([id])

  const history = useHistory()

  const contactClick = (phoneNumber: string) => {
    history.push(
      createRouterPath(URL_MAIN.contacts, {
        phoneNumber,
      })
    )
  }

  const openAttachContactModal = () => {
    modalService.openModal(
      <AttachContactModal
        contactFlatList={attachContactFlatList}
        contactList={attachContactList}
      />,
      true
    )
  }

  const handleAddNewMessage = async (newMessage: NewMessage) => {
    await addNewMessage(newMessage)
  }

  const handleNewMessageClick = () => {
    closeSidebar()
    setMessagesState(MessagesState.NewMessage)
  }

  const handleNewMessageFormClose = () => {
    setMessagesState(MessagesState.List)
  }

  const handleThreadDetailsClose = () => {
    closeSidebar()
    if (messagesState === MessagesState.ThreadDetails) {
      setMessagesState(MessagesState.List)
    }
  }

  return (
    <>
      <MessagesPanel
        searchValue={searchValue}
        onSearchValueChange={changeSearchValue}
        onNewMessageClick={handleNewMessageClick}
      />
      <TableWithSidebarWrapper>
        <ThreadList
          threads={threads}
          openSidebar={openSidebar}
          activeThread={activeThread}
          getContact={getContact}
          onDeleteClick={removeSingleConversation}
          onToggleReadStatus={toggleReadStatus}
          onContactClick={contactClick}
          isContactCreated={isContactCreated}
          language={language}
          {...rest}
        />
        {messagesState === MessagesState.ThreadDetails && activeThread && (
          <ThreadDetails
            data-testid={MessagesTestIds.ThreadDetails}
            onDeleteClick={removeSingleConversation}
            onUnreadStatus={toggleReadStatus}
            getMessagesByThreadId={getMessagesByThreadId}
            getContact={getContact}
            loadMessagesByThreadId={loadMessagesByThreadId}
            getMessagesResultMapStateByThreadId={
              getMessagesResultMapStateByThreadId
            }
            thread={activeThread}
            onClose={handleThreadDetailsClose}
            onContactClick={contactClick}
            onAttachContactClick={openAttachContactModal}
            isContactCreated={isContactCreated}
            onAddNewMessage={handleAddNewMessage}
          />
        )}
        {messagesState === MessagesState.NewMessage && (
          <NewMessageForm
            data-testid={MessagesTestIds.NewMessageForm}
            onClose={handleNewMessageFormClose}
            onAttachContactClick={openAttachContactModal}
            onAddNewMessage={handleAddNewMessage}
          />
        )}
      </TableWithSidebarWrapper>
    </>
  )
}

export default Messages
