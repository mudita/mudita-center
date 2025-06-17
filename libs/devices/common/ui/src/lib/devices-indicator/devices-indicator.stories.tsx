/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import type { Meta, StoryObj } from "@storybook/react-vite"
import { DevicesIndicator } from "./devices-indicator"
import { storybookHelper } from "app-theme/utils"

const meta: Meta<typeof DevicesIndicator> = {
  title: "App/Devices/Devices indicator",
  component: DevicesIndicator,
}

export default meta

type Story = StoryObj<typeof DevicesIndicator>

export const Default: Story = {
  decorators: [(Story) => <Story />],
  argTypes: {
    devicesCount: storybookHelper
      .addDescription("Defines the number of devices shown in the badge.")
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
    visible: storybookHelper
      .addDescription("Defines whether the indicator is visible or not.")
      .assignCategory("Functional")
      .apply({
        control: {
          type: "boolean",
        },
      }),
    loading: storybookHelper
      .addDescription("Defines whether the indicator shows a loading state.")
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
    visible: true,
    loading: false,
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
