import { storiesOf } from "@storybook/react"
import Story from "Renderer/components/storybook/story.component"
import { StoryModalWrapper } from "Renderer/components/core/modal/modal.styled.elements"
import React from "react"
import SyncContactsModal from "Renderer/components/rest/sync-modals/sync-contacts-modal.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import { intl } from "Renderer/utils/intl"
import { SynchronizingContactsModal } from "Renderer/components/rest/sync-modals/synchronizing-contacts-modal.component"

storiesOf("Components|Rest/Sync Contacts Modal", module)
  .add("Choose sync option modal", () => (
    <Story transparentMode>
      <StoryModalWrapper>
        <SyncContactsModal />
      </StoryModalWrapper>
    </Story>
  ))
  .add("Synchronizing Contacts Modal", () => (
    <Story transparentMode>
      <StoryModalWrapper>
        <SynchronizingContactsModal
          body={{
            id: "view.name.phone.contacts.synchronizingModalBody",
          }}
          subtitle={{
            id: "view.name.phone.contacts.synchronizingModalTitle",
          }}
          closeButtonLabel={intl.formatMessage({
            id: "view.generic.button.cancel",
          })}
          icon={Type.SynchronizeContacts}
        />
      </StoryModalWrapper>
    </Story>
  ))
