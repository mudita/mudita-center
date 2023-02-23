/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import { Meta } from "@storybook/react"
import Story from "App/__deprecated__/renderer/components/storybook/story.component"
import { OSUpdateModal } from "App/overview/components/update-os-modals/os-update-modal/os-update-modal.component"

export const OSUpdateModalStory: FunctionComponent = () => {
  return (
    <Story transparentMode>
      <OSUpdateModal open />
    </Story>
  )
}

export default {
  title: "Views|Overview/Update OS - OS Update Modal",
  component: OSUpdateModalStory,
} as Meta
