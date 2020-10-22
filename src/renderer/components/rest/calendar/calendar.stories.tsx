import { storiesOf } from "@storybook/react"
import React, { useState } from "react"
import styled from "styled-components"
import { calendarSeed } from "App/seeds/calendar"
import { mockedGoogleCalendars } from "App/__mocks__/google-calendars-list"
import SelectVendorModal from "Renderer/components/rest/calendar/select-vendor-modal.component"
import SelectCalendarsModal from "Renderer/components/rest/calendar/select-calendars-modal.component"
import SynchronizingEventsModal from "Renderer/components/rest/calendar/synchronizing-events-modal.component"
import EventsSynchronizationFinishedModal from "Renderer/components/rest/calendar/synchronization-finished-modal.component"
import EventsSynchronizationFailedModal from "Renderer/components/rest/calendar/synchronization-failed.component"
import GoogleAuthorizationFailedModal from "Renderer/components/rest/calendar/google-auth-failed.component"
import Story from "Renderer/components/storybook/story.component"
import CalendarInputSearch from "Renderer/components/rest/calendar/calendar-input-search.component"
import { CalendarEvent } from "Renderer/modules/calendar/calendar.interface"
import { noop } from "Renderer/utils/noop"
import StoryContainer from "Renderer/components/storybook/story-container.component"

storiesOf("Views/Calendar/Modals", module).add("All", () => (
  <StoryContainer title="Sync modals" column>
    <Story title="Synchronization finished" transparentMode>
      <SelectVendorModal onGoogleButtonClick={noop} />
    </Story>
    <Story title="Synchronization failed" transparentMode>
      <SelectCalendarsModal
        calendars={mockedGoogleCalendars}
        onSynchronize={noop}
      />
    </Story>
    <Story title="Synchronization progress" transparentMode>
      <SynchronizingEventsModal />
    </Story>
    <Story title="Synchronization finished" transparentMode>
      <EventsSynchronizationFinishedModal importedEventsCount={123} />
    </Story>
    <Story title="Synchronization failed" transparentMode>
      <EventsSynchronizationFailedModal onActionButtonClick={noop} />
    </Story>
    <Story title="Google authorization failed" transparentMode>
      <GoogleAuthorizationFailedModal />
    </Story>
  </StoryContainer>
))

const InputSearch = styled(CalendarInputSearch)`
  min-width: 38rem;
`

storiesOf("Views/Calendar", module).add("Input", () => {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent>()
  return (
    <Story title="Input Search">
      <InputSearch
        events={calendarSeed}
        selectedEvent={selectedEvent}
        onEventSelect={setSelectedEvent}
        onEventValueChange={noop}
      />
    </Story>
  )
})
