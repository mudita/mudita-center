/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import { Meta } from "@storybook/react"
import Story from "App/__deprecated__/renderer/components/storybook/story.component"
import { action } from "@storybook/addon-actions"
import { UpdateInterruptedModal } from "App/overview/components/update-os-modals/update-interrupted-modal/update-interrupted-modal.component"

export const UpdateInterruptedModalStory: FunctionComponent = () => {
  return (
    <Story transparentMode>
      <UpdateInterruptedModal
        open
        onClose={action("Close Update Interrupted Modal")}
        alreadyInstalledReleases={[{ version: "1.1.0" }, { version: "1.2.0" }]}
      />
    </Story>
  )
}

export default {
  title: "Views|Overview/Update OS - Update Interrupted Modal",
  component: UpdateInterruptedModalStory,
} as Meta
