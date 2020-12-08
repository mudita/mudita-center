import { storiesOf } from "@storybook/react"
import Story from "Renderer/components/storybook/story.component"
import { StoryModalWrapper } from "Renderer/components/core/modal/modal.styled.elements"
import React from "react"
import SyncContactsModal from "Renderer/components/rest/sync-modals/sync-contacts-modal.component"
import { noop } from "Renderer/utils/noop"
import { Type } from "Renderer/components/core/icon/icon.config"
import { intl } from "Renderer/utils/intl"
import { SynchronizingContactsModal } from "Renderer/components/rest/sync-modals/synchronizing-contacts-modal.component"
import ImportContactsModal from "Renderer/components/rest/sync-modals/import-contacts-modal.component"
import { action } from "@storybook/addon-actions"
import ImportingContactsModal from "Renderer/components/rest/sync-modals/importing-contacts-modal.component"
import StoryContainer from "Renderer/components/storybook/story-container.component"

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
          onFailure={noop}
          onSuccess={noop}
          icon={Type.SynchronizeContacts}
        />
      </StoryModalWrapper>
    </Story>
  ))
  .add("Import contacts modal", () => (
    <Story transparentMode>
      <StoryModalWrapper>
        <ImportContactsModal
          onActionButtonClick={noop}
          contacts={[
            {
              firstName: "John",
              lastName: "Doe",
              email: "johndoe@example.com",
            },
            {
              firstName: "Jane",
              lastName: "Doe",
              primaryPhoneNumber: "+1 234 567 890",
              email: "janedoe@example.com",
            },
            { lastName: "Smith", primaryPhoneNumber: "+ 2 345 678 901" },
          ]}
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
