import { storiesOf } from "@storybook/react"
import React from "react"
import styled, { css } from "styled-components"
import { mockedCalendars } from "App/__mocks__/calendars-list"
import SelectVendorModal from "Renderer/components/rest/calendar/select-vendor-modal.component"
import SelectCalendarsModal from "Renderer/components/rest/calendar/select-calendars-modal.component"
import SynchronizingEventsModal from "Renderer/components/rest/calendar/synchronizing-events-modal.component"
import EventsSynchronizationFinishedModal from "Renderer/components/rest/calendar/synchronization-finished-modal.component"
import EventsSynchronizationFailedModal from "Renderer/components/rest/calendar/synchronization-failed.component"
import AuthorizationFailedModal from "Renderer/components/rest/calendar/authorization-failed.component"
import Story from "Renderer/components/storybook/story.component"
import { asyncNoop, noop } from "Renderer/utils/noop"
import StoryContainer from "Renderer/components/storybook/story-container.component"
import { Provider } from "Renderer/models/external-providers/external-providers.interface"
import CalendarUI from "Renderer/modules/calendar/calendar-ui.component"
import { action } from "@storybook/addon-actions"
import useTableSelect from "Renderer/utils/hooks/useTableSelect"
import { calendarSeed, eventsData } from "App/seeds/calendar"
import { CalendarEvent } from "Renderer/models/calendar/calendar.interfaces"
import ImportEventsModal from "App/calendar/components/import-events-modal/import-events-modal.component"
import { StoryModalWrapper } from "Renderer/components/core/modal/modal.styled.elements"

const Wrapper = styled.div`
  max-width: 97.5rem;
  min-height: 50rem;
  display: flex;
  flex-direction: column;
`

storiesOf("Views/Calendar/Main view", module)
  .add("With events", () => {
    const tableSelectHook = useTableSelect<CalendarEvent>(calendarSeed.events)
    return (
      <Wrapper>
        <CalendarUI
          events={calendarSeed.events}
          openSelectVendorModal={action("open vendor modal")}
          tableSelectHook={tableSelectHook}
          onEventSelect={action("event select")}
        />
      </Wrapper>
    )
  })
  .add("No events", () => {
    const tableSelectHook = useTableSelect<CalendarEvent>(calendarSeed.events)
    return (
      <Wrapper>
        <CalendarUI
          events={[]}
          openSelectVendorModal={action("open vendor modal")}
          tableSelectHook={tableSelectHook}
          onEventSelect={action("event select")}
        />
      </Wrapper>
    )
  })
storiesOf("Views/Calendar/Modals", module).add("All", () => (
  <StoryContainer
    title="Sync modals"
    customStyle={css`
      align-items: flex-start;
    `}
  >
    <Story title="Select provider" transparentMode>
      <SelectVendorModal
        onGoogleButtonClick={asyncNoop}
        onManualImportClick={noop}
      />
    </Story>
    <Story title="Select calendars" transparentMode>
      <SelectCalendarsModal calendars={mockedCalendars} onSynchronize={noop} />
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
      <AuthorizationFailedModal provider={Provider.Google} />
    </Story>
    <Story title="Import from ics file" transparentMode>
      <ImportEventsModal events={eventsData} />
    </Story>
  </StoryContainer>
))
