/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { action } from "@storybook/addon-actions"
import { Meta } from "@storybook/react"
import { CheckForUpdateFailedModal } from "Core/overview/components/update-os-modals/check-for-update-failed-modal/check-for-update-failed-modal.component"
import Story from "Core/__deprecated__/renderer/components/storybook/story.component"
import React, { FunctionComponent } from "react"

export const CheckForUpdateFailedModalStory: FunctionComponent = () => {
  return (
    <Story transparentMode>
      <CheckForUpdateFailedModal
        open
        onClose={action("Check For Update Failed Modal on close")}
        onTryAgain={action("Check For Update Failed Modal try again")}
        onContactSupport={action(
          "Check For Update Failed Modal contact support action"
        )}
      />
    </Story>
  )
}

export default {
  title: "Views|Overview/Update OS - Check For Update Failed Modal",
  component: CheckForUpdateFailedModalStory,
} as Meta
