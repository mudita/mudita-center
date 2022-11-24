/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import { Meta } from "@storybook/react"
import Story from "App/__deprecated__/renderer/components/storybook/story.component"
import { action } from "@storybook/addon-actions"
import { UpdateAvailableModal } from "App/overview/components/update-os-modals/update-available-modal/update-available-modal.component"

export const UpdateAvailableMultipleUpdatesModalStory: FunctionComponent =
  () => {
    return (
      <Story transparentMode>
        <UpdateAvailableModal
          open
          releases={[
            {
              version: "1.0.0",
              date: new Date("2020-01-01 11:00"),
            },
            {
              version: "1.0.1",
              date: new Date("2020-01-01 11:00"),
            },
          ]}
          onDownload={action("Close Update Available Modal")}
          onClose={action("Close Update Available Modal")}
        />
      </Story>
    )
  }

export const UpdateAvailableSingleUpdatesModalStory: FunctionComponent = () => {
  return (
    <Story transparentMode>
      <UpdateAvailableModal
        open
        releases={[
          {
            version: "1.0.0",
            date: new Date("2020-01-01 11:00"),
          },
        ]}
        onDownload={action("Close Update Available Modal")}
        onClose={action("Close Update Available Modal")}
      />
    </Story>
  )
}

export default {
  title: "Views|Overview/Update OS - Update Available Modal",
  component: UpdateAvailableMultipleUpdatesModalStory,
} as Meta
