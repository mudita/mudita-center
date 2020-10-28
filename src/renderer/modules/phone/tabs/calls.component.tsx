import React from "react"
import { Details } from "Renderer/components/rest/calls/call-details.types"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { noop } from "Renderer/utils/noop"
import { VisibilityFilter } from "App/renderer/models/calls/calls.interface"
import CallsHeader from "Renderer/components/rest/calls/calls-header.component"
import CallsTable from "Renderer/components/rest/calls/calls-table.component"
import useTableSelect from "Renderer/utils/hooks/useTableSelect"
import modalService from "Renderer/components/core/modal/modal.service"
import { defineMessages } from "react-intl"
import { intl, textFormatters } from "Renderer/utils/intl"
import DeleteModal from "Renderer/components/core/modal/delete-modal.component"
import { Message } from "Renderer/interfaces/message.interface"
import useTableSidebar from "Renderer/utils/hooks/use-table-sidebar"
import getPrettyCaller from "Renderer/models/utils/get-pretty-caller"

const deleteModalMessages = defineMessages({
  title: { id: "view.name.calls.deleteModal.title" },
  body: {
    id: "view.name.calls.deleteModal.body",
  },
})

export interface CallsProps {
  changeVisibilityFilter?: (filter: VisibilityFilter) => void
  calls: Details[]
  deleteCall?: (ids: string[]) => void
  isTopicThreadOpened: (phoneNumber: string) => boolean
  isContactCreated: (phoneNumber: string) => boolean
}

const Calls: FunctionComponent<CallsProps> = ({
  calls,
  changeVisibilityFilter = noop,
  deleteCall = noop,
  isTopicThreadOpened,
  isContactCreated,
}) => {
  const {
    selectedRows,
    getRowStatus,
    toggleRow,
    noneRowsSelected,
    toggleAll,
    allRowsSelected,
    resetRows,
  } = useTableSelect<Details>(calls)
  const {
    openSidebar,
    closeSidebar,
    sidebarOpened,
    activeRow,
  } = useTableSidebar<Details>(undefined)

  const getDeletingMessage = (ids: string[]): Message => {
    const findById = (details: Details) => details.id === ids[0]
    const details = calls.find(findById) as Details
    return {
      ...deleteModalMessages.body,
      values: {
        caller: getPrettyCaller(details.caller),
        num: allRowsSelected ? -1 : ids.length,
        ...textFormatters,
      },
    }
  }

  const remove = (ids: string[]) => {
    const title = intl.formatMessage(deleteModalMessages.title)
    const message = getDeletingMessage(ids)
    const onDelete = () => {
      deleteCall(ids)
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

  const removeSingleCall = (id: string) => remove([id])

  const removeSelectedRows = () => remove(selectedRows.map(({ id }) => id))

  return (
    <>
      <CallsHeader
        changeVisibilityFilter={changeVisibilityFilter}
        toggleAll={toggleAll}
        allRowsSelected={allRowsSelected}
        selectedCalls={selectedRows}
        onDeleteClick={removeSelectedRows}
      />
      <CallsTable
        sidebarOpened={sidebarOpened}
        activeRow={activeRow}
        calls={calls}
        getRowStatus={getRowStatus}
        toggleRow={toggleRow}
        noneRowsSelected={noneRowsSelected}
        isTopicThreadOpened={isTopicThreadOpened}
        isContactCreated={isContactCreated}
        onDeleteClick={removeSingleCall}
        onRowClick={openSidebar}
        onDetailsCloseClick={closeSidebar}
      />
    </>
  )
}

export default Calls
