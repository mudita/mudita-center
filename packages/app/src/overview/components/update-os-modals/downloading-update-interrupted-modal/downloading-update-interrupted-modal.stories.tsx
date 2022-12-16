/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { action } from "@storybook/addon-actions"
import { Meta } from "@storybook/react"
import { DownloadingUpdateInterruptedModal } from "App/overview/components/update-os-modals/downloading-update-interrupted-modal/downloading-update-interrupted-modal.component"
import Story from "App/__deprecated__/renderer/components/storybook/story.component"
import React, { FunctionComponent } from "react"

export const DownloadingUpdateInterruptedModalStory: FunctionComponent = () => {
  const releases = [
    {
      version: "1.2.0",
    },
    {
      version: "1.3.0",
    },
  ]

  return (
    <Story transparentMode>
      <DownloadingUpdateInterruptedModal
        open
        onClose={action("Close Downloading Update Interrupted Modal")}
        alreadyDownloadedReleases={releases}
      />
    </Story>
  )
}

export default {
  title: "Views|Overview/Update OS - Downloading Update Interrupted Modal",
  component: DownloadingUpdateInterruptedModalStory,
} as Meta
