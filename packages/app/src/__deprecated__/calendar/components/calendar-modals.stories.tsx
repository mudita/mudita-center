/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { css } from "styled-components"
import { mockedCalendars } from "App/__mocks__/calendars-list"
import SelectVendorModal from "App/__deprecated__/calendar/components/select-vendor-modal/select-vendor-modal.component"
import SelectCalendarsModal from "App/__deprecated__/calendar/components/select-calendars-modal/select-calendars-modal.component"
import SynchronizingEventsModal from "App/__deprecated__/calendar/components/synchronizing-events-modal.component"
import EventsSynchronizationFinishedModal from "App/__deprecated__/calendar/components/synchronization-finished-modal.component"
import EventsSynchronizationFailedModal from "App/__deprecated__/calendar/components/synchronization-failed.component"
import AuthorizationFailedModal from "App/__deprecated__/calendar/components/authorization-failed.component"
import Story from "App/__deprecated__/renderer/components/storybook/story.component"
import { noop } from "App/__deprecated__/renderer/utils/noop"
import StoryContainer from "App/__deprecated__/renderer/components/storybook/story-container.component"
import { Provider } from "App/__deprecated__/renderer/models/external-providers/external-providers.interface"
import { action } from "@storybook/addon-actions"
import { eventsData } from "App/__deprecated__/seeds/calendar"
import ImportEventsModal from "App/__deprecated__/calendar/components/import-events-modal/import-events-modal.component"
import ExportErrorModal from "App/__deprecated__/calendar/components/export-error-modal/export-error-modal.component"

export default {
  title: 'Views/Calendar/Modals',
};

export const All = () => (
  <StoryContainer
    title="Sync modals"
    customStyle={css`
      align-items: flex-start;
    `}
  >
    <Story title="Select provider" transparentMode>
      <SelectVendorModal
        onGoogleButtonClick={action("clicked on google button")}
        onOutlookButtonClick={action("clicked on outlook button ")}
        onManualImportClick={action("clicked on manual import button")}
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
);
