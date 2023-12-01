/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import { Meta } from "@storybook/react"
import Story from "App/__deprecated__/renderer/components/storybook/story.component"
import { action } from "@storybook/addon-actions"
import { DevUpdateModal } from "App/overview/components/update-os-modals/dev-update-modal/dev-update-modal.component"

export const DevUpdateModalStory: FunctionComponent = () => {
  return (
    <Story transparentMode>
      <DevUpdateModal
        install
        prerelease
        open
        version={"1.0.0"}
        date={"10/10/2020"}
        action={action("Action Dev Update Modal")}
        onClose={action("Close Dev Update Modal")}
      />
    </Story>
  )
}

export default {
  title: "Views|Overview/Update OS - Dev Update Modal",
  component: DevUpdateModalStory,
} as Meta
