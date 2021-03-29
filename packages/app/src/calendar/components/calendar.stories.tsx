/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { storiesOf } from "@storybook/react"
import React from "react"
import styled, { css } from "styled-components"
import { mockedCalendars } from "App/__mocks__/calendars-list"
import SelectVendorModal from "App/calendar/components/select-vendor-modal/select-vendor-modal.component"
import SelectCalendarsModal from "App/calendar/components/select-calendars-modal/select-calendars-modal.component"
import SynchronizingEventsModal from "App/calendar/components/synchronizing-events-modal.component"
import EventsSynchronizationFinishedModal from "App/calendar/components/synchronization-finished-modal.component"
import EventsSynchronizationFailedModal from "App/calendar/components/synchronization-failed.component"
import AuthorizationFailedModal from "App/calendar/components/authorization-failed.component"
import Story from "Renderer/components/storybook/story.component"
import { asyncNoop, noop } from "Renderer/utils/noop"
import StoryContainer from "Renderer/components/storybook/story-container.component"
import { Provider } from "Renderer/models/external-providers/external-providers.interface"
import CalendarUIStateless from "App/calendar/components/calendar-ui-stateless.component"
import { action } from "@storybook/addon-actions"
import useTableSelect from "Renderer/utils/hooks/useTableSelect"
import { calendarSeed, eventsData } from "App/seeds/calendar"
import { CalendarEvent } from "App/calendar/store/calendar.interfaces"
import ImportEventsModal from "App/calendar/components/import-events-modal/import-events-modal.component"
import ExportErrorModal from "App/calendar/components/export-error-modal/export-error-modal.component"

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
        <CalendarUIStateless
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
        <CalendarUIStateless
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
    <Story title="Export failed" transparentMode>
      <ExportErrorModal />
    </Story>
  </StoryContainer>
))
