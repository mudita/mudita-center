/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import CalendarPanel from "App/calendar/components/calendar-panel.component"
import EventsList from "App/calendar/components/events-list.component"
import { EmptyState } from "Renderer/components/core/table/table.component"
import { CalendarTestIds } from "App/calendar/calendar-test-ids.enum"
import { defineMessages } from "react-intl"
import { CalendarEvent } from "App/calendar/store/calendar.interfaces"
import { UseTableSelect } from "Renderer/utils/hooks/useTableSelect"

const messages = defineMessages({
  emptyStateTitle: { id: "view.name.calendar.noEvents" },
  emptyStateDescription: {
    id: "view.name.calendar.noEventsDescription",
  },
})

interface Props {
  events: CalendarEvent[]
  openSelectVendorModal: () => void
  tableSelectHook: UseTableSelect<CalendarEvent>
  selectedEventIndex?: number
  onEventSelect: (item: CalendarEvent) => void
}

const CalendarUIStateless: FunctionComponent<Props> = ({
  events,
  openSelectVendorModal,
  tableSelectHook,
  selectedEventIndex,
  onEventSelect,
}) => {
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
        <EventsList
          events={events}
          selectedEventIndex={selectedEventIndex}
          {...tableSelectHook}
        />
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

export default CalendarUIStateless
