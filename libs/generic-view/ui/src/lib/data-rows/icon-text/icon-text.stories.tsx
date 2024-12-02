/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import type { Meta, StoryObj } from "@storybook/react"
import { IconText as IconTextComponent } from "./icon-text"
import { IconType } from "generic-view/utils"

const meta: Meta<typeof IconTextComponent> = {
  title: "Data rows",
  component: IconTextComponent,
}

export default meta
type Story = StoryObj<typeof IconTextComponent>

export const IconText: Story = {
  args: {
    data: {
      text: "Hello World",
      subText: "Subtext",
      icon: IconType.BatteryCharging0,
    },
  },
}
