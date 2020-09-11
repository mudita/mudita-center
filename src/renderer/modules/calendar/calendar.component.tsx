import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import CalendarPanel from "Renderer/components/rest/calendar/calendar-panel.component"
import { noop } from "Renderer/utils/noop"
import modalService from "Renderer/components/core/modal/modal.service"
import SyncCalendarModal from "Renderer/components/rest/calendar/sync-calendar-modal.component"

const Calendar: FunctionComponent = () => {
  const openSyncModal = () => {
    modalService.openModal(<SyncCalendarModal />)
  }
  return (
    <div>
      <CalendarPanel
        onSearchTermChange={noop}
        onSynchroniseClick={openSyncModal}
      />
    </div>
  )
}

export default Calendar
