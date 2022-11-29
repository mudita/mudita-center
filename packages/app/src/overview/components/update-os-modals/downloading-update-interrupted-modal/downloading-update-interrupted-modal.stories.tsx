/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import { Meta } from "@storybook/react"
import Story from "App/__deprecated__/renderer/components/storybook/story.component"
import { action } from "@storybook/addon-actions"
import { DownloadingUpdateInterruptedModal } from "App/overview/components/update-os-modals/downloading-update-interrupted-modal/downloading-update-interrupted-modal.component"

export const DownloadingUpdateInterruptedModalStory: FunctionComponent = () => {
  return (
    <Story transparentMode>
      <DownloadingUpdateInterruptedModal
        open
        onRetry={action("Retry Downloading Update Interrupted Modal")}
        onClose={action("Close Downloading Update Interrupted Modal")}
      />
    </Story>
  )
}

export default {
  title: "Views|Overview/Update OS - Downloading Update Interrupted Modal",
  component: DownloadingUpdateInterruptedModalStory,
} as Meta
