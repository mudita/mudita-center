/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import React from "react"
import { storiesOf } from "@storybook/react"
import { StoryModalWrapper } from "Renderer/components/core/modal/modal.styled.elements"
import { action } from "@storybook/addon-actions"
import Story from "Renderer/components/storybook/story.component"
import {
  ErrorDataModal,
  ErrorWithRetryDataModal,
  LoadingStateDataModal,
} from "Renderer/components/rest/data-modal/data.modals"

storiesOf("Components|Rest/Data Modal", module)
  .add("Error", () => (
    <Story transparentMode>
      <StoryModalWrapper>
        <ErrorDataModal />
      </StoryModalWrapper>
    </Story>
  ))
  .add("Error With Retry", () => (
    <Story transparentMode>
      <StoryModalWrapper>
        <ErrorWithRetryDataModal onRetry={action("Retry")} />
      </StoryModalWrapper>
    </Story>
  ))
  .add("Loading State Data Modal", () => (
    <Story transparentMode>
      <StoryModalWrapper>
        <LoadingStateDataModal />
      </StoryModalWrapper>
    </Story>
  ))
