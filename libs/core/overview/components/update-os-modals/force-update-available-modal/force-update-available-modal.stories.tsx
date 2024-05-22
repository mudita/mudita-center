/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { action } from "@storybook/addon-actions"
import { Meta } from "@storybook/react"
import { ForceUpdateAvailableModal } from "Core/overview/components/update-os-modals/force-update-available-modal/force-update-available-modal.component"
import Story from "Core/__deprecated__/renderer/components/storybook/story.component"
import React, { FunctionComponent } from "react"

export const MultipleForceUpdateAvailableModalStory: FunctionComponent = () => {
  return (
    <Story transparentMode>
      <ForceUpdateAvailableModal
        open
        releases={[
          {
            version: "1.0.0",
            date: "2020-01-01 11:00",
          },
          {
            version: "1.0.1",
            date: "2020-01-01 11:00",
          },
        ]}
        onUpdate={action("On Update Available Modal")}
      />
    </Story>
  )
}

export const SingleForceUpdateAvailableModalStory: FunctionComponent = () => {
  return (
    <Story transparentMode>
      <ForceUpdateAvailableModal
        open
        releases={[
          {
            version: "1.0.1",
            date: "2020-01-01 11:00",
          },
        ]}
        onUpdate={action("On Update Available Modal")}
      />
    </Story>
  )
}

export default {
  title: "Views|Overview/Update OS - Force Update Available Modal",
  component: MultipleForceUpdateAvailableModalStory,
} as Meta
