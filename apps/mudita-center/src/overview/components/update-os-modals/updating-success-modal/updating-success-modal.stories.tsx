/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import { Meta } from "@storybook/react"
import Story from "App/__deprecated__/renderer/components/storybook/story.component"
import { UpdatingSuccessModal } from "App/overview/components/update-os-modals/updating-success-modal/updating-success-modal.component"
import { action } from "@storybook/addon-actions"

export const UpdatingSuccessModalStory: FunctionComponent = () => {
  return (
    <Story transparentMode>
      <UpdatingSuccessModal
        open
        onClose={action("Close Updating Success Modal")}
      />
    </Story>
  )
}

export default {
  title: "Views|Overview/Update OS - Updating Success Modal",
  component: UpdatingSuccessModalStory,
} as Meta
