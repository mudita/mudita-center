import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import CalendarPanel from "Renderer/components/rest/calendar/calendar-panel.component"
import { noop } from "Renderer/utils/noop"
import modalService from "Renderer/components/core/modal/modal.service"
import {
  SyncCalendarModal,
  SynchronizingModal,
} from "Renderer/components/rest/calendar/sync-calendar-modal.component"

const Calendar: FunctionComponent = () => {
  const openSynchronizingModal = async () => {
    await modalService.closeModal()
    await modalService.openModal(<SynchronizingModal />)
  }
  const openSyncCalendarModal = () => {
    modalService.openModal(
      <SyncCalendarModal onGoogleButtonClick={openSynchronizingModal} />
    )
  }
  return (
    <div>
      <CalendarPanel
        onSearchTermChange={noop}
        onSynchroniseClick={openSyncCalendarModal}
      />
    </div>
  )
}

export default Calendar
