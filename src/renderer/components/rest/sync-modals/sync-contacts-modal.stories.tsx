import { storiesOf } from "@storybook/react"
import Story from "Renderer/components/storybook/story.component"
import { StoryModalWrapper } from "Renderer/components/core/modal/modal.styled.elements"
import React from "react"
import SyncContactsModal from "Renderer/components/rest/sync-modals/sync-contacts-modal.component"

storiesOf("Components|Rest/Sync Contacts Modal", module).add("Default", () => (
  <Story transparentMode>
    <StoryModalWrapper>
      <SyncContactsModal />
    </StoryModalWrapper>
  </Story>
))
