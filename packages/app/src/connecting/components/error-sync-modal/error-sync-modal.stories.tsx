/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { Meta } from "@storybook/react"
import Story from "App/__deprecated__/renderer/components/storybook/story.component"
import ErrorSyncModal from "App/connecting/components/error-sync-modal/error-sync-modal"
import { noop } from "App/__deprecated__/renderer/utils/noop"

export const ErrorSyncModalStory = () => {
  return (
    <Story transparentMode>
      <ErrorSyncModal open closeModal={noop} onRetry={noop} />
    </Story>
  )
}

export default {
  title: "Views|Connecting/Backup Modal Dialogs",
  component: ErrorSyncModalStory,
} as Meta
