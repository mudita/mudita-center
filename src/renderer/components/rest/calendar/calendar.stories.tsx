import { storiesOf } from "@storybook/react"
import React, { useState } from "react"
import styled from "styled-components"
import { calendarSeed } from "App/seeds/calendar"
import {
  SyncCalendarModal,
  SynchronizingFailedModal,
  SynchronizingFinishedModal,
  SynchronizingModal,
} from "Renderer/components/rest/calendar/calendar.modals"
import StoryContainer from "Renderer/components/storybook/story-container.component"
import Story from "Renderer/components/storybook/story.component"
import CalendarInputSelect from "Renderer/components/rest/calendar/calendar-input-select.component"
import { CalendarEvent } from "Renderer/modules/calendar/calendar.interface"

storiesOf("Views/Calendar/Modals", module).add("All", () => {
  return (
    <StoryContainer title="Sync modals">
      <Story title="Sync finished">
        <SynchronizingFinishedModal />
      </Story>
      <Story title="Sync failed">
        <SynchronizingFailedModal />
      </Story>
      <Story title="Sync progress">
        <SynchronizingModal />
      </Story>
      <Story title="Start sync">
        <SyncCalendarModal />
      </Story>
    </StoryContainer>
  )
})

const InputSelect = styled(CalendarInputSelect)`
  min-width: 38rem;
`

storiesOf("Views/Calendar", module).add("Input", () => {
  const [eventSelected, setEventSelected] = useState<CalendarEvent>()
  return (
    <Story title="Input Select">
      <InputSelect
        events={calendarSeed}
        eventSelected={eventSelected}
        onEventSelect={setEventSelected}
      />
    </Story>
  )
})
