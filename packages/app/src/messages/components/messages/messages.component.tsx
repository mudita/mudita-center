/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import DeleteMessageModals from "App/messages/components/delete-message-modals/delete-message-modals.component"
import DeleteThreadModals from "App/messages/components/delete-thread-modals/delete-thread-modals.component"
import findThreadBySearchParams from "App/messages/components/find-thread-by-search-params"
import MessagesPanel from "App/messages/components/messages-panel.component"
import { MessagesTestIds } from "App/messages/components/messages/messages-test-ids.enum"
import NewMessageForm from "App/messages/components/new-message-form.component"
import ThreadDetails from "App/messages/components/thread-details.component"
import ThreadList from "App/messages/components/thread-list.component"
import {
  MessageDeletingState,
  MessageType,
  ResultState,
  ThreadDeletingState,
} from "App/messages/constants"
import { Message, Thread } from "App/messages/dto"
import { Receiver, ReceiverIdentification } from "App/messages/reducers"
import DeleteModal from "App/__deprecated__/renderer/components/core/modal/delete-modal.component"
import modalService from "App/__deprecated__/renderer/components/core/modal/modal.service"
import {
  EmptyState,
  TableWithSidebarWrapper,
} from "App/__deprecated__/renderer/components/core/table/table.component"
import { URL_MAIN } from "App/__deprecated__/renderer/constants/urls"
import { MessagesProps } from "App/messages/components/messages/messages.interface"
import { Message as TranslationMessage } from "App/__deprecated__/renderer/interfaces/message.interface"
import getPrettyCaller from "App/__deprecated__/renderer/models/calls/get-pretty-caller"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import createRouterPath from "App/__deprecated__/renderer/utils/create-router-path"
import useURLSearchParams from "App/__deprecated__/renderer/utils/hooks/use-url-search-params"
import useTableSelect from "App/__deprecated__/renderer/utils/hooks/useTableSelect"
import { intl, textFormatters } from "App/__deprecated__/renderer/utils/intl"
import { noop } from "App/__deprecated__/renderer/utils/noop"
import assert from "assert"
import React, { useEffect, useState } from "react"
import { defineMessages } from "react-intl"
import { useHistory } from "react-router-dom"
import { IndexRange } from "react-virtualized"
import { isThreadNumberEqual } from "App/messages/components/messages/is-thread-number-equal.helper"
import { ContactSelectModal } from "App/contacts"
import { TemplatesSelectModal } from "App/templates/components/templates-select-modal/templates-select-modal.component"
import { Template } from "App/templates/dto"
import { Contact } from "App/contacts/dto"
import { ContactAttachmentPresenter } from "App/contacts/presenters"

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

const contactsModalMessages = defineMessages({
  attachContactModalTitle: { id: "module.messages.attachContactModalTitle" },
  browseContactsModalTitle: { id: "module.messages.browseContactsModalTitle" },
})

const mockThread: Thread = {
  id: "tmpId",
  phoneNumber: "New Conversation",
  lastUpdatedAt: new Date(),
  messageSnippet: "",
  unread: false,
  messageType: MessageType.OUTBOX,
}

const isMockedThreadUsedForNewMessageForm = (thread: Thread) => {
  return thread.id === mockThread.id
}

enum MessagesState {
  List,
  ThreadDetails,
  NewMessage,
}

const hideSuccessPopupAfterTimeInMs = 5000

const Messages: FunctionComponent<MessagesProps> = ({
  threadsState,
  receivers,
  searchValue,
  changeSearchValue = noop,
  deleteThreads = noop,
  threads,
  getMessagesByThreadId,
  getReceiver,
  toggleReadStatus = noop,
  markThreadsReadStatus = noop,
  language,
  getContactByPhoneNumber,
  isContactCreatedByPhoneNumber,
  addNewMessage,
  deleteMessage,
  messageLayoutNotifications,
  removeLayoutNotification,
  threadDeletingState,
  hideDeleteModal,
  hideMessageDeleteModal,
  messageDeletingState,
  currentlyDeletingMessageId,
  resendMessage,
  templates,
}) => {
  // TODO [CP-1401] move component logic to custom hook

  useEffect(() => {
    messageLayoutNotifications
      .filter(
        (item) => (item.content as Message)?.messageType === MessageType.OUTBOX
      )
      .forEach((item) => {
        removeLayoutNotification(item.id)
      })
  }, [messageLayoutNotifications])

  const [deleteMessageModalOpen, setDeleteMessageModalOpen] =
    useState<boolean>(false)
  const [showAttachContactModal, setShowAttachContactModal] =
    useState<boolean>(false)
  const [showBrowseContactModal, setShowBrowseContactModal] =
    useState<boolean>(false)

  const [showAttachTemplateModal, setShowAttachTemplateModal] =
    useState<boolean>(false)

  const [messagesState, setMessagesState] = useState(MessagesState.List)
  const [activeThread, setActiveThread] = useState<Thread | undefined>(
    findThreadBySearchParams(useURLSearchParams(), threads)
  )
  const [tmpActiveThread, setTmpActiveThread] = useState<Thread | undefined>()

  const [content, setContent] = useState("")

  const { selectedRows, allRowsSelected, toggleAll, resetRows, ...rest } =
    useTableSelect<Thread>(threads)

  const [messageToDelete, setMessageToDelete] = useState<string | undefined>()
  const [deletedThreads, setDeletedThreads] = useState<string[]>([])

  useEffect(() => {
    if (messageDeletingState === MessageDeletingState.Success) {
      const timeout = setTimeout(() => {
        hideMessageDeleteModal()
      }, hideSuccessPopupAfterTimeInMs)
      return () => clearTimeout(timeout)
    }

    if (threadDeletingState === ThreadDeletingState.Success) {
      const timeout = setTimeout(() => {
        hideDeleteModal()
        setDeletedThreads([])
      }, hideSuccessPopupAfterTimeInMs)
      return () => clearTimeout(timeout)
    }
    return
  }, [threadDeletingState, messageDeletingState])

  useEffect(() => {
    handlePotentialThreadDeletion()
  }, [threads])

  const handlePotentialThreadDeletion = () => {
    const isThreadInThreadsList = (thread: Thread) => {
      return threads.find((item) => item.id === thread.id)
    }

    if (
      activeThread &&
      !isMockedThreadUsedForNewMessageForm(activeThread) &&
      !isThreadInThreadsList(activeThread)
    ) {
      setMessagesState(MessagesState.List)
      setActiveThread(undefined)
    }
  }

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
      setDeletedThreads(ids)
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
    setShowAttachContactModal(true)
  }

  const closeAttachContactModal = () => {
    setShowAttachContactModal(false)
  }

  const openBrowseContactModal = () => {
    setShowBrowseContactModal(true)
  }

  const closeBrowseContactModal = () => {
    setShowBrowseContactModal(false)
  }

  const openAttachTemplateModal = () => {
    setShowAttachTemplateModal(true)
  }

  const closeAttachTemplateModal = () => {
    setShowAttachTemplateModal(false)
  }

  const handleBrowseContactSelection = (contact: Contact | null): void => {
    if (!contact) {
      return
    }

    if (contact.primaryPhoneNumber) {
      handlePhoneNumberSelect(contact.primaryPhoneNumber)
    } else if (contact.secondaryPhoneNumber) {
      handlePhoneNumberSelect(contact.secondaryPhoneNumber)
    }

    setShowBrowseContactModal(false)
  }

  const handleBrowsePhoneNumberSelection = (phoneNumber: string): void => {
    handlePhoneNumberSelect(phoneNumber)
    setShowBrowseContactModal(false)
  }

  const handleContactAttach = (contact: Contact | null): void => {
    if (!contact) {
      return
    }

    setShowAttachContactModal(false)
    setContent(ContactAttachmentPresenter.toAttachment(contact))
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
      markThreadsReadStatus([thread])
    }
  }

  const handleDeleteClick = (): void => {
    if (tmpActiveThread !== undefined) {
      closeSidebars()
    } else if (activeThread) {
      remove([activeThread.id])
    }
  }

  const handleDeleteSelected = (): void => {
    const ids = selectedRows.map((thread) => thread.id)
    remove(ids)
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
      toggleReadStatus([activeThread])
      closeSidebars()
    }
  }

  const markAsRead = (): void => {
    if (activeThread) {
      markThreadsReadStatus([activeThread])
    }
  }

  const handleContentChange = (content: string): void => {
    setContent(content)
  }

  const handleAddNewMessage = async (phoneNumber: string): Promise<void> => {
    const threadId = threads.find(isThreadNumberEqual(phoneNumber))?.id
    if (tmpActiveThread !== undefined) {
      handleReceiverSelect({ phoneNumber })
    }
    await addNewMessage({ content, phoneNumber, threadId })
    setContent("")
  }

  useEffect(() => {
    if (activeThread === undefined) {
      return
    }
    const thread = threads.find(isThreadNumberEqual(activeThread.phoneNumber))

    if (activeThread.id === thread?.id) {
      return
    } else if (thread) {
      openThreadDetails(thread)
    } else if (tmpActiveThread === undefined && thread === undefined) {
      setActiveThread(undefined)
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
    const thread = threads.find(isThreadNumberEqual(phoneNumber))

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

  const loadMoreRows = async ({ startIndex }: IndexRange): Promise<void> => {
    return new Promise((resolve) => {
      if (startIndex > threads.length || threadsState === ResultState.Loading) {
        return resolve()
      }
      return resolve()
    })
  }

  const handleDeleteMessage = () => {
    assert(messageToDelete)
    deleteMessage(messageToDelete)
    setDeleteMessageModalOpen(false)
    setMessageToDelete(undefined)
  }

  const hideDeleteMessageConfirmationModal = () => {
    setDeleteMessageModalOpen(false)
    setMessageToDelete(undefined)
  }

  const openDeleteMessageModal = (messageId: string) => {
    setDeleteMessageModalOpen(true)
    setMessageToDelete(messageId)
  }

  const handleSelectTemplate = (template: Template) => {
    setContent(template.text)
    closeAttachTemplateModal()
  }
  return (
    <>
      <ContactSelectModal
        testId={MessagesTestIds.AttachContactModal}
        open={showAttachContactModal}
        withPhoneNumberOnly={false}
        onClose={closeAttachContactModal}
        onContactSelect={handleContactAttach}
        title={intl.formatMessage(
          contactsModalMessages.attachContactModalTitle
        )}
      />
      <ContactSelectModal
        testId={MessagesTestIds.BrowseContactsModal}
        open={showBrowseContactModal}
        withPhoneNumberOnly
        onClose={closeBrowseContactModal}
        onContactSelect={handleBrowseContactSelection}
        onPhoneNumberSelect={handleBrowsePhoneNumberSelection}
        title={intl.formatMessage(
          contactsModalMessages.browseContactsModalTitle
        )}
      />
      <TemplatesSelectModal
        open={showAttachTemplateModal}
        onClose={closeAttachTemplateModal}
        onSelect={handleSelectTemplate}
        templates={templates}
      />
      <MessagesPanel
        searchValue={searchValue}
        onSearchValueChange={changeSearchValue}
        onNewMessageClick={handleNewMessageClick}
        buttonDisabled={messagesState === MessagesState.NewMessage}
        selectedThreads={selectedRows}
        allItemsSelected={allRowsSelected}
        toggleAll={toggleAll}
        onDeleteClick={handleDeleteSelected}
      />
      <TableWithSidebarWrapper>
        {threads.length === 0 && messagesState === MessagesState.List ? (
          <EmptyState
            data-testid={MessagesTestIds.EmptyThreadListState}
            title={messages.emptyListTitle}
            description={messages.emptyListDescription}
          />
        ) : (
          <ThreadList
            data-testid={MessagesTestIds.ThreadList}
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
            currentlyDeletingMessageId={currentlyDeletingMessageId}
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
            messageLayoutNotifications={messageLayoutNotifications}
            removeLayoutNotification={removeLayoutNotification}
            onMessageRead={markAsRead}
            onMessageDelete={openDeleteMessageModal}
            resendMessage={resendMessage}
            onAttachTemplateClick={openAttachTemplateModal}
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
            onBrowseContactsClick={openBrowseContactModal}
            onAttachTemplateClick={openAttachTemplateModal}
          />
        )}
      </TableWithSidebarWrapper>

      <DeleteThreadModals
        deletedThreads={deletedThreads}
        hideDeleteModal={hideDeleteModal}
        threadDeletingState={threadDeletingState}
      />

      <DeleteMessageModals
        messageDeletingState={messageDeletingState}
        hideConfirmationModal={hideDeleteMessageConfirmationModal}
        hideDeleteErrorModal={hideMessageDeleteModal}
        onMessageRemove={handleDeleteMessage}
        openDeleteMessageConfirmation={deleteMessageModalOpen}
      />
    </>
  )
}

export default Messages
