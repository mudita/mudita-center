/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import { Meta } from "@storybook/react"
import Story from "App/__deprecated__/renderer/components/storybook/story.component"
import { action } from "@storybook/addon-actions"
import { DownloadingUpdateFinishedModal } from "App/overview/components/update-os-modals/downloading-update-finished-modal/downloading-update-finished-modal.component"

export const DownloadingUpdateFinishedModalStory: FunctionComponent = () => {
  return (
    <Story transparentMode>
      <DownloadingUpdateFinishedModal
        downloadedReleases={[
          {
            version: "1.2.0",
          },
          {
            version: "1.3.0",
          },
        ]}
        open
        onOsUpdate={action("Close Downloading Update Finished Modal")}
        onClose={action("Close Downloading Update Finished Modal")}
      />
    </Story>
  )
}

export default {
  title: "Views|Overview/Update OS - Downloading Update Finished Modal",
  component: DownloadingUpdateFinishedModalStory,
} as Meta
