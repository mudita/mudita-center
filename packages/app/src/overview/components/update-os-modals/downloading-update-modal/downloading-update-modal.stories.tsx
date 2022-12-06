/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import { Meta } from "@storybook/react"
import Story from "App/__deprecated__/renderer/components/storybook/story.component"
import { action } from "@storybook/addon-actions"
import { DownloadingUpdateModal } from "App/overview/components/update-os-modals/downloading-update-modal/downloading-update-modal.component"

export const DownloadingUpdateModalStory: FunctionComponent = () => {
  return (
    <Story transparentMode>
      <DownloadingUpdateModal
        open
        percent={50}
        speed={1}
        timeLeft={1}
        onCancel={action("Cancel Downloading Update Modal")}
      />
    </Story>
  )
}

export default {
  title: "Views|Overview/Update OS - Downloading Update Modal",
  component: DownloadingUpdateModalStory,
} as Meta
