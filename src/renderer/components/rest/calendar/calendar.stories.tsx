import { storiesOf } from "@storybook/react"
import React from "react"
import {
  SyncCalendarModal,
  SynchronizingFailedModal,
  SynchronizingFinishedModal,
  SynchronizingModal,
} from "Renderer/components/rest/calendar/calendar.modals"
import { action } from "@storybook/addon-actions"

storiesOf("Views|Calendar/Modals", module)
  .add("Synchronizing finished", () => <SynchronizingFinishedModal />)
  .add("Synchronizing failed", () => (
    <SynchronizingFailedModal onRefresh={action("Refresh")} />
  ))
  .add("Synchronizing", () => <SynchronizingModal />)
  .add("Synchronize calendar", () => <SyncCalendarModal />)
