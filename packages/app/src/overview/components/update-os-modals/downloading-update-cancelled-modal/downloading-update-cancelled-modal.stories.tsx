/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import { Meta } from "@storybook/react"
import Story from "App/__deprecated__/renderer/components/storybook/story.component"
import { DownloadingUpdateCancelledModal } from "App/overview/components/update-os-modals/downloading-update-cancelled-modal/downloading-update-cancelled-modal.component"
import { action } from "@storybook/addon-actions"

export const DownloadingUpdateCancelledModalStory: FunctionComponent = () => {
  return (
    <Story transparentMode>
      <DownloadingUpdateCancelledModal
        open
        onClose={action("Close Downloading Update Cancelled Modal")}
      />
    </Story>
  )
}

export default {
  title: "Views|Overview/Update OS - Downloading Update Cancelled Modal",
  component: DownloadingUpdateCancelledModalStory,
} as Meta
