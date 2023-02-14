/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import { Meta } from "@storybook/react"
import Story from "App/__deprecated__/renderer/components/storybook/story.component"
import { action } from "@storybook/addon-actions"
import { NotEnoughSpaceModal } from "App/overview/components/update-os-modals/not-enough-space-modal/not-enough-space-modal.component"
import { DeviceType } from "App/device"

export const NotEnoughSpaceModalStory: FunctionComponent = () => {
  return (
    <Story transparentMode>
      <NotEnoughSpaceModal
        open
        onClose={action("Close Not Enough Space Modal")}
        fileSize={0}
      />
    </Story>
  )
}

export default {
  title: "Views|Overview/Update OS - Not Enough Space Modal",
  component: NotEnoughSpaceModalStory,
} as Meta
