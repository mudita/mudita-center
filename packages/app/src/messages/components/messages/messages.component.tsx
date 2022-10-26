/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ContactSelectModal } from "App/contacts"
import DeleteMessageModals from "App/messages/components/delete-message-modals/delete-message-modals.component"
import { DeleteThreadModals } from "App/messages/components/delete-thread-modals/delete-thread-modals.component"
import { MessagesPanel } from "App/messages/components/messages-panel/messages-panel.component"
import MessagesSearchResults from "App/messages/components/messages-search-results/messages-search-results.component"
import { useAttachContacts } from "App/messages/components/messages/hooks/use-attach-contacts.hook"
import { useBrowseContacts } from "App/messages/components/messages/hooks/use-browse-contacts.hook"
import { useContactNavigation } from "App/messages/components/messages/hooks/use-contact-navigation.hook"
import { useMessageDelete } from "App/messages/components/messages/hooks/use-message-delete.hook"
import { useMessages } from "App/messages/components/messages/hooks/use-messages.hook"
import { useNotification } from "App/messages/components/messages/hooks/use-notification.hook"
import { useReadStatus } from "App/messages/components/messages/hooks/use-read-status.hook"
import { useSearch } from "App/messages/components/messages/hooks/use-search.hook"
import { useTemplatesSelect } from "App/messages/components/messages/hooks/use-templates-select.hook"
import { useThreadDelete } from "App/messages/components/messages/hooks/use-thread-delete.hook"
import { MessagesTestIds } from "App/messages/components/messages/messages-test-ids.enum"
import { MessagesState } from "App/messages/components/messages/messages.enum"
import { MessagesProps } from "App/messages/components/messages/messages.interface"
import { mockThread } from "App/messages/components/messages/messages.new-thread.const"
import NewMessageForm from "App/messages/components/new-message-form.component"
import ThreadDetails from "App/messages/components/thread-details.component"
import ThreadList from "App/messages/components/thread-list.component"
import { TemplatesSelectModal } from "App/templates/components/templates-select-modal/templates-select-modal.component"
import {
  EmptyState,
  TableWithSidebarWrapper,
} from "App/__deprecated__/renderer/components/core/table/table.component"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import React from "react"
import { defineMessages } from "react-intl"

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

const Messages: FunctionComponent<MessagesProps> = ({
  threadsState,
  receivers,
  deleteThreads,
  threads,
  getActiveMessagesByThreadIdSelector,
  getThreadDraftMessageSelector,
  getReceiver,
  toggleReadStatus,
  markThreadsReadStatus,
  language,
  getContactByPhoneNumber,
  isContactCreatedByPhoneNumber,
  addNewMessage,
  deleteMessage,
  messageLayoutNotifications,
  removeLayoutNotification,
  currentlyDeletingMessageId,
  resendMessage,
  updateMessage,
  templates,
  error,
  selectedItems,
  toggleItem,
  selectAllItems,
  resetItems,
  searchMessages,
  searchResult,
  state,
}) => {
  const {
    setContent,
    selectPhoneNumber,
    setActiveThread,
    messagesState,
    activeThread,
    closeSidebars,
    setMessagesState,
    tmpActiveThread,
    openThreadDetails,
    openNewMessage,
    allItemsSelected,
    toggleAllCheckboxes,
    content,
    selectThread,
    getThreads,
    getViewReceiver,
    sendNewMessage,
    selectReceiver,
  } = useMessages({
    addNewMessage,
    deleteMessage,
    getReceiver,
    getThreadDraftMessageSelector,
    markThreadsReadStatus,
    resetItems,
    selectAllItems,
    selectedItems,
    threads,
    updateMessage,
  })

  const {
    closeAttachContactModal,
    openAttachContactModal,
    attachContact,
    isModalOpened: isAttachContactModalOpened,
  } = useAttachContacts({
    setContent,
  })

  const {
    closeBrowseContactModal,
    selectBrowsedPhoneNumber,
    selectBrowsedContact,
    isModalOpened: isBrowseContactsModalOpened,
    openBrowseContactModal,
  } = useBrowseContacts({ selectPhoneNumber })

  const {
    closeAttachTemplateModal,
    selectTemplate,
    isModalOpened: isTemplatesSelectModalOpened,
    openAttachTemplateModal,
  } = useTemplatesSelect({ setContent })

  const {
    deletedThreads,
    threadDeletingConfirmation,
    threadDeleting,
    deleteConfirmedThreads,
    hideDeleteThreadConfirmationModal,
    hideDeleteThreadErrorModal,
    threadDeletingInfo,
    setSelectedForsForDeletion,
    setActiveThreadForDeletion,
    setThreadForDeletion,
  } = useThreadDelete({
    deleteThreads,
    resetItems,
    messagesState,
    setActiveThread,
    error,
    state,
    selectedItems,
    activeThread,
    closeSidebars,
    setMessagesState,
    tmpActiveThread,
  })

  const {
    searchValue,
    searchByQuery,
    selectSearchedRecord,
    startSearchMode,
    activeSearchDropdown,
    searchedMessage,
    lastSearchQuery,
    selectSearchedMessage,
    clearLastSearch,
    searchMessagesBySavedSearchQuery,
  } = useSearch({
    activeThread,
    markThreadsReadStatus,
    openThreadDetails,
    searchMessages,
    setActiveThread,
    threads,
  })

  const { toggleThreadsReadStatus, markAsRead, markAsUnread } = useReadStatus({
    activeThread,
    closeSidebars,
    markThreadsReadStatus,
    resetItems,
    toggleReadStatus,
  })

  const { openActiveContactDetails, openContactDetails } = useContactNavigation(
    {
      activeThread,
    }
  )

  const {
    deleteAssignedMessage,
    hideDeleteMessageConfirmationModal,
    hideDeleteMessageErrorModal,
    messageDeleting,
    messageDeletingConfirmation,
    messageDeletingInfo,
    openDeleteMessageModal,
  } = useMessageDelete({
    deleteMessage,
    error,
    state,
    messagesState,
    searchMessagesBySavedSearchQuery,
  })

  useNotification({
    messageLayoutNotifications,
    removeLayoutNotification,
  })

  return (
    <>
      <ContactSelectModal
        testId={MessagesTestIds.AttachContactModal}
        withPhoneNumberOnly={false}
        open={isAttachContactModalOpened}
        onClose={closeAttachContactModal}
        onContactSelect={attachContact}
        title={intl.formatMessage(
          contactsModalMessages.attachContactModalTitle
        )}
      />
      <ContactSelectModal
        testId={MessagesTestIds.BrowseContactsModal}
        open={isBrowseContactsModalOpened}
        withPhoneNumberOnly
        onClose={closeBrowseContactModal}
        onContactSelect={selectBrowsedContact}
        onPhoneNumberSelect={selectBrowsedPhoneNumber}
        title={intl.formatMessage(
          contactsModalMessages.browseContactsModalTitle
        )}
      />
      <TemplatesSelectModal
        open={isTemplatesSelectModalOpened}
        onClose={closeAttachTemplateModal}
        onSelect={selectTemplate}
        templates={templates}
      />
      <MessagesPanel
        searchValue={searchValue}
        onSearchValueChange={searchByQuery}
        onNewMessageClick={openNewMessage}
        buttonDisabled={messagesState === MessagesState.NewMessage}
        selectedIds={selectedItems.rows}
        allItemsSelected={allItemsSelected}
        toggleAll={toggleAllCheckboxes}
        onDeleteClick={setSelectedForsForDeletion}
        results={searchResult}
        onSelect={selectSearchedRecord}
        onSearchEnterClick={startSearchMode}
        showSearchResults={activeSearchDropdown}
        showSearchResultsList={messagesState === MessagesState.SearchResult}
      />
      {messagesState === MessagesState.SearchResult ? (
        <MessagesSearchResults
          results={searchResult.message ? searchResult.message : []}
          resultsState={threadsState}
          searchValue={searchValue}
          getContactByPhoneNumber={getContactByPhoneNumber}
          onRowClick={selectSearchedMessage}
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
              onThreadClick={(thread) => selectThread(thread, clearLastSearch)}
              getContactByPhoneNumber={getContactByPhoneNumber}
              onDeleteClick={setThreadForDeletion}
              onToggleReadStatus={toggleThreadsReadStatus}
              onContactClick={openContactDetails}
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
              onContactClick={openActiveContactDetails}
              onDeleteClick={setActiveThreadForDeletion}
              onMarkAsUnreadClick={markAsUnread}
              onClose={closeSidebars}
              onSendClick={sendNewMessage}
              onContentChange={setContent}
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
              onContentChange={setContent}
              onSendClick={sendNewMessage}
              onPhoneNumberSelect={selectPhoneNumber}
              onReceiverSelect={selectReceiver}
              onClose={closeSidebars}
              onAttachContactClick={openAttachContactModal}
              onBrowseContactsClick={openBrowseContactModal}
              onAttachTemplateClick={openAttachTemplateModal}
            />
          )}
        </TableWithSidebarWrapper>
      )}

      <DeleteThreadModals
        deletedThreads={deletedThreads}
        deletingConfirmation={threadDeletingConfirmation}
        deleting={threadDeleting}
        deletingInfo={threadDeletingInfo}
        error={error}
        onCloseDeletingModal={hideDeleteThreadConfirmationModal}
        onCloseDeletingErrorModal={hideDeleteThreadErrorModal}
        onDelete={deleteConfirmedThreads}
      />
      <DeleteMessageModals
        deletingConfirmation={messageDeletingConfirmation}
        deleting={messageDeleting}
        deletingInfo={messageDeletingInfo}
        error={error}
        onCloseDeletingModal={hideDeleteMessageConfirmationModal}
        onCloseDeletingErrorModal={hideDeleteMessageErrorModal}
        onDelete={deleteAssignedMessage}
      />
    </>
  )
}

export default Messages
