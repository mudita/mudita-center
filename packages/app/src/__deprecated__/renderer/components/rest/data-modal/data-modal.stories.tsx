/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { StoryModalWrapper } from "App/__deprecated__/renderer/components/core/modal/modal.styled.elements"
import { action } from "@storybook/addon-actions"
import Story from "App/__deprecated__/renderer/components/storybook/story.component"
import {
  ErrorDataModal,
  ErrorWithRetryDataModal,
  LoadingStateDataModal,
} from "App/__deprecated__/renderer/components/rest/data-modal/data.modals"

export default {
  title: "Components|Rest/Data Modal",
}

export const Error = () => (
  <Story transparentMode>
    <StoryModalWrapper>
      <ErrorDataModal />
    </StoryModalWrapper>
  </Story>
)

export const ErrorWithRetry = () => (
  <Story transparentMode>
    <StoryModalWrapper>
      <ErrorWithRetryDataModal onRetry={action("Retry")} />
    </StoryModalWrapper>
  </Story>
)

export const _LoadingStateDataModal = () => (
  <Story transparentMode>
    <StoryModalWrapper>
      <LoadingStateDataModal />
    </StoryModalWrapper>
  </Story>
)
