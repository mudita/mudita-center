import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import DevModeWrapper from "Renderer/components/rest/dev-mode-wrapper/dev-mode-wrapper.container"
import Button from "Renderer/components/core/button/button.component"
import CalendarPanel from "Renderer/components/rest/calendar/calendar-panel.component"
import { noop } from "Renderer/utils/noop"
import EventsList from "Renderer/components/rest/calendar/events-list.component"
import { EmptyState } from "Renderer/components/core/table/table.component"
import { CalendarTestIds } from "Renderer/modules/calendar/calendar-test-ids.enum"
import { defineMessages } from "react-intl"
import useTableSelect from "Renderer/utils/hooks/useTableSelect"
import { CalendarEvent } from "Renderer/models/calendar/calendar.interfaces"

const messages = defineMessages({
  allEvents: {
    id: "view.name.calendar.allEvents",
  },
  emptyStateTitle: { id: "view.name.calendar.noEvents" },
  emptyStateDescription: {
    id: "view.name.calendar.noEventsDescription",
  },
})

interface Props {
  events: CalendarEvent[]
  _devClearEvents?: () => void
  openSelectVendorModal: () => void
}

const CalendarUI: FunctionComponent<Props> = ({
  events,
  openSelectVendorModal,
  _devClearEvents,
}) => {
  const tableSelectHook = useTableSelect<CalendarEvent>(events)
  return (
    <>
      <DevModeWrapper>
        <Button onClick={_devClearEvents} label="Clear events" />
      </DevModeWrapper>
      <CalendarPanel
        events={events}
        onEventSelect={noop}
        onEventValueChange={noop}
        onSynchroniseClick={openSelectVendorModal}
      />
      {events.length > 0 ? (
        <EventsList events={events} {...tableSelectHook} />
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
