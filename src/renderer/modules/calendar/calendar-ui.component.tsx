import React, { MutableRefObject } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import DevModeWrapper from "Renderer/components/rest/dev-mode-wrapper/dev-mode-wrapper.container"
import Button from "Renderer/components/core/button/button.component"
import CalendarPanel from "Renderer/components/rest/calendar/calendar-panel.component"
import EventsList from "Renderer/components/rest/calendar/events-list.component"
import { EmptyState } from "Renderer/components/core/table/table.component"
import { CalendarTestIds } from "Renderer/modules/calendar/calendar-test-ids.enum"
import { defineMessages } from "react-intl"
import { CalendarEvent } from "Renderer/models/calendar/calendar.interfaces"
import { UseTableSelect } from "Renderer/utils/hooks/useTableSelect"

const messages = defineMessages({
  emptyStateTitle: { id: "view.name.calendar.noEvents" },
  emptyStateDescription: {
    id: "view.name.calendar.noEventsDescription",
  },
})

interface Props {
  events: CalendarEvent[]
  _devClearEvents?: () => void
  openSelectVendorModal: () => void
  tableSelectHook: UseTableSelect<CalendarEvent>
  selectedEventIndex?: number
  listRef: MutableRefObject<HTMLDivElement>
  onEventSelect: (item: CalendarEvent) => void
}

const CalendarUI: FunctionComponent<Props> = ({
  events,
  openSelectVendorModal,
  _devClearEvents,
  tableSelectHook,
  selectedEventIndex,
  listRef,
  onEventSelect,
}) => {
  return (
    <>
      <DevModeWrapper>
        <Button onClick={_devClearEvents} label="Clear events" />
      </DevModeWrapper>
      <CalendarPanel
        events={events}
        onEventSelect={onEventSelect}
        onSynchroniseClick={openSelectVendorModal}
      />
      {events.length > 0 ? (
        <EventsList
          events={events}
          selectedEventIndex={selectedEventIndex}
          listRef={listRef}
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

export default CalendarUI
