import { defineMessages } from "react-intl"
import React, { useEffect, useRef, useState } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import CalendarPanel from "Renderer/components/rest/calendar/calendar-panel.component"
import {
  CalendarEvent,
  CalendarProps,
} from "Renderer/modules/calendar/calendar.interface"
import { calendarSeed } from "App/seeds/calendar"
import {
  Event,
  EventsList,
  Header,
} from "Renderer/modules/calendar/calendar.styled"
import modalService from "Renderer/components/core/modal/modal.service"
import {
  SyncCalendarModal,
  SynchronizingModal,
  SynchronizingFinishedModal,
  SynchronizingFailedModal,
} from "Renderer/components/rest/calendar/calendar.modals"

const messages = defineMessages({
  allEvents: {
    id: "view.name.calendar.allEvents",
  },
})

const Calendar: FunctionComponent<CalendarProps> = ({
  events = calendarSeed,
}) => {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const [, setSync] = useState(1)
  const timeout = useRef<NodeJS.Timeout>()
  const eventsListRef = useRef<HTMLElement>()
  const highlightActiveEventTimeout = useRef<NodeJS.Timeout>()

  const removeTimeoutHandler = () => {
    if (timeout.current) {
      clearTimeout(timeout.current)
    }
  }

  const closeModal = () => modalService.closeModal()

  const openSynchronizingFinishedModal = async () => {
    await modalService.closeModal()
    await modalService.openModal(
      <SynchronizingFinishedModal onDone={closeModal} />
    )
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
    timeout.current = setTimeout(() => {
      setSync((prevSync) => {
        if (prevSync % 3 === 0) {
          openSynchronizingFailedModal()
        } else {
          openSynchronizingFinishedModal()
        }
        return prevSync + 1
      })
    }, 1500)
  }
  const openSyncCalendarModal = async () => {
    await modalService.openModal(
      <SyncCalendarModal onGoogleButtonClick={openSynchronizingModal} />
    )
  }

  useEffect(() => {
    if (selectedEvent) {
      const selectedEventIndex = events.indexOf(selectedEvent)

      if (selectedEventIndex >= 0) {
        eventsListRef.current?.children[selectedEventIndex].scrollIntoView({
          behavior: "smooth",
          block: "center",
        })

        highlightActiveEventTimeout.current = setTimeout(() => {
          setSelectedEvent(null)
        }, 2500)
      }
    }
    return () => {
      if (highlightActiveEventTimeout.current) {
        clearTimeout(highlightActiveEventTimeout.current)
      }
    }
  }, [selectedEvent])

  useEffect(() => () => removeTimeoutHandler(), [])

  return (
    <>
      <CalendarPanel
        events={events}
        onEventSelect={setSelectedEvent}
        onSynchroniseClick={openSyncCalendarModal}
      />
      <Header message={messages.allEvents} />
      <EventsList ref={eventsListRef}>
        {events.map((item) => (
          <Event key={item.id} event={item} active={item === selectedEvent} />
        ))}
      </EventsList>
    </>
  )
}

export default Calendar
