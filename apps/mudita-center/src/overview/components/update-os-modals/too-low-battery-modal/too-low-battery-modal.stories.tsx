/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import { Meta } from "@storybook/react"
import Story from "App/__deprecated__/renderer/components/storybook/story.component"
import { action } from "@storybook/addon-actions"
import { TooLowBatteryModal } from "App/overview/components/update-os-modals/too-low-battery-modal/too-low-battery-modal.component"
import { DeviceType } from "App/device"

export const TooLowBatteryModalStory: FunctionComponent = () => {
  return (
    <Story transparentMode>
      <TooLowBatteryModal
        open
        deviceType={DeviceType.MuditaPure}
        onClose={action("Close Too Low Battery Modal")}
      />
    </Story>
  )
}

export default {
  title: "Views|Overview/Update OS - Too Low Battery Modal",
  component: TooLowBatteryModalStory,
} as Meta
