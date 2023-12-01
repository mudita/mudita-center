/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import { Meta } from "@storybook/react"
import Story from "App/__deprecated__/renderer/components/storybook/story.component"
import { action } from "@storybook/addon-actions"
import { DownloadingUpdateFailedModal } from "App/overview/components/update-os-modals/downloading-update-failed-modal/downloading-update-failed-modal.component"

export const DownloadingUpdateFailedModalStory: FunctionComponent = () => {
  return (
    <Story transparentMode>
      <DownloadingUpdateFailedModal
        open
        onContactSupport={action("Contact support Downloading Failed Modal")}
        onGoToHelp={action("Go to help Downloading Failed Modal")}
        onClose={action("Close Downloading Downloading Failed Modal")}
      />
    </Story>
  )
}

export default {
  title: "Views|Overview/Update OS - Downloading Update Failed Modal",
  component: DownloadingUpdateFailedModalStory,
} as Meta
