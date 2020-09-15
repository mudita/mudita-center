import React, { useEffect, useState } from "react"
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

const Calendar: FunctionComponent = () => {
  const [, setSync] = useState(1)
  const [timeout, setModalTimeout] = useState<NodeJS.Timeout>()

  const removeTimeoutHandler = () => {
    if (timeout) {
      clearTimeout(timeout)
    }
  }

  const openSynchronizingFinishedModal = async () => {
    await modalService.closeModal()
    await modalService.openModal(<SynchronizingFinishedModal />)
  }

  const openSynchronizingFailedModal = async () => {
    await modalService.closeModal()
    await modalService.openModal(
      <SynchronizingFailedModal onRefresh={openSynchronizingModal} />
    )
  }

  const openSynchronizingModal = async () => {
    await modalService.closeModal()
    await modalService.openModal(<SynchronizingModal />)
    setSync((prevSync) => {
      setModalTimeout(
        setTimeout(() => {
          if (prevSync % 3 === 0) {
            openSynchronizingFailedModal()
          } else {
            openSynchronizingFinishedModal()
          }
          removeTimeoutHandler()
        }, 1500)
      )
      return prevSync + 1
    })
  }
  const openSyncCalendarModal = async () => {
    await modalService.openModal(
      <SyncCalendarModal onGoogleButtonClick={openSynchronizingModal} />
    )
  }

  useEffect(() => () => removeTimeoutHandler(), [])

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
