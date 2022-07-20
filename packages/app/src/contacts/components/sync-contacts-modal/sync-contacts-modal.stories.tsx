/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { storiesOf } from "@storybook/react"
import Story from "App/__deprecated__/renderer/components/storybook/story.component"
import { StoryModalWrapper } from "App/__deprecated__/renderer/components/core/modal/modal.styled.elements"
import React from "react"
import SyncContactsModal from "App/contacts/components/sync-contacts-modal/sync-contacts-modal.component"
import { action } from "@storybook/addon-actions"
import ImportingContactsModal from "App/contacts/components/importing-contacts-modal/importing-contacts-modal.component"
import StoryContainer from "App/__deprecated__/renderer/components/storybook/story-container.component"
import { noop } from "App/__deprecated__/renderer/utils/noop"

storiesOf("Components|Rest/Sync Contacts Modal", module)
  .add("Choose sync option modal", () => (
    <Story transparentMode>
      <StoryModalWrapper>
        <SyncContactsModal
          onOutlookButtonClick={noop}
          onGoogleButtonClick={noop}
          onManualImportClick={action("Import")}
          open
        />
      </StoryModalWrapper>
    </Story>
  ))
  .add("Importing contacts modal", () => (
    <StoryContainer>
      <Story transparentMode title="Importing in progress">
        <StoryModalWrapper>
          <ImportingContactsModal open count={15} total={50} />
        </StoryModalWrapper>
      </Story>
      <Story transparentMode title="Importing finished">
        <StoryModalWrapper>
          <ImportingContactsModal open count={50} total={50} />
        </StoryModalWrapper>
      </Story>
    </StoryContainer>
  ))
