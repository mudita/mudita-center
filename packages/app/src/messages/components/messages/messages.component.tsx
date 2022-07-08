/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import assert from "assert"
import React, { useEffect, useState } from "react"
import { defineMessages } from "react-intl"
import { useHistory } from "react-router-dom"
import { IndexRange } from "react-virtualized"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import DeleteMessageModals from "App/messages/components/delete-message-modals/delete-message-modals.component"
import { DeleteThreadModals } from "App/messages/components/delete-thread-modals/delete-thread-modals.component"
import findThreadBySearchParams from "App/messages/components/find-thread-by-search-params"
import MessagesPanel from "App/messages/components/messages-panel.component"
import { MessagesTestIds } from "App/messages/components/messages/messages-test-ids.enum"
import NewMessageForm from "App/messages/components/new-message-form.component"
import ThreadDetails from "App/messages/components/thread-details.component"
import ThreadList from "App/messages/components/thread-list.component"
import { MessageType, ResultState } from "App/messages/constants"
import { Message, Thread } from "App/messages/dto"
import { Receiver, ReceiverIdentification } from "App/messages/reducers"
import {
  EmptyState,
  TableWithSidebarWrapper,
} from "App/__deprecated__/renderer/components/core/table/table.component"
import { URL_MAIN } from "App/__deprecated__/renderer/constants/urls"
import {
  MessagesProps,
  MessagesServiceState,
} from "App/messages/components/messages/messages.interface"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import createRouterPath from "App/__deprecated__/renderer/utils/create-router-path"
import useURLSearchParams from "App/__deprecated__/renderer/utils/hooks/use-url-search-params"
import useTableSelect from "App/__deprecated__/renderer/utils/hooks/useTableSelect"
import { noop } from "App/__deprecated__/renderer/utils/noop"
import { isThreadNumberEqual } from "App/messages/components/messages/is-thread-number-equal.helper"
import { ContactSelectModal } from "App/contacts"
import { TemplatesSelectModal } from "App/templates/components/templates-select-modal/templates-select-modal.component"
import { Template } from "App/templates/dto"
import { Contact } from "App/contacts/dto"
import { ContactAttachmentPresenter } from "App/contacts/presenters"
import { useLoadingState } from "App/ui"

const messages = defineMessages({
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
  currentlyDeletingMessageId,
  resendMessage,
  templates,
  error,
  loaded,
}) => {
  const { states, updateFieldState, resetState } =
    useLoadingState<MessagesServiceState>({
      messageDeleting: false,
      messageDeletingConfirmation: false,
      messageDeletingInfo: false,
      threadDeleting: false,
      threadDeletingConfirmation: false,
      threadDeletingInfo: false,
      attachContact: false,
      attachTemplate: false,
      browseContact: false,
    })

  // TODO [CP-1401] move component logic to custom hook

  const history = useHistory()
  const [messagesState, setMessagesState] = useState(MessagesState.List)
  const [activeThread, setActiveThread] = useState<Thread | undefined>(
    findThreadBySearchParams(useURLSearchParams(), threads)
  )
  const [phoneNumber, setPhoneNumber] = useState<string>("")
  const [tmpActiveThread, setTmpActiveThread] = useState<Thread | undefined>()
  const [content, setContent] = useState("")
  const { selectedRows, allRowsSelected, toggleAll, resetRows, ...rest } =
    useTableSelect<Thread>(threads)
  const [messageToDelete, setMessageToDelete] = useState<string | undefined>()
  const [deletedThreads, setDeletedThreads] = useState<string[]>([])

  useEffect(() => {
    messageLayoutNotifications
      .filter(
        (item) => (item.content as Message)?.messageType === MessageType.OUTBOX
      )
      .forEach((item) => {
        removeLayoutNotification(item.id)
      })
  }, [messageLayoutNotifications])

  useEffect(() => {
    if (!loaded || error) {
      return
    }

    const firstTimeout = setTimeout(() => {
      if (states.messageDeleting) {
        updateFieldState("messageDeleting", false)
        updateFieldState("messageDeletingConfirmation", false)
        updateFieldState("messageDeletingInfo", true)
      }

      if (states.threadDeleting) {
        updateFieldState("threadDeleting", false)
        updateFieldState("threadDeletingInfo", true)
      }
    }, 1000)

    const secondTimeout = setTimeout(() => {
      resetState()
    }, 5000)

    return () => {
      clearTimeout(firstTimeout)
      clearTimeout(secondTimeout)
    }
  }, [loaded, error])

  useEffect(() => {
    handlePotentialThreadDeletion()
  }, [threads])

  useEffect(() => {
    if (!activeThread) {
      return
    }

    setPhoneNumber(activeThread.phoneNumber)
  }, [activeThread])

  useEffect(() => {
    if (!activeThread) {
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

  const contactClick = (phoneNumber: string) => {
    history.push(
      createRouterPath(URL_MAIN.contacts, {
        phoneNumber,
      })
    )
  }

  const openAttachContactModal = () => {
    updateFieldState("attachContact", true)
  }

  const closeAttachContactModal = () => {
    updateFieldState("attachContact", false)
  }

  const openBrowseContactModal = () => {
    updateFieldState("browseContact", true)
  }

  const closeBrowseContactModal = () => {
    updateFieldState("browseContact", false)
  }

  const openAttachTemplateModal = () => {
    updateFieldState("attachTemplate", true)
  }

  const closeAttachTemplateModal = () => {
    updateFieldState("attachTemplate", false)
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

    updateFieldState("browseContact", false)
  }

  const handleBrowsePhoneNumberSelection = (phoneNumber: string): void => {
    handlePhoneNumberSelect(phoneNumber)
    updateFieldState("browseContact", false)
  }

  const handleContactAttach = (contact: Contact): void => {
    if (!contact) {
      return
    }

    updateFieldState("attachContact", false)
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

  const handleContactClick = (): void => {
    if (!activeThread) {
      return
    }

    history.push(
      createRouterPath(URL_MAIN.contacts, {
        phoneNumber: activeThread.phoneNumber,
      })
    )
  }

  const markAsUnread = (): void => {
    if (!activeThread) {
      return
    }

    toggleReadStatus([activeThread])
    closeSidebars()
  }

  const markAsRead = (): void => {
    if (!activeThread) {
      return
    }

    markThreadsReadStatus([activeThread])
  }

  const handleContentChange = (content: string): void => {
    setContent(content)
  }

  const handleAddNewMessage = async (
    messageType = MessageType.OUTBOX
  ): Promise<void> => {
    const threadId = threads.find(isThreadNumberEqual(phoneNumber))?.id
    if (tmpActiveThread !== undefined) {
      handleReceiverSelect({ phoneNumber })
    }
    await addNewMessage({ content, phoneNumber, threadId, messageType })

    setContent("")
  }

  const handleNewMessageSendClick = async () => {
    await handleAddNewMessage()
  }

  const handleSendClick = async () => {
    if (!activeThread) {
      return
    }

    await handleAddNewMessage()
  }

  const handleReceiverSelect = (receiver: Pick<Receiver, "phoneNumber">) => {
    if (!receiver) {
      return
    }

    setPhoneNumber(receiver.phoneNumber)

    const thread = threads.find(isThreadNumberEqual(receiver.phoneNumber))

    if (thread) {
      setActiveThread(thread)
      setTmpActiveThread(undefined)
      setMessagesState(MessagesState.ThreadDetails)
    } else {
      const tmpThread: Thread = {
        ...mockThread,
        phoneNumber: receiver.phoneNumber,
      }
      setTmpActiveThread(tmpThread)
      setActiveThread(tmpThread)
      setMessagesState(MessagesState.ThreadDetails)
    }
  }

  const handlePhoneNumberSelect = (phoneNumber: string) => {
    if (!phoneNumber) {
      return
    }

    handleReceiverSelect({ phoneNumber: phoneNumber })
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

  // Delete messages functionality
  const handleDeleteMessage = () => {
    assert(messageToDelete)
    deleteMessage(messageToDelete)
    setMessageToDelete(undefined)

    updateFieldState("messageDeletingConfirmation", false)
    updateFieldState("messageDeleting", true)
  }

  const hideDeleteMessageConfirmationModal = () => {
    setMessageToDelete(undefined)
    updateFieldState("messageDeleting", false)
  }

  const hideDeleteMessageErrorModal = () => {
    updateFieldState("messageDeleting", false)
  }

  const openDeleteMessageModal = (messageId: string) => {
    setMessageToDelete(messageId)
    updateFieldState("messageDeletingConfirmation", true)
  }

  // Delete threads functionality
  const hideDeleteThreadConfirmationModal = () => {
    updateFieldState("threadDeletingConfirmation", false)
  }

  const hideDeleteThreadErrorModal = () => {
    updateFieldState("threadDeleting", false)
  }

  const handleConfirmThreadDelete = async (): Promise<void> => {
    updateFieldState("threadDeletingConfirmation", false)
    updateFieldState("threadDeleting", true)

    await deleteThreads(deletedThreads)

    resetRows()
    setActiveThread(undefined)
  }

  const handleDeleteThreads = (): void => {
    const ids = selectedRows.map((thread) => thread.id)
    setDeletedThreads(ids)
    updateFieldState("threadDeletingConfirmation", true)
  }

  const handleDeleteThread = (id: string): void => {
    setDeletedThreads([id])
    updateFieldState("threadDeletingConfirmation", true)
  }

  const handleDeleteTmpThreadClick = async (): Promise<void> => {
    if (tmpActiveThread !== undefined) {
      closeSidebars()
    } else if (activeThread) {
      await deleteThreads([activeThread.id])
      resetRows()
      setActiveThread(undefined)
    }
  }

  const handleSelectTemplate = (template: Template) => {
    setContent(template.text)
    closeAttachTemplateModal()
  }
  return (
    <>
      <ContactSelectModal
        testId={MessagesTestIds.AttachContactModal}
        withPhoneNumberOnly={false}
        open={states.attachContact}
        onClose={closeAttachContactModal}
        onContactSelect={handleContactAttach}
        title={intl.formatMessage(
          contactsModalMessages.attachContactModalTitle
        )}
      />
      <ContactSelectModal
        testId={MessagesTestIds.BrowseContactsModal}
        open={states.browseContact}
        withPhoneNumberOnly
        onClose={closeBrowseContactModal}
        onContactSelect={handleBrowseContactSelection}
        onPhoneNumberSelect={handleBrowsePhoneNumberSelection}
        title={intl.formatMessage(
          contactsModalMessages.browseContactsModalTitle
        )}
      />
      <TemplatesSelectModal
        open={states.attachTemplate}
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
        onDeleteClick={handleDeleteThreads}
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
            onDeleteClick={handleDeleteThread}
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
            onDeleteClick={handleDeleteTmpThreadClick}
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
        deletingConfirmation={states.threadDeletingConfirmation}
        deleting={states.threadDeleting}
        deletingInfo={states.threadDeletingInfo}
        error={error}
        onCloseDeletingModal={hideDeleteThreadConfirmationModal}
        onCloseDeletingErrorModal={hideDeleteThreadErrorModal}
        onDelete={handleConfirmThreadDelete}
      />

      <DeleteMessageModals
        deletingConfirmation={states.messageDeletingConfirmation}
        deleting={states.messageDeleting}
        deletingInfo={states.messageDeletingInfo}
        error={error}
        onCloseDeletingModal={hideDeleteMessageConfirmationModal}
        onCloseDeletingErrorModal={hideDeleteMessageErrorModal}
        onDelete={handleDeleteMessage}
      />
    </>
  )
}

export default Messages
