/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import React, { useState } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import CalendarPanel from "Renderer/components/rest/calendar/calendar-panel.component"
import { EmptyState } from "Renderer/components/core/table/table.component"
import { CalendarTestIds } from "Renderer/modules/calendar/calendar-test-ids.enum"
import { defineMessages } from "react-intl"
import { CalendarEvent } from "Renderer/models/calendar/calendar.interfaces"
import { UseTableSelect } from "Renderer/utils/hooks/useTableSelect"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import styled from "styled-components"
import Faker from "faker"

const messages = defineMessages({
  emptyStateTitle: { id: "view.name.calendar.noEvents" },
  emptyStateDescription: {
    id: "view.name.calendar.noEventsDescription",
  },
})

const Container = styled.div`
  overflow: auto;
`

interface Props {
  events: CalendarEvent[]
  openSelectVendorModal: () => void
  tableSelectHook: UseTableSelect<CalendarEvent>
  selectedEventIndex?: number
  onEventSelect: (item: CalendarEvent) => void
}

const CalendarUI: FunctionComponent<Props> = ({
  events,
  openSelectVendorModal,
  tableSelectHook,
  // selectedEventIndex,
  onEventSelect,
}) => {
  const [calendarEvents, setCalendarEvents] = useState()
  console.log({ calendarEvents })
  const todayStr = new Date().toISOString().replace(/T.*$/, "") // YYYY-MM-DD of today

  const INITIAL_EVENTS = [
    {
      id: 1,
      title: "All-day event",
      start: todayStr,
    },
    {
      id: 2,
      title: "Timed event",
      start: todayStr + "T12:00:00",
    },
  ]
  const handleDateSelect = (selectInfo: any) => {
    console.log("select")
    console.log({ selectInfo })
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection

    calendarApi.addEvent({
      id: Faker.random.uuid(),
      title: Faker.random.word(),
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      allDay: selectInfo.allDay,
    })
  }

  const handleEvents = (events: any) => {
    setCalendarEvents(events)
  }
  return (
    <>
      <CalendarPanel
        events={events}
        onEventSelect={onEventSelect}
        onSynchroniseClick={openSelectVendorModal}
        selectedEvents={tableSelectHook.selectedRows}
        allEventsSelected={tableSelectHook.allRowsSelected}
        toggleAll={tableSelectHook.toggleAll}
        resetRows={tableSelectHook.resetRows}
      />
      {events.length > 0 ? (
        <Container>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            initialView="timeGridWeek"
            initialEvents={INITIAL_EVENTS as any}
            editable
            selectable
            select={handleDateSelect}
            eventsSet={handleEvents}
          />
        </Container>
      ) : (
        <EmptyState
          title={messages.emptyStateTitle}
          description={messages.emptyStateDescription}
          data-testid={CalendarTestIds.NoEvents}
        />
      )}
    </>
  )
}

export default CalendarUI
