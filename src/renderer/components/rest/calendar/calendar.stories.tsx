import { storiesOf } from "@storybook/react"
import React from "react"
import {
  SyncCalendarModal,
  SynchronizingFailedModal,
  SynchronizingFinishedModal,
  SynchronizingModal,
} from "Renderer/components/rest/calendar/calendar.modals"
import StoryContainer from "Renderer/components/storybook/story-container.component"
import Story from "Renderer/components/storybook/story.component"

storiesOf("Views|Calendar/Modals", module).add("All", () => {
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
