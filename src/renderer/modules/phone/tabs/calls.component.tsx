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
import { createFullName } from "Renderer/models/phone/phone.helpers"
import { CallerSearchParams } from "Renderer/models/messages/utils/caller-utils.ts"

const messages = defineMessages({
  title: { id: "view.name.calls.deleteTitle" },
  body: { id: "view.name.calls.deleteBody" },
})

interface Props {
  changeVisibilityFilter?: (filter: VisibilityFilter) => void
  calls: Details[]
  deleteCall?: (ids: string[]) => void
  isTopicThreadOpened: (params: CallerSearchParams) => boolean
}

const Calls: FunctionComponent<Props> = ({
  calls,
  changeVisibilityFilter = noop,
  deleteCall = noop,
  isTopicThreadOpened,
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

  const openDeleteModal = (details: Details) => {
    const callerName =
      createFullName(details.caller) || details.caller.primaryPhoneNumber
    const callsCount = details.timesMissed || 1
    const modalConfig = {
      title: intl.formatMessage({ ...messages.title }),
      message: {
        ...messages.body,
        values: { ...textFormatters, num: callsCount, name: callerName },
      },
    }

    const handleDelete = async () => {
      modalService.rerenderModal(<DeleteModal {...modalConfig} deleting />)

      deleteCall([details.id])

      await modalService.closeModal()
    }

    modalService.openModal(
      <DeleteModal {...modalConfig} onDelete={handleDelete} />
    )
  }

  return (
    <>
      <CallsHeader
        changeVisibilityFilter={changeVisibilityFilter}
        toggleAll={toggleAll}
        allRowsSelected={allRowsSelected}
        deleteCall={deleteCall}
        selectedCalls={selectedRows}
        resetRows={resetRows}
      />
      <CallsTable
        deleteCall={openDeleteModal}
        calls={calls}
        getRowStatus={getRowStatus}
        toggleRow={toggleRow}
        noneRowsSelected={noneRowsSelected}
        isTopicThreadOpened={isTopicThreadOpened}
      />
    </>
  )
}

export default Calls
