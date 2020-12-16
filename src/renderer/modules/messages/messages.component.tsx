import React, { useEffect, useState } from "react"
import { defineMessages } from "react-intl"
import { TableWithSidebarWrapper } from "Renderer/components/core/table/table.component"
import MessagesList from "Renderer/components/rest/messages/messages-list.component"
import {
  ComponentProps as MessagesProps,
  VisibilityFilter,
  Topic,
} from "Renderer/models/messages/messages.interface"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { noop } from "Renderer/utils/noop"
import useTableSidebar from "Renderer/utils/hooks/use-table-sidebar"
import MessageDetails from "Renderer/components/rest/messages/message-details.component"
import MessagesPanel from "Renderer/modules/messages/messages-panel.component"
import useTableSelect from "Renderer/utils/hooks/useTableSelect"
import useURLSearchParams from "Renderer/utils/hooks/use-url-search-params"
import findTopicBySearchParams from "Renderer/modules/messages/find-topic-by-search-params"
import { intl, textFormatters } from "Renderer/utils/intl"
import modalService from "Renderer/components/core/modal/modal.service"
import DeleteModal from "Renderer/components/core/modal/delete-modal.component"
import { Message } from "Renderer/interfaces/message.interface"
import getPrettyCaller from "Renderer/models/utils/get-pretty-caller"
import { AppSettings } from "App/main/store/settings.interface"
import { useHistory } from "react-router-dom"
import createRouterPath from "Renderer/utils/create-router-path"
import { URL_MAIN } from "Renderer/constants/urls"
import AttachContactModal from "Renderer/components/rest/messages/attach-contact-modal.component"
import { Contact, ContactCategory } from "Renderer/models/phone/phone.typings"

const deleteModalMessages = defineMessages({
  title: { id: "view.name.messages.deleteModal.title" },
  body: {
    id: "view.name.messages.deleteModal.body",
  },
})

interface Props extends MessagesProps, Pick<AppSettings, "language"> {
  attachContactList: ContactCategory[]
  attachContactFlatList: Contact[]
}

const Messages: FunctionComponent<Props> = ({
  searchValue,
  changeSearchValue = noop,
  changeVisibilityFilter = noop,
  deleteConversation = noop,
  list,
  visibilityFilter,
  markAsRead = noop,
  toggleReadStatus = noop,
  language,
  attachContactList,
  attachContactFlatList,
}) => {
  const [messagesList, setMessagesList] = useState(list)
  const { openSidebar, closeSidebar, activeRow } = useTableSidebar<Topic>(
    findTopicBySearchParams(useURLSearchParams(), list)
  )

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

  useEffect(() => setMessagesList(list), [list])

  const getDeletingMessage = (ids: string[]): Message => {
    const findById = (topic: Topic) => topic.id === ids[0]
    const topic = list.find(findById) as Topic

    return {
      ...deleteModalMessages.body,
      values: {
        caller: getPrettyCaller(topic.caller),
        num: allRowsSelected ? -1 : ids.length,
        ...textFormatters,
      },
    }
  }

  const remove = (ids: string[]) => {
    const title = intl.formatMessage(deleteModalMessages.title)
    const message = getDeletingMessage(ids)
    const onDelete = () => {
      deleteConversation(ids)
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

  const removeSelectedRows = () => remove(selectedRows.map(({ id }) => id))

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
      <AttachContactModal flatList={attachContactFlatList} list={attachContactList} />,
      true
    )
  }

  return (
    <>
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
        onDeleteClick={removeSelectedRows}
      />
      <TableWithSidebarWrapper>
        <MessagesList
          list={messagesList}
          openSidebar={openSidebar}
          activeRow={activeRow}
          onDeleteClick={removeSingleConversation}
          onToggleReadStatus={toggleReadStatus}
          language={language}
          {...rest}
        />
        {activeRow && (
          <MessageDetails
            onDeleteClick={removeSingleConversation}
            onUnreadStatus={toggleReadStatus}
            details={activeRow}
            onClose={closeSidebar}
            onContactClick={contactClick}
            onAttachContactClick={openAttachContactModal}
          />
        )}
      </TableWithSidebarWrapper>
    </>
  )
}

export default Messages
