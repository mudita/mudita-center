/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import type { Meta, StoryObj } from "@storybook/react-vite"
import { DeviceSwitchingLoader } from "./device-switching-loader"

const meta: Meta<typeof DeviceSwitchingLoader> = {
  title: "App/Devices/Switching Loader",
  component: DeviceSwitchingLoader,
}

export default meta

type Story = StoryObj<typeof DeviceSwitchingLoader>

export const Default: Story = {}
