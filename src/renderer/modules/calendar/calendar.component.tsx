import React, { useState } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import CalendarPanel from "Renderer/components/rest/calendar/calendar-panel.component"
import { noop } from "Renderer/utils/noop"
import modalService from "Renderer/components/core/modal/modal.service"
import {
  SyncCalendarModal,
  SynchronizingModal,
  SynchronizingFinishedModal,
  SynchronizingFailedModal,
} from "Renderer/components/rest/calendar/calendar.modals"
import { simulateProgress } from "Renderer/modules/overview/overview.component"

const Calendar: FunctionComponent = () => {
  const [sync, setSync] = useState(0)
  const openSynchronizingFinishedModal = async () => {
    await modalService.closeModal()
    await modalService.openModal(<SynchronizingFinishedModal />)
  }

  const openSynchronizingFailedModal = async () => {
    await modalService.closeModal()
    await modalService.openModal(<SynchronizingFailedModal />)
  }

  const openSynchronizingModal = async () => {
    setSync((syncValue) => syncValue + 1)
    simulateProgress(
      <SynchronizingModal />,
      openSynchronizingFailedModal,
      openSynchronizingFinishedModal,
      sync % 3 === 0
    )
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
