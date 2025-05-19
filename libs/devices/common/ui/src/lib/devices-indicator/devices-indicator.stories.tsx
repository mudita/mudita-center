/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import type { Meta, StoryObj } from "@storybook/react"
import { DevicesIndicator } from "./devices-indicator"
import { storybookHelper } from "app-theme/utils"

const meta: Meta<typeof DevicesIndicator> = {
  title: "App/Devices/Devices indicator",
  component: DevicesIndicator,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "The `DevicesIndicator` component is used to display the number of connected devices. " +
          "It inherits props from the `<Button>` component and additionally accepts the `devicesCount` prop.",
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof DevicesIndicator>

export const Default: Story = {
  decorators: [(Story) => <Story />],
  argTypes: {
    devicesCount: storybookHelper
      .addDescription(
        "Defines the number of devices shown in the badge.\n\n" +
          "For values lower than 2, the whole indicator be hidden."
      )
      .assignCategory("Styles")
      .apply(),
    disabled: storybookHelper
      .addDescription("Defines whether the indicator is active or not.")
      .assignCategory("Functional")
      .apply({
        control: {
          type: "boolean",
        },
      }),
    onClick: storybookHelper
      .addDescription(
        "Defines a function to be called when clicking the indicator."
      )
      .assignCategory("Functional")
      .apply({
        control: {
          disable: true,
        },
      }),
  },
  args: {
    devicesCount: 2,
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        component:
          "The `DeviceImage` component is used to display images of devices. It supports different device types, sizes, and colors.",
      },
    },
  },
}
