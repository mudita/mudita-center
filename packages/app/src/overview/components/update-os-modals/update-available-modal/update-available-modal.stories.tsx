/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import { Meta } from "@storybook/react"
import Story from "App/__deprecated__/renderer/components/storybook/story.component"
import { action } from "@storybook/addon-actions"
import { UpdateAvailableModal } from "App/overview/components/update-os-modals/update-available-modal/update-available-modal.component"

export const UpdateAvailableModalStory: FunctionComponent = () => {
  return (
    <Story transparentMode>
      <UpdateAvailableModal
        open
        version={"1.0.0"}
        date={"10/10/2020"}
        onDownload={action("Close Update Available Modal")}
        onClose={action("Close Update Available Modal")}
      />
    </Story>
  )
}

export default {
  title: "Views|Overview/Update OS - Update Available Modal",
  component: UpdateAvailableModalStory,
} as Meta
