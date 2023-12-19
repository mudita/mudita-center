/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import assert from "assert"
import React, { useEffect, useState } from "react"
import { defineMessages } from "react-intl"
import { useHistory } from "react-router-dom"
import { IndexRange } from "react-virtualized"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import DeleteMessageModals from "Core/messages/components/delete-message-modals/delete-message-modals.component"
import { DeleteThreadModals } from "Core/messages/components/delete-thread-modals/delete-thread-modals.component"
import findThreadBySearchParams from "Core/messages/components/find-thread-by-search-params"
import { MessagesPanel } from "Core/messages/components/messages-panel/messages-panel.component"
import { MessagesTestIds } from "Core/messages/components/messages/messages-test-ids.enum"
import NewMessageForm from "Core/messages/components/new-message-form.component"
import ThreadDetails from "Core/messages/components/thread-details.component"
import ThreadList from "Core/messages/components/thread-list.component"
import { MessageType, ResultState } from "Core/messages/constants"
import { Message, Thread } from "Core/messages/dto"
import { Receiver, ReceiverIdentification } from "Core/messages/reducers"
import {
  EmptyState,
  TableWithSidebarWrapper,
} from "Core/__deprecated__/renderer/components/core/table/table.component"
import { URL_MAIN } from "Core/__deprecated__/renderer/constants/urls"
import {
  MessagesProps,
  MessagesServiceState,
} from "Core/messages/components/messages/messages.interface"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import createRouterPath from "Core/__deprecated__/renderer/utils/create-router-path"
import useURLSearchParams from "Core/__deprecated__/renderer/utils/hooks/use-url-search-params"
import { noop } from "Core/__deprecated__/renderer/utils/noop"
import { isThreadNumberEqual } from "Core/messages/components/messages/is-thread-number-equal.helper"
import { ContactSelectModal } from "Core/contacts"
import { TemplatesSelectModal } from "Core/templates/components/templates-select-modal/templates-select-modal.component"
import { Template } from "Core/templates/dto"
import { Contact } from "Core/contacts/dto"
import { ContactAttachmentPresenter } from "Core/contacts/presenters"
import { useLoadingState } from "Core/ui"
import MessagesSearchResults from "Core/messages/components/messages-search-results/messages-search-results.component"
import { DataIndex } from "Core/index-storage/constants"
import { State } from "Core/core/constants"

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
  contactId: undefined,
  contactName: undefined,
}

const isMockedThreadUsedForNewMessageForm = (thread: Thread) => {
  return thread.id === mockThread.id
}

enum MessagesState {
  List,
  ThreadDetails,
  NewMessage,
  SearchResult,
}

const Messages: FunctionComponent<MessagesProps> = ({
  threadsState,
  receivers,
  deleteThreads = noop,
  threads,
  getActiveMessagesByThreadIdSelector,
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
  selectedItems,
  toggleItem,
  selectAllItems,
  resetItems,
  searchMessages,
  searchMessagesForPreview,
  searchResult,
  searchPreviewResult,
  state,
}) => {
  const { states, updateFieldState } = useLoadingState<MessagesServiceState>({
    messageDeleting: false,
    messageDeletingConfirmation: false,
    messageDeletingInfo: false,
    threadDeleting: false,
    threadDeletingConfirmation: false,
    threadDeletingInfo: false,
    attachContact: false,
    attachTemplate: false,
    browseContact: false,
    draftDeleting: false,
  })

  // TODO [CP-1401] move component logic to custom hook

  const history = useHistory()
  const [messagesState, setMessagesState] = useState(MessagesState.List)
  const [activeThread, setActiveThread] = useState<Thread | undefined>(
    findThreadBySearchParams(useURLSearchParams(), threads)
  )
  const [tmpActiveThread, setTmpActiveThread] = useState<Thread | undefined>()
  const [draftMessage, setDraftMessage] = useState<Message>()
  const [content, setContent] = useState("")
  const [messageToDelete, setMessageToDelete] = useState<string | undefined>()
  const [deletedThreads, setDeletedThreads] = useState<string[]>([])
  const [searchPreviewValue, setSearchPreviewValue] = useState<string>("")
  const [searchValue, setSearchValue] = useState<string>("")
  const [lastSearchQuery, setLastSearchQuery] = useState<string>("")
  const [searchedMessage, setSearchedMessage] = useState<Message | null>(null)
  const [activeSearchDropdown, setActiveSearchDropdown] =
    useState<boolean>(false)
  const allItemsSelected = threads.length === selectedItems.rows.length

  useEffect(() => {
    const thread = threads.find(({ id }) => id === activeThread?.id)
    if (thread) {
      setActiveThread(thread)
    }
  }, [threads, activeThread])

  useEffect(() => {
    if (searchPreviewValue !== "") {
      return
    }
    if (messagesState === MessagesState.SearchResult) {
      setMessagesState(MessagesState.List)
    }
    setActiveSearchDropdown(false)
    setSearchedMessage(null)
  }, [searchPreviewValue, messagesState])

  useEffect(() => {
    const noThreadsToDisplay =
      threads.length === 0 && !activeThread && !tmpActiveThread

    if (messagesState === MessagesState.ThreadDetails && noThreadsToDisplay) {
      setMessagesState(MessagesState.List)
    }
  }, [messagesState, threads.length, activeThread, tmpActiveThread])

  useEffect(() => {
    if (state !== State.Loaded) {
      return
    }

    const handleDeletingStateTimeout = setTimeout(() => {
      if (states.messageDeleting) {
        updateFieldState("messageDeleting", false)
        updateFieldState("messageDeletingConfirmation", false)
        updateFieldState("messageDeletingInfo", true)
        messagesState === MessagesState.SearchResult && handleSearchMessage()
      }

      if (states.threadDeleting) {
        updateFieldState("threadDeleting", false)
        updateFieldState("threadDeletingConfirmation", false)
        updateFieldState("threadDeletingInfo", true)
      }
    }, 1000)

    const hideInfoPopupsTimeout = setTimeout(() => {
      updateFieldState("messageDeletingInfo", false)
      updateFieldState("threadDeletingInfo", false)
    }, 5000)

    return () => {
      clearTimeout(handleDeletingStateTimeout)
      clearTimeout(hideInfoPopupsTimeout)
    }
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, error])

  useEffect(() => {
    handlePotentialThreadDeletion()
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    resetItems()
  }

  const closeSidebars = (): void => {
    setContent("")
    setActiveThread(undefined)
    setTmpActiveThread(undefined)
    setDraftMessage(undefined)
    updateFieldState("draftDeleting", false)
    setMessagesState(MessagesState.List)
    resetItems()
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
      setLastSearchQuery("")

      if (!thread.unread) {
        return
      }

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
    if (!activeThread || activeThread.unread) {
      return
    }

    toggleReadStatus([activeThread])
    resetItems()
    closeSidebars()
  }

  const markAsRead = (): void => {
    if (!activeThread) {
      return
    }

    if (!activeThread.unread) {
      return
    }

    markThreadsReadStatus([activeThread])
  }

  const handleContentChange = (content: string): void => {
    setContent(content)
  }

  const handleToggleReadStatus = (threads: Thread[]) => {
    toggleReadStatus(threads)
    resetItems()
  }

  const handleAddNewMessage = async (
    phoneNumber: string,
    messageType = MessageType.OUTBOX
  ): Promise<void> => {
    if (draftMessage) {
      await deleteMessage(draftMessage.id)
      setDraftMessage(undefined)
    }

    const threadId = threads.find(isThreadNumberEqual(phoneNumber))?.id
    if (tmpActiveThread !== undefined) {
      handleReceiverSelect({ phoneNumber })
    }
    const response = await addNewMessage({
      content,
      phoneNumber,
      threadId,
      messageType,
    })
    const thread = response.payload.messageParts[0].thread
    if (thread) {
      openThreadDetails(thread)
    }
    if (messageType === MessageType.OUTBOX) {
      setContent("")
    }
  }

  // event with the dynamically receiver when `phoneNumber` can't be set before
  const handleNewMessageSendClick = async (phoneNumber: string) => {
    await handleAddNewMessage(phoneNumber)
  }

  const handleSendClick = async () => {
    if (!activeThread) {
      return
    }

    await handleAddNewMessage(activeThread.phoneNumber)
  }

  const handleReceiverSelect = (receiver: Pick<Receiver, "phoneNumber">) => {
    if (!receiver) {
      return
    }
    const phoneNumber = receiver.phoneNumber

    const thread = threads.find(isThreadNumberEqual(phoneNumber))

    if (thread) {
      setActiveThread(thread)
      setTmpActiveThread(undefined)
      setMessagesState(MessagesState.ThreadDetails)
    } else {
      const tmpThread: Thread = {
        ...mockThread,
        phoneNumber,
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

    handleReceiverSelect({ phoneNumber })
  }

  const getViewReceiver = (activeThread: Thread): Receiver => {
    const receiver = getReceiver(activeThread.phoneNumber)

    if (activeThread.id === mockThread.id) {
      return {
        ...(receiver || { phoneNumber: activeThread.phoneNumber }),
        identification: ReceiverIdentification.unknown,
      }
    }

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
    const isTmpActiveThreadInThreads = threads.some(({ phoneNumber }) => {
      return tmpActiveThread?.phoneNumber === phoneNumber
    })

    if (tmpActiveThread !== undefined && !isTmpActiveThreadInThreads) {
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
    void deleteMessage(messageToDelete)
    setMessageToDelete(undefined)

    updateFieldState("messageDeletingConfirmation", false)
    updateFieldState("messageDeleting", true)
  }

  const hideDeleteMessageConfirmationModal = () => {
    setMessageToDelete(undefined)
    updateFieldState("messageDeletingConfirmation", false)
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
    resetItems()
    setActiveThread(undefined)
    setTmpActiveThread(undefined)
    if (messagesState === MessagesState.NewMessage) {
      setActiveThread(mockThread)
    }
  }

  const handleDeleteThreads = (): void => {
    setDeletedThreads(selectedItems.rows)
    updateFieldState("threadDeletingConfirmation", true)
  }

  const handleDeleteThread = (id: string): void => {
    resetItems()
    setDeletedThreads([id])
    updateFieldState("threadDeletingConfirmation", true)
  }

  const handleDeleteTmpThreadClick = (): void => {
    if (tmpActiveThread !== undefined) {
      closeSidebars()
    } else if (activeThread) {
      handleDeleteThread(activeThread.id)
      setMessagesState(MessagesState.List)
      setActiveThread(undefined)
    }
  }

  const handleSelectTemplate = (template: Template) => {
    setContent(template.text)
    closeAttachTemplateModal()
  }

  const handleToggleAllCheckboxes = () => {
    allItemsSelected ? resetItems() : selectAllItems()
  }

  const isMessage = (record: Thread | Message): record is Message => {
    return Boolean((record as Message).threadId)
  }

  const handleSearchSelect = (record: Thread | Message) => {
    if (!record) {
      return
    }

    if (isMessage(record)) {
      handleResultClick(record)
    } else {
      openThreadDetails(record)
    }
  }

  const handleSearch = (query: string) => {
    setSearchPreviewValue(query)

    if (query.length > 0) {
      setLastSearchQuery(query)
      setActiveSearchDropdown(true)
      searchMessagesForPreview({
        scope: [DataIndex.Message, DataIndex.Thread],
        query: query,
      })
    } else {
      if (!activeThread) {
        setMessagesState(MessagesState.List)
      }
    }
  }

  const handleSearchEnter = () => {
    setMessagesState(MessagesState.SearchResult)
    setActiveThread(undefined)
    setSearchValue(searchPreviewValue)
    handleSearchMessage(searchPreviewValue)
  }

  const handleResultClick = (message: Message): void => {
    const thread = threads.find((thread) => thread.id === message.threadId)
    if (thread && activeThread?.id !== message.threadId) {
      setSearchedMessage(message)
      openThreadDetails(thread)
      if (!thread.unread) {
        return
      }

      markThreadsReadStatus([thread])
    }
  }

  const handleSearchMessage = (currentSearchValue = searchValue) => {
    searchMessages({ scope: [DataIndex.Message], query: currentSearchValue })
    searchMessagesForPreview({
      scope: [DataIndex.Message],
      query: searchPreviewValue,
    })
  }

  return (
    <>
      <MessagesPanel
        data-testid={MessagesTestIds.MessagesPanel}
        searchValue={searchPreviewValue}
        onSearchValueChange={handleSearch}
        onNewMessageClick={handleNewMessageClick}
        buttonDisabled={messagesState === MessagesState.NewMessage}
        selectedIds={selectedItems.rows}
        allItemsSelected={allItemsSelected}
        toggleAll={handleToggleAllCheckboxes}
        onDeleteClick={handleDeleteThreads}
        results={searchPreviewResult}
        onSelect={handleSearchSelect}
        onSearchEnterClick={handleSearchEnter}
        showSearchResults={activeSearchDropdown}
        showSearchResultsList={messagesState === MessagesState.SearchResult}
      />
      {messagesState === MessagesState.SearchResult ? (
        <MessagesSearchResults
          data-testid={MessagesTestIds.MessagesSearchResults}
          results={searchResult.message ? searchResult.message : []}
          resultsState={threadsState}
          searchValue={searchValue}
          getContactByPhoneNumber={getContactByPhoneNumber}
          onRowClick={handleResultClick}
          language={language}
          removeMessage={openDeleteMessageModal}
          resendMessage={resendMessage}
        />
      ) : (
        <TableWithSidebarWrapper>
          {threads.length === 0 && messagesState === MessagesState.List ? (
            <EmptyState
              data-testid={MessagesTestIds.EmptyThreadListState}
              title={messages.emptyListTitle}
              description={messages.emptyListDescription}
            />
          ) : (
            <ThreadList
              selectedItems={selectedItems}
              toggleItem={toggleItem}
              data-testid={MessagesTestIds.ThreadList}
              language={language}
              activeThread={activeThread}
              threads={getThreads()}
              onThreadClick={handleThreadClick}
              getContactByPhoneNumber={getContactByPhoneNumber}
              onDeleteClick={handleDeleteThread}
              onToggleReadStatus={handleToggleReadStatus}
              onContactClick={contactClick}
              loadMoreRows={loadMoreRows}
              newConversation={mockThread.phoneNumber}
            />
          )}
          {messagesState === MessagesState.ThreadDetails && activeThread && (
            <ThreadDetails
              data-testid={MessagesTestIds.ThreadDetails}
              content={content}
              receiver={getViewReceiver(activeThread)}
              messages={getActiveMessagesByThreadIdSelector(activeThread.id)}
              currentlyDeletingMessageId={currentlyDeletingMessageId}
              contactCreated={isContactCreatedByPhoneNumber(
                activeThread.phoneNumber
              )}
              onAttachContactClick={openAttachContactModal}
              onContactClick={handleContactClick}
              onDeleteClick={handleDeleteTmpThreadClick}
              onMarkAsUnreadClick={markAsUnread}
              onClose={closeSidebars}
              onSendClick={handleSendClick}
              onContentChange={handleContentChange}
              messageLayoutNotifications={messageLayoutNotifications}
              removeLayoutNotification={removeLayoutNotification}
              onMessageRead={markAsRead}
              onMessageDelete={openDeleteMessageModal}
              resendMessage={resendMessage}
              onAttachTemplateClick={openAttachTemplateModal}
              selectedMessage={searchedMessage}
              searchQuery={lastSearchQuery}
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
      )}
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
