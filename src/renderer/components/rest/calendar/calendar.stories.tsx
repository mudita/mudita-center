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
import CalendarInputSearch from "Renderer/components/rest/calendar/calendar-input-search.component"
import { CalendarEvent } from "Renderer/modules/calendar/calendar.interface"
import { noop } from "Renderer/utils/noop"
import Calendar from "Renderer/modules/calendar/calendar.component"

const Wrapper = styled.div`
  max-width: 97.5rem;
  min-height: 50rem;
  display: flex;
  flex-direction: column;
`

storiesOf("Views/Calendar/Main view", module)
  .add("With events", () => (
    <Wrapper>
      <Calendar events={calendarSeed} />
    </Wrapper>
  ))
  .add("No events", () => (
    <Wrapper>
      <Calendar events={[]} />
    </Wrapper>
  ))

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
