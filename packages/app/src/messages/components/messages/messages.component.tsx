/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect, useState } from "react"
import { defineMessages } from "react-intl"
import {
  EmptyState,
  TableWithSidebarWrapper,
} from "Renderer/components/core/table/table.component"
import ThreadList from "App/messages/components/thread-list.component"
import { ComponentProps as MessagesComponentProps } from "App/messages/components/messages/messages.interface"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { noop } from "Renderer/utils/noop"
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
import {
  Contact,
  ContactCategory,
} from "App/contacts/reducers/contacts.interface"
import {
  Message,
  NewMessage,
  Receiver,
  ReceiverIdentification,
  ResultState,
  Thread,
} from "App/messages/reducers/messages.interface"
import NewMessageForm from "App/messages/components/new-message-form.component"
import { MessagesTestIds } from "App/messages/components/messages/messages-test-ids.enum"
import { mapToRawNumber } from "App/messages/helpers/map-to-raw-number"
import { PaginationBody } from "@mudita/pure"
import { PayloadAction } from "@reduxjs/toolkit"
import { IndexRange } from "react-virtualized"
import {
  CreateMessageDataResponse,
  GetMessagesBody,
} from "App/messages/services"

const messages = defineMessages({
  deleteModalTitle: { id: "module.messages.deleteModalTitle" },
  deleteModalBody: {
    id: "module.messages.deleteModalBody",
  },
  emptyListTitle: {
    id: "module.messages.emptyListTitle",
  },
  emptyListDescription: {
    id: "module.messages.emptyListDescription",
  },
})

const mockThread: Thread = {
  id: "tmpId",
  phoneNumber: "New Conversation",
  lastUpdatedAt: new Date(),
  messageSnippet: "",
  unread: false,
}

enum MessagesState {
  List,
  ThreadDetails,
  NewMessage,
}

interface Props extends MessagesComponentProps, Pick<AppSettings, "language"> {
  receivers: Receiver[]
  attachContactList: ContactCategory[]
  attachContactFlatList: Contact[]
  loadThreads: (
    pagination: PaginationBody
  ) => Promise<PayloadAction<PaginationBody | undefined>>
  getMessagesByThreadId: (threadId: string) => Message[]
  getContact: (contactId: string) => Contact | undefined
  getReceiver: (phoneNumber: string) => Receiver
  getContactByPhoneNumber: (phoneNumber: string) => Contact | undefined
  loadMessagesByThreadId: (
    body: GetMessagesBody
  ) => Promise<PayloadAction<PaginationBody | undefined>>
  getMessagesStateByThreadId: (threadId: string) => ResultState
  isContactCreatedByPhoneNumber: (phoneNumber: string) => boolean
  addNewMessage: (newMessage: NewMessage) => Promise<CreateMessageDataResponse>
}

const Messages: FunctionComponent<Props> = ({
  threadsTotalCount,
  threadsState,
  receivers,
  searchValue,
  changeSearchValue = noop,
  deleteThreads = noop,
  threads,
  getMessagesByThreadId,
  getReceiver,
  toggleReadStatus = noop,
  language,
  attachContactList,
  attachContactFlatList,
  getContactByPhoneNumber,
  isContactCreatedByPhoneNumber,
  addNewMessage,
}) => {
  const [_, setThreadsPaginationOffset] = useState<
    PaginationBody["offset"] | undefined
  >(0)

  useEffect(() => {
    if (threadsTotalCount === 0) {
      setThreadsPaginationOffset(0)
    }
  }, [threadsTotalCount])

  const [messagesState, setMessagesState] = useState(MessagesState.List)
  const [activeThread, setActiveThread] = useState<Thread | undefined>(
    findThreadBySearchParams(useURLSearchParams(), threads)
  )
  const [tmpActiveThread, setTmpActiveThread] = useState<Thread | undefined>()

  const [content, setContent] = useState("")

  const { selectedRows, allRowsSelected, toggleAll, resetRows, ...rest } =
    useTableSelect<Thread>(threads)

  const getDeletingMessage = (ids: string[]): TranslationMessage => {
    const findById = (thread: Thread) => thread.id === ids[0]
    const thread = threads.find(findById) as Thread

    return {
      ...messages.deleteModalBody,
      values: {
        caller: getPrettyCaller(
          getContactByPhoneNumber(thread.phoneNumber),
          thread.id
        ),
        num: allRowsSelected ? -1 : ids.length,
        ...textFormatters,
      },
    }
  }

  const remove = (ids: string[]) => {
    const title = intl.formatMessage(messages.deleteModalTitle)
    const message = getDeletingMessage(ids)
    const onDelete = () => {
      deleteThreads(ids)
      resetRows()
      setActiveThread(undefined)
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

  const openNewMessage = (): void => {
    setContent("")
    setActiveThread(mockThread)
    setTmpActiveThread(mockThread)
    setMessagesState(MessagesState.NewMessage)
  }

  const openThreadDetails = (thread: Thread): void => {
    setContent("")
    setActiveThread(thread)
    setTmpActiveThread(undefined)
    setMessagesState(MessagesState.ThreadDetails)
  }

  const closeSidebars = (): void => {
    setContent("")
    setActiveThread(undefined)
    setTmpActiveThread(undefined)
    setMessagesState(MessagesState.List)
  }

  const handleNewMessageClick = (): void => {
    if (
      tmpActiveThread === undefined ||
      tmpActiveThread.phoneNumber !== mockThread.phoneNumber
    ) {
      openNewMessage()
    }
  }

  const handleThreadClick = (thread: Thread): void => {
    if (activeThread?.id !== thread.id) {
      openThreadDetails(thread)
    }
  }

  const handleDeleteClick = (): void => {
    if (tmpActiveThread !== undefined) {
      closeSidebars()
    } else if (activeThread) {
      remove([activeThread.id])
    }
  }
  const handleContactClick = (): void => {
    if (activeThread) {
      history.push(
        createRouterPath(URL_MAIN.contacts, {
          phoneNumber: activeThread.phoneNumber,
        })
      )
    }
  }

  const markAsUnread = (): void => {
    if (activeThread) {
      toggleReadStatus([activeThread.id])
      closeSidebars()
    }
  }

  const handleContentChange = (content: string): void => {
    setContent((previousValue) => {
      return content.length >= 115 ? previousValue : content
    })
  }

  const handleAddNewMessage = async (phoneNumber: string): Promise<void> => {
    const threadId = threads.find(
      (thread) => thread.phoneNumber === phoneNumber
    )?.id
    await addNewMessage({ content, phoneNumber, threadId })
  }

  useEffect(() => {
    if (activeThread !== undefined) {
      const thread = threads.find(
        (thread) => thread.phoneNumber === activeThread.phoneNumber
      )
      if (thread) {
        openThreadDetails(thread)
      }
    }
  }, [activeThread, threads])

  const handleNewMessageSendClick = async (number: string) => {
    await handleAddNewMessage(number)
  }

  const handleSendClick = async () => {
    if (activeThread) {
      const phoneNumber = activeThread.phoneNumber
      await handleAddNewMessage(phoneNumber)
    }
  }

  const handleReceiverSelect = ({
    phoneNumber,
  }: Pick<Receiver, "phoneNumber">) => {
    const thread = threads.find(
      (thread) =>
        mapToRawNumber(thread.phoneNumber) === mapToRawNumber(phoneNumber)
    )

    if (thread) {
      setActiveThread(thread)
      setTmpActiveThread(undefined)
      setMessagesState(MessagesState.ThreadDetails)
    } else {
      const tmpThread: Thread = { ...mockThread, phoneNumber }
      setTmpActiveThread(tmpThread)
      setActiveThread(tmpThread)
      setMessagesState(MessagesState.ThreadDetails)
    }
  }

  const handlePhoneNumberSelect = (phoneNumber: string) => {
    handleReceiverSelect({
      phoneNumber,
    })
  }

  const getViewReceiver = (activeThread: Thread): Receiver => {
    if (activeThread.id === mockThread.id) {
      return {
        phoneNumber: activeThread.phoneNumber,
        identification: ReceiverIdentification.unknown,
      }
    }

    const receiver = getReceiver(activeThread.phoneNumber)

    if (receiver === undefined) {
      return {
        phoneNumber: "",
        identification: ReceiverIdentification.unknown,
      }
    } else {
      return receiver
    }
  }

  const getThreads = (): Thread[] => {
    if (tmpActiveThread !== undefined) {
      return [tmpActiveThread, ...threads]
    } else {
      return threads
    }
  }
  const getThreadsTotalCount = (): number => {
    if (tmpActiveThread !== undefined) {
      return threadsTotalCount + 1
    } else {
      return threadsTotalCount
    }
  }

  const loadMoreRows = async ({ startIndex }: IndexRange): Promise<void> => {
    return new Promise((resolve) => {
      if (startIndex > threads.length || threadsState === ResultState.Loading) {
        return resolve()
      }
      return resolve()
    })
  }

  return (
    <>
      <MessagesPanel
        searchValue={searchValue}
        onSearchValueChange={changeSearchValue}
        onNewMessageClick={handleNewMessageClick}
        buttonDisabled={messagesState === MessagesState.NewMessage}
      />
      <TableWithSidebarWrapper>
        {threads.length === 0 &&
        messagesState !== MessagesState.NewMessage &&
        messagesState !== MessagesState.ThreadDetails ? (
          <EmptyState
            data-testid={MessagesTestIds.EmptyThreadListState}
            title={messages.emptyListTitle}
            description={messages.emptyListDescription}
          />
        ) : (
          <ThreadList
            data-testid={MessagesTestIds.ThreadList}
            threadsTotalCount={getThreadsTotalCount()}
            language={language}
            activeThread={activeThread}
            threads={getThreads()}
            onThreadClick={handleThreadClick}
            getContactByPhoneNumber={getContactByPhoneNumber}
            onDeleteClick={removeSingleConversation}
            onToggleReadStatus={toggleReadStatus}
            onContactClick={contactClick}
            loadMoreRows={loadMoreRows}
            newConversation={mockThread.phoneNumber}
            {...rest}
          />
        )}
        {messagesState === MessagesState.ThreadDetails && activeThread && (
          <ThreadDetails
            data-testid={MessagesTestIds.ThreadDetails}
            content={content}
            receiver={getViewReceiver(activeThread)}
            messages={getMessagesByThreadId(activeThread.id)}
            contactCreated={isContactCreatedByPhoneNumber(
              activeThread.phoneNumber
            )}
            onAttachContactClick={openAttachContactModal}
            onContactClick={handleContactClick}
            onDeleteClick={handleDeleteClick}
            onCheckClick={markAsUnread}
            onClose={closeSidebars}
            onSendClick={handleSendClick}
            onContentChange={handleContentChange}
          />
        )}
        {messagesState === MessagesState.NewMessage && (
          <NewMessageForm
            data-testid={MessagesTestIds.NewMessageForm}
            content={content}
            receivers={receivers}
            onContentChange={handleContentChange}
            onSendClick={handleNewMessageSendClick}
            onPhoneNumberSelect={handlePhoneNumberSelect}
            onReceiverSelect={handleReceiverSelect}
            onClose={closeSidebars}
            onAttachContactClick={openAttachContactModal}
          />
        )}
      </TableWithSidebarWrapper>
    </>
  )
}

export default Messages
