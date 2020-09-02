import { storiesOf } from "@storybook/react"
import Story from "Renderer/components/storybook/story.component"
import { StoryModalWrapper } from "Renderer/components/core/modal/modal.styled.elements"
import React from "react"
import SyncContactsModal from "Renderer/components/rest/sync-modals/sync-contacts-modal.component"
import { noop } from "Renderer/utils/noop"
import { Type } from "Renderer/components/core/icon/icon.config"
import { ProgressModal } from "Renderer/components/core/modal/progress-modal.component"
import { intl } from "Renderer/utils/intl"

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
        <ProgressModal
          body={{
            id: "view.name.phone.contacts.synchronizingModalBody",
          }}
          subtitle={{
            id: "view.name.phone.contacts.synchronizingModalTitle",
          }}
          closeButtonLabel={intl.formatMessage({
            id: "view.generic.button.cancel",
          })}
          onFailure={noop}
          onSuccess={noop}
          icon={Type.SynchronizeContacts}
        />
      </StoryModalWrapper>
    </Story>
  ))
