import { storiesOf } from "@storybook/react"
import Story from "Renderer/components/storybook/story.component"
import { StoryModalWrapper } from "Renderer/components/core/modal/modal.styled.elements"
import React from "react"
import SyncContactsModal from "App/contacts/components/sync-contacts-modal/sync-contacts-modal.component"
import { action } from "@storybook/addon-actions"
import ImportingContactsModal from "App/contacts/components/importing-contacts-modal/importing-contacts-modal.component"
import StoryContainer from "Renderer/components/storybook/story-container.component"
import { noop } from "Renderer/utils/noop"

storiesOf("Components|Rest/Sync Contacts Modal", module)
  .add("Choose sync option modal", () => (
    <Story transparentMode>
      <StoryModalWrapper>
        <SyncContactsModal
          onGoogleButtonClick={noop}
          onManualImportClick={action("Import")}
        />
      </StoryModalWrapper>
    </Story>
  ))
  .add("Importing contacts modal", () => (
    <StoryContainer>
      <Story transparentMode title="Importing in progress">
        <StoryModalWrapper>
          <ImportingContactsModal count={15} total={50} />
        </StoryModalWrapper>
      </Story>
      <Story transparentMode title="Importing finished">
        <StoryModalWrapper>
          <ImportingContactsModal count={50} total={50} />
        </StoryModalWrapper>
      </Story>
    </StoryContainer>
  ))
