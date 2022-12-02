/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import { Meta } from "@storybook/react"
import Story from "App/__deprecated__/renderer/components/storybook/story.component"
import { action } from "@storybook/addon-actions"
import { UpdateServerErrorModal } from "App/overview/components/update-os-modals/update-server-error-modal/update-server-error-modal.component"

export const UpdateServerErrorModalStory: FunctionComponent = () => {
  return (
    <Story transparentMode>
      <UpdateServerErrorModal
        open
        onRetry={action("Retry Update Server Error Modal")}
        onClose={action("Close Update Server Error Modal")}
      />
    </Story>
  )
}

export default {
  title: "Views|Overview/Update OS - Update Server Error Modal",
  component: UpdateServerErrorModalStory,
} as Meta
