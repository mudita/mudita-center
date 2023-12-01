/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import { Meta } from "@storybook/react"
import Story from "App/__deprecated__/renderer/components/storybook/story.component"
import { CheckingUpdatesModal } from "App/overview/components/update-os-modals/checking-updates-modal/checking-updates-modal.component"

export const CheckingUpdatesModalStory: FunctionComponent = () => {
  return (
    <Story transparentMode>
      <CheckingUpdatesModal open />
    </Story>
  )
}

export default {
  title: "Views|Overview/Update OS - Checking Updates Modal",
  component: CheckingUpdatesModalStory,
} as Meta
