/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { Meta } from "@storybook/react"
import Story from "App/__deprecated__/renderer/components/storybook/story.component"
import CriticalBatteryLevelModal from "App/connecting/components/critical-battery-level-modal/critical-battery-level-modal"
import { noop } from "App/__deprecated__/renderer/utils/noop"

export const CriticalBatteryLevelModalStory = (): JSX.Element => {
  return (
    <Story transparentMode>
      <CriticalBatteryLevelModal open closeModal={noop} />
    </Story>
  )
}

export default {
  title: "Views|Connecting/Backup Modal Dialogs",
  component: CriticalBatteryLevelModalStory,
} as Meta
