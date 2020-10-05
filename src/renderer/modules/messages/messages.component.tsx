import React, { useEffect, useState } from "react"
import Button from "Renderer/components/core/button/button.component"
import { TableWithSidebarWrapper } from "Renderer/components/core/table/table.component"
import DevModeWrapper from "Renderer/components/rest/dev-mode-wrapper/dev-mode-wrapper.container"
import MessagesList from "Renderer/components/rest/messages/messages-list.component"
import {
  ComponentProps as MessagesProps,
  VisibilityFilter,
  Topic,
} from "Renderer/models/messages/messages.interface"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { noop } from "Renderer/utils/noop"
import useTableSidebar from "Renderer/utils/hooks/useTableSidebar"
import MessageDetails from "Renderer/components/rest/messages/message-details.component"
import MessagesPanel from "Renderer/modules/messages/messages-panel.component"
import useTableSelect from "Renderer/utils/hooks/useTableSelect"
import { intl, textFormatters } from "Renderer/utils/intl"
import modalService from "Renderer/components/core/modal/modal.service"
import DeleteModal from "Renderer/components/core/modal/delete-modal.component"
import { defineMessages } from "react-intl"
import { isNameAvailable } from "Renderer/components/rest/messages/is-name-available"
import { createFullName } from "Renderer/models/phone/phone.helpers"
import { Message } from "Renderer/interfaces/message.interface"

const deleteModalMessages = defineMessages({
  title: { id: "view.name.messages.deleteModal.title" },
  multipleThreadText: {
    id: "view.name.messages.deleteModal.multipleThreadText",
  },
  singleThreadText: { id: "view.name.messages.deleteModal.singleThreadText" },
})

const Messages: FunctionComponent<MessagesProps> = ({
  searchValue,
  changeSearchValue = noop,
  changeVisibilityFilter = noop,
  deleteConversation = noop,
  list,
  visibilityFilter,
  markAsRead = noop,
  toggleReadStatus = noop,
}) => {
  const [messagesList, setMessagesList] = useState(list)
  const { openSidebar, closeSidebar, activeRow } = useTableSidebar<Topic>()
  const {
    selectedRows,
    allRowsSelected,
    toggleAll,
    resetRows,
    ...rest
  } = useTableSelect<Topic>(list)

  const showAllMessages = () => {
    changeVisibilityFilter(VisibilityFilter.All)
  }

  const hideReadMessages = () => {
    changeVisibilityFilter(VisibilityFilter.Unread)
  }
  const _devClearMessages = () => setMessagesList([])
  const _devLoadDefaultMessages = () => setMessagesList(list)
  useEffect(() => setMessagesList(list), [list])

  const getPrettyCaller = (id: string): string => {
    const findById = (topic: Topic) => topic.id === id
    const topic = list.find(findById) as Topic
    const caller = topic.caller
    return isNameAvailable(caller)
      ? createFullName(caller)
      : (caller.primaryPhoneNumber as string)
  }

  const getSingleThreadDeleteMessage = (id: string): Message => {
    return {
      ...deleteModalMessages.singleThreadText,
      values: {
        caller: getPrettyCaller(id),
        ...textFormatters,
      },
    }
  }

  const getMultipleThreadDeleteMessage = (ids: string[]): Message => {
    return {
      ...deleteModalMessages.multipleThreadText,
      values: {
        num: allRowsSelected ? -1 : ids.length,
        ...textFormatters,
      },
    }
  }

  const remove = (ids: string[]) => {
    const title = intl.formatMessage(deleteModalMessages.title)
    const message =
      ids.length === 1
        ? getSingleThreadDeleteMessage(ids[0])
        : getMultipleThreadDeleteMessage(ids)
    const onClose = resetRows
    const onDelete = () => {
      deleteConversation(ids)
      resetRows()
      modalService.closeModal()
    }

    modalService.openModal(
      <DeleteModal
        title={title}
        message={message}
        onClose={onClose}
        onDelete={onDelete}
      />
    )
  }

  const removeSelectedRows = () => remove(selectedRows.map(({ id }) => id))

  return (
    <>
      <DevModeWrapper>
        <p>Messages on list: {messagesList.length}</p>
        <Button onClick={_devClearMessages} label="Remove all messages" />
        <br />
        <Button
          onClick={_devLoadDefaultMessages}
          label="Load default messages"
        />
      </DevModeWrapper>
      <MessagesPanel
        searchValue={searchValue}
        hideReadMessages={hideReadMessages}
        showAllMessages={showAllMessages}
        changeSearchValue={changeSearchValue}
        toggleAll={toggleAll}
        allItemsSelected={allRowsSelected}
        deleteConversation={deleteConversation}
        selectedConversations={selectedRows}
        resetRows={resetRows}
        visibilityFilter={visibilityFilter}
        onMarkAsRead={markAsRead}
        onDeleteButtonClick={removeSelectedRows}
      />
      <TableWithSidebarWrapper>
        <MessagesList
          list={messagesList}
          openSidebar={openSidebar}
          activeRow={activeRow}
          onRemove={remove}
          onToggleReadStatus={toggleReadStatus}
          {...rest}
        />
        {activeRow && (
          <MessageDetails details={activeRow} onClose={closeSidebar} />
        )}
      </TableWithSidebarWrapper>
    </>
  )
}

export default Messages
