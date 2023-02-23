/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import { Meta } from "@storybook/react"
import Story from "App/__deprecated__/renderer/components/storybook/story.component"
import { action } from "@storybook/addon-actions"
import { UpdateNotAvailableModal } from "App/overview/components/update-os-modals/update-not-available-modal/update-not-available-modal.component"

export const UpdateNotAvailableModalStory: FunctionComponent = () => {
  return (
    <Story transparentMode>
      <UpdateNotAvailableModal
        open
        version={"1.0.0"}
        onClose={action("Close Update Not Available Modal")}
      />
    </Story>
  )
}

export default {
  title: "Views|Overview/Update OS - Update Not Available Modal",
  component: UpdateNotAvailableModalStory,
} as Meta
